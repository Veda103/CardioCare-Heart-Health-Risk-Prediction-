"""
Database Models for Cardio Care Flask Application

This module defines SQLAlchemy models that map to our PostgreSQL database tables.
The models provide an Object-Relational Mapping (ORM) interface to interact
with the users and assessments tables.
"""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import JSONB
import json

# Initialize database instance (will be imported by app.py)
db = SQLAlchemy()

class User(db.Model):
    """
    User model representing user accounts in the Cardio Care system.
    
    This model maps to the 'users' table in PostgreSQL and handles
    user authentication and account management.
    """
    __tablename__ = 'users'
    
    # Primary key
    id = db.Column(db.Integer, primary_key=True)
    
    # User information
    full_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    
    # Timestamps
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    assessments = db.relationship('Assessment', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    def to_dict(self, include_sensitive=False):
        """Convert user object to dictionary for JSON serialization"""
        user_dict = {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
        if include_sensitive:
            user_dict['password_hash'] = self.password_hash
            
        return user_dict
    
    @staticmethod
    def find_by_email(email):
        """Find user by email address"""
        return User.query.filter_by(email=email).first()
    
    @staticmethod
    def find_by_id(user_id):
        """Find user by ID"""
        return User.query.get(user_id)


class Assessment(db.Model):
    """
    Assessment model representing health assessments in the Cardio Care system.
    
    This model maps to the 'assessments' table in PostgreSQL and stores
    comprehensive health assessment data using JSONB columns for flexibility.
    """
    __tablename__ = 'assessments'
    
    # Primary key
    assessment_id = db.Column(db.Integer, primary_key=True)
    
    # Foreign key to users table
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    
    # JSONB columns for flexible health data storage
    assessment_data = db.Column(JSONB, nullable=False)
    prediction_result = db.Column(JSONB, nullable=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.utcnow, index=True)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Assessment {self.assessment_id} for User {self.user_id}>'
    
    def to_dict(self, include_user_info=False):
        """Convert assessment object to dictionary for JSON serialization"""
        assessment_dict = {
            'assessment_id': self.assessment_id,
            'user_id': self.user_id,
            'assessment_data': self.assessment_data,
            'prediction_result': self.prediction_result,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
        if include_user_info and self.user:
            assessment_dict['user'] = {
                'full_name': self.user.full_name,
                'email': self.user.email
            }
            
        return assessment_dict
    
    @staticmethod
    def find_by_user(user_id, limit=None):
        """Find assessments by user ID"""
        query = Assessment.query.filter_by(user_id=user_id).order_by(Assessment.created_at.desc())
        if limit:
            query = query.limit(limit)
        return query.all()
    
    @staticmethod
    def find_by_id_and_user(assessment_id, user_id):
        """Find specific assessment by ID and user ID (for security)"""
        return Assessment.query.filter_by(
            assessment_id=assessment_id, 
            user_id=user_id
        ).first()
    
    def validate_assessment_data(self):
        """
        Validate that assessment_data contains all required 21 parameters
        
        Returns:
            tuple: (is_valid: bool, missing_fields: list)
        """
        required_fields = [
            'age', 'obesity', 'smoking', 'alcohol_consumption', 'physical_activity',
            'diet_score', 'cholesterol_level', 'triglyceride_level', 'ldl_level',
            'hdl_level', 'systolic_bp', 'diastolic_bp', 'air_pollution_exposure',
            'family_history', 'stress_level', 'healthcare_access',
            'emergency_response_time', 'annual_income', 'health_insurance',
            'state_name_encoded', 'gender_Male'
        ]
        
        if not self.assessment_data:
            return False, required_fields
        
        missing_fields = [field for field in required_fields 
                         if field not in self.assessment_data]
        
        return len(missing_fields) == 0, missing_fields
    
    def get_risk_level(self):
        """Extract risk level from prediction result"""
        if self.prediction_result and 'risk_level' in self.prediction_result:
            return self.prediction_result['risk_level']
        return None
    
    def get_risk_score(self):
        """Extract risk score from prediction result"""
        if self.prediction_result and 'risk_score' in self.prediction_result:
            return float(self.prediction_result['risk_score'])
        return None


# ================================================
# DATABASE UTILITY FUNCTIONS
# ================================================

def init_db(app):
    """Initialize database with Flask app"""
    db.init_app(app)
    
def create_tables(app):
    """Create all database tables"""
    with app.app_context():
        db.create_all()
        
def drop_tables(app):
    """Drop all database tables (use with caution!)"""
    with app.app_context():
        db.drop_all()

# ================================================
# DATABASE SEED FUNCTIONS (FOR DEVELOPMENT)
# ================================================

def seed_test_data():
    """
    Seed database with test data for development
    WARNING: This will only work in development mode
    """
    from flask_bcrypt import Bcrypt
    bcrypt = Bcrypt()
    
    # Create test users
    test_users = [
        {
            'full_name': 'John Doe',
            'email': 'john.doe@example.com',
            'password': 'password123'
        },
        {
            'full_name': 'Jane Smith', 
            'email': 'jane.smith@example.com',
            'password': 'password123'
        }
    ]
    
    for user_data in test_users:
        if not User.find_by_email(user_data['email']):
            user = User(
                full_name=user_data['full_name'],
                email=user_data['email'],
                password_hash=bcrypt.generate_password_hash(user_data['password']).decode('utf-8')
            )
            db.session.add(user)
    
    db.session.commit()
    print("✅ Test users created")

def get_db_stats():
    """Get database statistics"""
    stats = {
        'users_count': User.query.count(),
        'assessments_count': Assessment.query.count(),
        'recent_assessments': Assessment.query.order_by(Assessment.created_at.desc()).limit(5).count()
    }
    return stats