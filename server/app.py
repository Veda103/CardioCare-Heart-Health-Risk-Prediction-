#!/usr/bin/env python3
"""
Cardio Care - Flask Backend Server
21-Parameter Cardiovascular Health Assessment System

This Flask application provides REST API endpoints for user authentication
and health assessment management, connecting to PostgreSQL database.
"""

import os
import datetime
from functools import wraps
from urllib.parse import quote_plus
from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
from dotenv import load_dotenv

# Import our database models and utilities
from models import db, User, Assessment, init_db, create_tables, get_db_stats

# Import ML prediction function
from ml_model.prediction import make_prediction

# Load environment variables
load_dotenv()

# Initialize Flask application
app = Flask(__name__)

# ================================================
# CONFIGURATION
# ================================================

# Configure CORS for React frontend communication
CORS(app, 
     origins=['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization', 'Accept'],
     supports_credentials=True)

# Database Configuration
DATABASE_URL = os.getenv('DATABASE_URL')
if not DATABASE_URL:
    # Build database URL from individual environment variables
    db_user = os.getenv('DB_USER', 'postgres')
    db_password = os.getenv('DB_PASSWORD', 'password')
    db_host = os.getenv('DB_HOST', 'localhost')
    db_port = os.getenv('DB_PORT', '5432')
    db_name = os.getenv('DB_NAME', 'cardio_care')
    
    # URL-encode the password to handle special characters like @
    encoded_password = quote_plus(db_password)
    
    DATABASE_URL = f"postgresql://{db_user}:{encoded_password}@{db_host}:{db_port}/{db_name}"

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# JWT Configuration
JWT_SECRET = os.getenv('JWT_SECRET', 'your-super-secret-jwt-key-change-this-in-production')
JWT_EXPIRATION_HOURS = int(os.getenv('JWT_EXPIRATION_HOURS', '24'))

# Initialize database with app
init_db(app)

# Initialize bcrypt for password hashing
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

# ================================================
# UTILITY FUNCTIONS
# ================================================

def generate_jwt_token(user_id):
    """Generate JWT token for user authentication"""
    utc_now = datetime.datetime.now(datetime.UTC)
    payload = {
        'userId': user_id,
        'exp': utc_now + datetime.timedelta(hours=JWT_EXPIRATION_HOURS),
        'iat': utc_now
    }
    return jwt.encode(payload, JWT_SECRET, algorithm='HS256')

def verify_jwt_token(token):
    """Verify and decode JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def auth_required(f):
    """Decorator to require JWT authentication for routes"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({
                'error': 'Access token required',
                'message': 'Please provide a valid authentication token'
            }), 401
        
        payload = verify_jwt_token(token)
        if not payload:
            return jsonify({
                'error': 'Invalid token',
                'message': 'Token is invalid or expired'
            }), 403
        
        # Add user info to request context
        request.current_user = {'userId': payload['userId']}
        return f(*args, **kwargs)
    
    return decorated

# ================================================
# ERROR HANDLERS
# ================================================

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'error': 'Not found',
        'message': 'The requested resource was not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    db.session.rollback()
    return jsonify({
        'error': 'Internal server error',
        'message': 'An unexpected error occurred'
    }), 500

# ================================================
# API ROUTES
# ================================================

@app.before_request
def handle_preflight():
    """Handle CORS preflight requests"""
    if request.method == "OPTIONS":
        response = jsonify()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization,Accept")
        response.headers.add('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE,OPTIONS")
        response.headers.add('Access-Control-Allow-Credentials', "true")
        return response

@app.route('/api/register', methods=['POST', 'OPTIONS'])
@app.route('/api/auth/register', methods=['POST', 'OPTIONS'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or not all(k in data for k in ('fullName', 'email', 'password')):
            return jsonify({
                'error': 'Missing required fields',
                'message': 'Please provide fullName, email, and password'
            }), 400
        
        # Check if user already exists
        if User.find_by_email(data['email']):
            return jsonify({
                'error': 'User already exists',
                'message': 'An account with this email already exists'
            }), 409
        
        # Create new user
        password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user = User(
            full_name=data['fullName'],
            email=data['email'],
            password_hash=password_hash
        )
        
        db.session.add(user)
        db.session.commit()
        
        # Generate JWT token
        token = generate_jwt_token(user.id)
        
        return jsonify({
            'message': 'User registered successfully',
            'token': token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'error': 'Registration failed',
            'message': str(e)
        }), 500

@app.route('/api/login', methods=['POST', 'OPTIONS'])
@app.route('/api/auth/login', methods=['POST', 'OPTIONS'])
def login():
    """Authenticate user and return JWT token"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or not all(k in data for k in ('email', 'password')):
            return jsonify({
                'error': 'Missing credentials',
                'message': 'Please provide email and password'
            }), 400
        
        # Find user by email
        user = User.find_by_email(data['email'])
        if not user:
            return jsonify({
                'error': 'Invalid credentials',
                'message': 'Email or password is incorrect'
            }), 401
        
        # Verify password
        if not bcrypt.check_password_hash(user.password_hash, data['password']):
            return jsonify({
                'error': 'Invalid credentials',
                'message': 'Email or password is incorrect'
            }), 401
        
        # Generate JWT token
        token = generate_jwt_token(user.id)
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Login failed',
            'message': str(e)
        }), 500

@app.route('/api/profile', methods=['GET', 'OPTIONS'])
@app.route('/api/users/me', methods=['GET', 'OPTIONS'])
@auth_required
def get_profile():
    """Get current user profile"""
    try:
        user = User.find_by_id(request.current_user['userId'])
        if not user:
            return jsonify({
                'error': 'User not found',
                'message': 'User account no longer exists'
            }), 404
        
        return jsonify({
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to fetch profile',
            'message': str(e)
        }), 500

@app.route('/api/assessments', methods=['POST', 'OPTIONS'])
@auth_required
def create_assessment():
    """Create a new health assessment"""
    try:
        data = request.get_json()
        
        # Validate assessment data
        if not data or 'assessment_data' not in data:
            return jsonify({
                'error': 'Missing assessment data',
                'message': 'Please provide complete assessment information'
            }), 400
        
        # Get assessment data
        assessment_data = data['assessment_data']
        
        # Make real prediction using our ML model
        real_prediction = make_prediction(assessment_data)
        
        # Check if prediction was successful
        if real_prediction is None:
            return jsonify({
                'error': 'Prediction failed',
                'message': 'Unable to generate health risk assessment'
            }), 500
        
        # Create new assessment
        assessment = Assessment(
            user_id=request.current_user['userId'],
            assessment_data=assessment_data,
            prediction_result=real_prediction
        )
        
        # Validate assessment data structure
        is_valid, missing_fields = assessment.validate_assessment_data()
        if not is_valid:
            return jsonify({
                'error': 'Invalid assessment data',
                'message': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400
        
        db.session.add(assessment)
        db.session.commit()
        
        return jsonify({
            'message': 'Assessment created successfully',
            'assessmentId': assessment.assessment_id,  # Fixed: Frontend expects this exact field name
            'assessment': assessment.to_dict(),
            'prediction': real_prediction
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'error': 'Failed to create assessment',
            'message': str(e)
        }), 500

@app.route('/api/assessments', methods=['GET', 'OPTIONS'])
@auth_required
def get_assessments():
    """Get user's assessment history"""
    try:
        limit = request.args.get('limit', type=int)
        assessments = Assessment.find_by_user(request.current_user['userId'], limit=limit)
        
        return jsonify({
            'assessments': [assessment.to_dict() for assessment in assessments],
            'count': len(assessments)
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to fetch assessments',
            'message': str(e)
        }), 500

@app.route('/api/assessments/<int:assessment_id>', methods=['GET', 'OPTIONS'])
@auth_required
def get_assessment(assessment_id):
    """Get specific assessment by ID"""
    try:
        assessment = Assessment.find_by_id_and_user(
            assessment_id, 
            request.current_user['userId']
        )
        
        if not assessment:
            return jsonify({
                'error': 'Assessment not found',
                'message': 'Assessment does not exist or you do not have access to it'
            }), 404
        
        return jsonify({
            'assessment': assessment.to_dict(include_user_info=True)
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to fetch assessment',
            'message': str(e)
        }), 500

@app.route('/api/dashboard/stats', methods=['GET', 'OPTIONS'])
@auth_required
def get_dashboard_stats():
    """Get dashboard statistics for the user"""
    try:
        user_assessments = Assessment.find_by_user(request.current_user['userId'])
        
        if not user_assessments:
            return jsonify({
                'total_assessments': 0,
                'latest_assessment': None,
                'risk_trend': [],
                'message': 'No assessments found'
            }), 200
        
        # Calculate statistics
        latest = user_assessments[0]  # Already sorted by created_at desc
        risk_scores = [a.get_risk_score() for a in user_assessments if a.get_risk_score() is not None]
        
        stats = {
            'total_assessments': len(user_assessments),
            'latest_assessment': latest.to_dict(),
            'risk_trend': risk_scores[:10],  # Last 10 scores for trend
            'average_risk_score': sum(risk_scores) / len(risk_scores) if risk_scores else 0,
            'assessment_dates': [a.created_at.isoformat() for a in user_assessments[:10]]
        }
        
        return jsonify(stats), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to fetch dashboard stats',
            'message': str(e)
        }), 500

# ================================================
# BASIC ROUTES
# ================================================

@app.route('/', methods=['GET', 'OPTIONS'])
def home():
    """Health check endpoint"""
    return jsonify({
        'message': 'Cardio Care API Server',
        'version': '2.0.0',
        'status': 'running',
        'database': 'connected' if db.engine.dialect.name == 'postgresql' else 'unknown'
    })

@app.route('/health', methods=['GET', 'OPTIONS'])
def health_check():
    """Detailed health check endpoint"""
    try:
        # Test database connection
        db.session.execute('SELECT 1')
        db_status = 'connected'
    except Exception as e:
        db_status = f'error: {str(e)}'
    
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.datetime.now(datetime.UTC).isoformat(),
        'database': db_status,
        'version': '2.0.0'
    })

if __name__ == '__main__':
    print("🏥 Starting Cardio Care Flask Server...")
    print(f"🔗 Database: {DATABASE_URL.replace(os.getenv('DB_PASSWORD', ''), '****') if os.getenv('DB_PASSWORD') else DATABASE_URL}")
    print(f"🔑 JWT Expiration: {JWT_EXPIRATION_HOURS} hours")
    print("🌐 CORS enabled for frontend communication")
    
    # Create tables if they don't exist
    with app.app_context():
        print("📋 Creating database tables...")
        try:
            db.create_all()
            print("✅ Database tables ready")
        except Exception as e:
            print(f"❌ Database connection failed: {e}")
            print("💡 Please check your database configuration in .env file")
            exit(1)
    
    # Run the application
    app.run(
        host=os.getenv('FLASK_HOST', '0.0.0.0'),
        port=int(os.getenv('FLASK_PORT', '5000')),
        debug=os.getenv('FLASK_ENV') == 'development'
    )