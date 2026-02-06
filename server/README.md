# 🏥 Cardio Care Backend API

> Flask REST API for cardiovascular health assessment with ML-powered risk predictions

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)](https://flask.palletsprojects.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12%2B-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**TL;DR:** Secure authentication + 21-parameter health assessments + XGBoost ML predictions + PostgreSQL storage

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Configure environment (edit .env with your DB credentials)
cp .env.example .env

# 3. Initialize database
python init_db.py

# 4. Start server
python app.py
```

✅ Server runs at `http://localhost:5000` | Test: `curl http://localhost:5000/health`

---

## 🛠 Tech Stack

**Backend:** Flask 3.0.0 • SQLAlchemy • PostgreSQL 12+  
**Auth:** JWT + Bcrypt password hashing  
**ML:** XGBoost for risk prediction  
**API:** RESTful with CORS support

---

## ✨ Features

### 🔐 Authentication & Security
- JWT token-based authentication with configurable expiration
- Bcrypt password hashing with automatic salting
- Protected routes with authentication middleware
- CORS configuration for secure frontend communication

### 🏥 Health Assessment System
- **21-parameter** cardiovascular health evaluations
- **ML-powered** risk predictions using XGBoost
- JSONB storage for flexible assessment data structures
- Complete assessment history and trend analytics
- Real-time risk score calculations

### 📊 Dashboard & Analytics
- User-specific assessment history
- Risk trend visualization data
- Statistical summaries and insights
- Latest assessment quick access

---

## � Installation

### Prerequisites
- Python 3.8 or higher
- PostgreSQL 12+
- pip (Python package manager)

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/cardio-care.git
cd cardio-care/server
```

### Step 2: Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your settings (see Configuration section)
```

### Step 5: Database Setup
```bash
# Create database tables
python init_db.py

# Optional: Seed with test data
python init_db.py --seed
```

### Step 6: Start Server
```bash
python app.py
```

✅ Server should now be running at `http://localhost:5000`

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the server directory with the following variables:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cardio_care
DB_USER=postgres
DB_PASSWORD=your_secure_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRATION_HOURS=24

# Server Configuration
FLASK_ENV=development
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
```

### Configuration Details

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DB_HOST` | PostgreSQL server host | Yes | `localhost` |
| `DB_PORT` | PostgreSQL server port | Yes | `5432` |
| `DB_NAME` | Database name | Yes | `cardio_care` |
| `DB_USER` | Database username | Yes | `postgres` |
| `DB_PASSWORD` | Database password | Yes | - |
| `JWT_SECRET` | Secret key for JWT tokens (32+ chars) | Yes | - |
| `JWT_EXPIRATION_HOURS` | Token validity period | No | `24` |
| `FLASK_ENV` | Environment mode (`development`/`production`) | No | `development` |
| `FLASK_HOST` | Server bind address | No | `0.0.0.0` |
| `FLASK_PORT` | Server port number | No | `5000` |

### Alternative: Database URL
Instead of individual DB variables, you can use a single connection string:
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/cardio_care
```

---

## 📡 API Endpoints

### Authentication

#### Register New User
```http
POST /api/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### User Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com"
  }
}
```

### User Profile

#### Get Current User
```http
GET /api/profile
Authorization: Bearer <token>
```

### Assessments

#### Create New Assessment
```http
POST /api/assessments
Authorization: Bearer <token>
Content-Type: application/json

{
  "assessment_data": {
    "age": 45,
    "gender": "male",
    "height": 175,
    "weight": 80,
    "systolic_bp": 130,
    "diastolic_bp": 85,
    "cholesterol_level": 200,
    "glucose_level": 95,
    ...
  }
}
```

#### Get All User Assessments
```http
GET /api/assessments
Authorization: Bearer <token>
```

#### Get Specific Assessment
```http
GET /api/assessments/:id
Authorization: Bearer <token>
```

### Dashboard

#### Get Dashboard Statistics
```http
GET /api/dashboard/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalAssessments": 5,
    "latestRiskScore": 65,
    "averageRiskScore": 58,
    "riskTrend": "improving"
  }
}
```

---

## �️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Assessments Table
```sql
CREATE TABLE assessments (
    assessment_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    assessment_data JSONB NOT NULL,
    prediction_result JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_assessments_user_id ON assessments(user_id);
CREATE INDEX idx_assessments_created_at ON assessments(created_at);
```

### Assessment Data Structure (JSONB)
```json
{
  "age": 45,
  "gender": "male",
  "height": 175,
  "weight": 80,
  "systolic_bp": 130,
  "diastolic_bp": 85,
  "cholesterol_level": 200,
  "glucose_level": 95,
  "smoking": 0,
  "alcohol": 1,
  "physical_activity": 3,
  "family_history": 1,
  ...
}
```

### Prediction Result Structure (JSONB)
```json
{
  "risk_score": 0.65,
  "risk_level": "Medium",
  "confidence": 0.87,
  "influential_factors": [
    {"factor": "cholesterol_level", "impact": 0.25},
    {"factor": "blood_pressure", "impact": 0.20},
    {"factor": "age", "impact": 0.15}
  ]
}
```

---

## 🧪 Development

### Running Tests
```bash
# Run setup verification tests
python test_setup.py

# Test database connection
python -c "from models import test_connection; test_connection()"
```

### API Testing with cURL

**Health Check:**
```bash
curl http://localhost:5000/health
```

**Register User:**
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Database Management

**Reset Database (⚠️ Deletes all data):**
```bash
python init_db.py --reset
```

**Seed Test Data:**
```bash
python init_db.py --seed
```

### Debug Mode

Enable detailed error messages and auto-reload:
```bash
# In .env file
FLASK_ENV=development
```

Features:
- ✅ Auto-reload on code changes
- ✅ Detailed error stack traces
- ✅ Request/response logging

---

## 🚀 Production Deployment

### 1. Environment Setup

```bash
# Set production mode
export FLASK_ENV=production

# Use strong JWT secret (32+ characters)
export JWT_SECRET="$(openssl rand -hex 32)"

# Configure production database
export DATABASE_URL="postgresql://user:pass@prod-host:5432/cardio_care"
```

### 2. Install Production Server (Gunicorn)

```bash
pip install gunicorn
```

### 3. Run with Gunicorn

```bash
# Basic usage
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# With custom configuration
gunicorn -w 4 -b 0.0.0.0:5000 \
  --timeout 120 \
  --access-logfile access.log \
  --error-logfile error.log \
  app:app
```

### 4. Systemd Service (Linux)

Create `/etc/systemd/system/cardio-care.service`:
```ini
[Unit]
Description=Cardio Care Flask API
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/cardio-care/server
Environment="PATH=/var/www/cardio-care/venv/bin"
ExecStart=/var/www/cardio-care/venv/bin/gunicorn -w 4 -b 127.0.0.1:5000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable cardio-care
sudo systemctl start cardio-care
```

### 5. Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name api.cardiocare.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## 🔒 Security

### Implemented Security Features

| Feature | Implementation |
|---------|----------------|
| **Password Security** | Bcrypt hashing with automatic salt |
| **Authentication** | JWT tokens with expiration |
| **SQL Injection** | SQLAlchemy ORM parameterization |
| **CORS** | Configured allowed origins |
| **Input Validation** | Request data sanitization |

### Security Best Practices

1. **JWT Secrets:**
   - Use cryptographically strong secrets (32+ characters)
   - Rotate secrets periodically
   - Never commit secrets to version control

2. **Database:**
   - Use strong database passwords
   - Restrict database user permissions
   - Enable SSL for database connections in production

3. **CORS:**
   - Configure allowed origins explicitly
   - Don't use wildcards in production
   - Update CORS settings in `app.py`

4. **Environment Variables:**
   - Never commit `.env` files
   - Use secret management services in production
   - Validate all required variables on startup

---

## 📁 Project Structure

```
server/
├── app.py                      # Main Flask application & routes
├── models.py                   # SQLAlchemy database models
├── init_db.py                  # Database initialization script
├── test_setup.py               # Setup verification tests
├── requirements.txt            # Python dependencies
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
│
├── ml_model/                   # Machine Learning module
│   ├── __init__.py
│   ├── prediction.py           # ML prediction logic
│   ├── model.pkl               # Trained XGBoost model
│   └── scaler.pkl              # Feature scaler
│
└── database/                   # Database resources
    └── schema.pgsql            # PostgreSQL schema definitions
```

---

## 🧰 Troubleshooting

### Common Issues

**1. Module Not Found Error**
```bash
# Solution: Install missing packages
pip install -r requirements.txt
```

**2. Database Connection Failed**
```bash
# Solution: Verify PostgreSQL is running
sudo systemctl status postgresql  # Linux
# Check .env credentials are correct
```

**3. JWT Token Invalid**
```bash
# Solution: Check token hasn't expired
# Verify JWT_SECRET matches between requests
```

**4. CORS Errors**
```bash
# Solution: Update allowed origins in app.py
# Ensure frontend URL is in CORS configuration
```

### Logs and Debugging

**View Application Logs:**
```bash
# Development
tail -f flask.log

# Production (with Gunicorn)
tail -f error.log access.log
```

**Database Query Logging:**
```python
# Add to app.py for SQL query debugging
import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
```

---

## � API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": "ValidationError",
  "message": "Invalid email format",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| `200` | OK | Successful GET, PUT, PATCH |
| `201` | Created | Successful POST |
| `400` | Bad Request | Invalid input data |
| `401` | Unauthorized | Missing or invalid token |
| `404` | Not Found | Resource doesn't exist |
| `500` | Server Error | Internal server error |

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Code Style:**
   - Follow PEP 8 style guidelines
   - Use meaningful variable and function names
   - Add docstrings to all functions

2. **Documentation:**
   - Update README for new features
   - Add inline comments for complex logic
   - Document API changes

3. **Testing:**
   - Test all new endpoints
   - Verify database operations
   - Check error handling

4. **Pull Requests:**
   - Create feature branches from `main`
   - Provide clear PR descriptions
   - Reference related issues

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

Need help? Here's how to get support:

- **Documentation:** Read this README thoroughly
- **Health Check:** `GET /health` endpoint for server status
- **Logs:** Check server logs for detailed error information
- **Issues:** Report bugs via GitHub Issues
- **Email:** support@cardiocare.com

---

## 🙏 Acknowledgments

- Flask framework and community
- SQLAlchemy ORM
- XGBoost machine learning library
- PostgreSQL database
- All contributors and users

---

**Built with ❤️ for better cardiovascular health**