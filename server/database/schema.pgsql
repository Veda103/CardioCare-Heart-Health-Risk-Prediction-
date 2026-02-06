-- ================================================
-- PostgreSQL Database Schema for Cardio Care
-- 21-Parameter Cardiovascular Health Assessment System
-- ================================================
-- Database: PostgreSQL 12+
-- Language: PostgreSQL (postgres)
-- Version: 2.1
-- Last Updated: September 25, 2025
-- ================================================

/*
 * CARDIO CARE - CARDIOVASCULAR HEALTH PREDICTION SYSTEM
 * 
 * This database schema supports a comprehensive cardiovascular health
 * assessment and risk prediction application. The system collects
 * 21 distinct health parameters to generate accurate risk assessments
 * using machine learning algorithms.
 * 
 * Key Features:
 * - User authentication and management
 * - Flexible assessment data storage using JSONB
 * - Historical tracking of health assessments
 * - Risk prediction results with recommendations
 * - Optimized indexing for performance
 */

-- ================================================
-- SCHEMA CLEANUP
-- ================================================
-- Drop existing tables in correct order (due to foreign key constraints)
DROP TABLE IF EXISTS assessments CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ================================================
-- USER MANAGEMENT SYSTEM
-- ================================================

/*
 * USERS TABLE
 * 
 * Stores user account information for the Cardio Care system.
 * Supports secure authentication with bcrypt password hashing.
 * Each user can have multiple health assessments over time.
 */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL 
        CONSTRAINT chk_users_full_name_not_empty 
        CHECK (LENGTH(TRIM(full_name)) > 0),
    email VARCHAR(255) UNIQUE NOT NULL 
        CONSTRAINT chk_users_email_format 
        CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password_hash VARCHAR(255) NOT NULL 
        CONSTRAINT chk_users_password_hash_not_empty 
        CHECK (LENGTH(password_hash) > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Add comments to users table columns
COMMENT ON TABLE users IS 'User accounts for the Cardio Care health assessment system';
COMMENT ON COLUMN users.id IS 'Unique identifier for each user account';
COMMENT ON COLUMN users.full_name IS 'Complete name of the user';
COMMENT ON COLUMN users.email IS 'Email address used for authentication (must be unique)';
COMMENT ON COLUMN users.password_hash IS 'Bcrypt hashed password for secure authentication';
COMMENT ON COLUMN users.created_at IS 'Timestamp when the user account was created';
COMMENT ON COLUMN users.updated_at IS 'Timestamp when the user account was last modified';

-- ================================================
-- HEALTH ASSESSMENT SYSTEM
-- ================================================

/*
 * ASSESSMENTS TABLE
 * 
 * Stores comprehensive health assessments with flexible JSONB structure.
 * 
 * WHY JSONB?
 * - Flexibility: Easy to add new health parameters without schema changes
 * - Performance: Native indexing and querying capabilities
 * - Scalability: Handles varying assessment formats over time
 * - Future-Proof: Accommodates evolving health metrics and research
 * - Validation: Can enforce structure at application level while maintaining DB flexibility
 * 
 * Each assessment contains:
 * 1. assessment_data: Complete set of 21 health parameters
 * 2. prediction_result: ML model output with risk scores and recommendations
 */
CREATE TABLE assessments (
    assessment_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL 
        REFERENCES users(id) ON DELETE CASCADE,
    assessment_data JSONB NOT NULL 
        CONSTRAINT chk_assessments_data_not_empty 
        CHECK (assessment_data IS NOT NULL AND assessment_data != '{}'::jsonb),
    prediction_result JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Add comments to assessments table columns
COMMENT ON TABLE assessments IS 'Cardiovascular health assessments with 21-parameter data structure';
COMMENT ON COLUMN assessments.assessment_id IS 'Unique identifier for each health assessment';
COMMENT ON COLUMN assessments.user_id IS 'Foreign key reference to the user who completed the assessment';
COMMENT ON COLUMN assessments.assessment_data IS 'JSONB object containing all 21 health parameters (see documentation below)';
COMMENT ON COLUMN assessments.prediction_result IS 'JSONB object containing ML model predictions and recommendations';
COMMENT ON COLUMN assessments.created_at IS 'Timestamp when the assessment was completed';
COMMENT ON COLUMN assessments.updated_at IS 'Timestamp when the assessment was last modified';

-- ================================================
-- PERFORMANCE OPTIMIZATION INDEXES
-- ================================================

-- Primary indexes for user management
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Primary indexes for assessments
CREATE INDEX idx_assessments_user_id ON assessments(user_id);
CREATE INDEX idx_assessments_created_at ON assessments(created_at);
CREATE INDEX idx_assessments_updated_at ON assessments(updated_at);

-- JSONB indexes for efficient querying of health data
CREATE INDEX idx_assessments_data_gin ON assessments USING GIN (assessment_data);
CREATE INDEX idx_assessments_result_gin ON assessments USING GIN (prediction_result);

-- Standard B-tree indexes for common queries (using extracted values)
CREATE INDEX idx_assessments_risk_level ON assessments ((prediction_result->>'risk_level'));

-- Composite indexes for common query patterns
CREATE INDEX idx_assessments_user_date ON assessments(user_id, created_at DESC);
-- ================================================
-- COMPREHENSIVE DATA DOCUMENTATION
-- ================================================

/*
 * =====================================================
 * CARDIO CARE - DATA STRUCTURE SPECIFICATION
 * =====================================================
 * 
 * This section provides complete documentation of the JSON data structures
 * used in the Cardio Care cardiovascular health assessment system.
 * 
 * VERSION: 2.1
 * TOTAL PARAMETERS: 21
 * ASSESSMENT CATEGORIES: Demographics, Lifestyle, Medical History, 
 *                       Laboratory Values, Environmental, Socioeconomic
 * 
 * =====================================================
 * ASSESSMENT_DATA JSONB STRUCTURE
 * =====================================================
 * 
 * The assessment_data column contains a JSONB object with exactly 21 parameters
 * that comprehensively evaluate an individual's cardiovascular health risk factors.
 * 
 * PARAMETER CATEGORIES:
 * 
 * 1. DEMOGRAPHIC INFORMATION
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ age                : Integer (18-120 years)                     │
 *    │ gender_Male        : Integer (0=Female, 1=Male)                 │
 *    └─────────────────────────────────────────────────────────────────┘
 * 
 * 2. PHYSICAL HEALTH INDICATORS
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ obesity            : Integer (0=No, 1=Yes)                      │
 *    │ smoking            : Integer (0=No, 1=Yes)                      │
 *    │ alcohol_consumption: Integer (0=None, 1=Light, 2=Moderate,      │
 *    │                              3=Heavy)                           │
 *    └─────────────────────────────────────────────────────────────────┘
 * 
 * 3. LIFESTYLE FACTORS
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ physical_activity  : Integer (1-10 scale, hours per week)       │
 *    │ diet_score         : Integer (1-10 scale, diet quality)         │
 *    │ stress_level       : Integer (1-10 scale, perceived stress)     │
 *    └─────────────────────────────────────────────────────────────────┘
 * 
 * 4. LABORATORY VALUES (mg/dL)
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ cholesterol_level  : Integer (Total cholesterol in mg/dL)       │
 *    │ triglyceride_level : Integer (Triglycerides in mg/dL)           │
 *    │ ldl_level          : Integer (Low-density lipoprotein mg/dL)    │
 *    │ hdl_level          : Integer (High-density lipoprotein mg/dL)   │
 *    └─────────────────────────────────────────────────────────────────┘
 * 
 * 5. VITAL SIGNS (mmHg)
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ systolic_bp        : Integer (Systolic blood pressure mmHg)     │
 *    │ diastolic_bp       : Integer (Diastolic blood pressure mmHg)    │
 *    └─────────────────────────────────────────────────────────────────┘
 * 
 * 6. MEDICAL HISTORY
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ family_history     : Integer (0=No family history of heart      │
 *    │                              disease, 1=Yes)                    │
 *    └─────────────────────────────────────────────────────────────────┘
 * 
 * 7. ENVIRONMENTAL FACTORS
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ air_pollution_exposure: Integer (1-10 scale, exposure level)    │
 *    │ state_name_encoded    : Integer (Encoded state identifier)      │
 *    └─────────────────────────────────────────────────────────────────┘
 * 
 * 8. SOCIOECONOMIC FACTORS
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ annual_income      : Integer (Annual income in USD)             │
 *    │ health_insurance   : Integer (0=No insurance, 1=Has insurance)  │
 *    │ healthcare_access  : Integer (0=Limited access, 1=Good access)  │
 *    │ emergency_response_time: Integer (Minutes to emergency care)    │
 *    └─────────────────────────────────────────────────────────────────┘
 * 
 * =====================================================
 * PREDICTION_RESULT JSONB STRUCTURE
 * =====================================================
 * 
 * The prediction_result column contains the output from machine learning
 * models along with clinical recommendations and risk factor analysis.
 * 
 * STRUCTURE:
 *    ┌─────────────────────────────────────────────────────────────────┐
 *    │ risk_score       : Float (0.0-1.0, probability of CVD risk)     │
 *    │ risk_level       : String (Categorical risk assessment)         │
 *    │                    Values: "Very Low", "Low", "Moderate",       │
 *    │                           "High", "Very High"                   │
 *    │ confidence_score : Float (0.0-1.0, model prediction confidence) │
 *    │ recommendations  : Array of Strings (Personalized health advice)│
 *    │ risk_factors     : Array of Strings (Identified risk factors)   │
 *    └─────────────────────────────────────────────────────────────────┘
 * 
 * RISK LEVEL CLASSIFICATIONS:
 * • Very Low (0.0-0.1): Minimal cardiovascular risk
 * • Low (0.1-0.3): Below average risk, good health practices
 * • Moderate (0.3-0.5): Average risk, some lifestyle modifications needed
 * • High (0.5-0.7): Above average risk, medical consultation recommended
 * • Very High (0.7-1.0): Significant risk, immediate medical attention needed
 * 
 * =====================================================
 * DATA VALIDATION GUIDELINES
 * =====================================================
 * 
 * 1. All 21 parameters must be present in assessment_data
 * 2. Numeric values should be within realistic medical ranges
 * 3. Binary indicators (0/1) must be exactly 0 or 1
 * 4. Scale values (1-10) must be integers within specified range
 * 5. Prediction results should include all specified fields
 * 6. Risk scores must be between 0.0 and 1.0
 * 7. Confidence scores must be between 0.0 and 1.0
 * 
 * =====================================================
 * EXAMPLE QUERIES FOR DEVELOPERS
 * =====================================================
 * 
 * -- Get all high-risk assessments
 * SELECT * FROM assessments 
 * WHERE prediction_result->>'risk_level' = 'High';
 * 
 * -- Find users with cholesterol > 240
 * SELECT u.full_name, u.email, (a.assessment_data->>'cholesterol_level')::int as cholesterol
 * FROM assessments a
 * JOIN users u ON a.user_id = u.id
 * WHERE (a.assessment_data->>'cholesterol_level')::int > 240;
 * 
 * -- Get average age by risk level
 * SELECT 
 *   prediction_result->>'risk_level' as risk_level,
 *   AVG((assessment_data->>'age')::int) as avg_age
 * FROM assessments 
 * GROUP BY prediction_result->>'risk_level';
 * 
 * -- Find assessments with multiple risk factors
 * SELECT assessment_id, 
 *        jsonb_array_length(prediction_result->'risk_factors') as risk_factor_count
 * FROM assessments 
 * WHERE jsonb_array_length(prediction_result->'risk_factors') > 3;
 * 
 * =====================================================
 * END OF DOCUMENTATION
 * =====================================================
 */