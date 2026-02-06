# Cardio Care - AI-Powered Heart Health Risk Prediction**
- **Environment Variable Protection** - Secure credential management with dotenv
- **Data Privacy Protection** - Real-time processing with no personal data storage
- **Anonymous Assessments** - No personally identification API Endpoints

### Risk Prediction APIiable information required
- **Secure Architecture** - Industry-standard security practices
- **GDPR Compliance Ready** - Privacy-first design principlesrediction

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/yourusername/cardio-care)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/yourusername/cardio-care)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC)](https://tailwindcss.com/)

## Overview

Cardio Care is an innovative AI-powered platform that empowers individuals to take proactive control of their cardiovascular health. By leveraging advanced machine learning algorithms trained on comprehensive anonymized datasets, Cardio Care provides personalized heart health risk assessments, actionable insights, and educational resources. Our mission is to bridge the gap between complex medical data and informed health decisions, making sophisticated cardiovascular risk analysis accessible to everyone while facilitating meaningful conversations with healthcare providers.

## ✨ Key Features

### 🏠 **User Experience & Interface**
- **Modern Responsive Design** - Clean, professional interface optimized for all devices
- **Dark Mode Support** - Complete dark/light theme toggle with smooth transitions
- **Accessibility Features** - WCAG compliant design with proper contrast ratios
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Mobile-First Approach** - Optimized experience across desktop, tablet, and mobile

### 📊 **Health Assessment & Analytics**
- **Comprehensive Risk Assessment** - Multi-factor cardiovascular risk evaluation
- **Interactive Assessment Form** - User-friendly input with tooltips and validation
- **Real-time Risk Calculation** - Instant personalized risk scoring
- **Visual Risk Indicators** - Color-coded risk levels with clear explanations
- **Risk History Tracking** - Interactive charts showing health trends over time

### 📈 **Dashboard & Reporting**
- **Personal Health Dashboard** - Centralized hub for health metrics and insights
- **Latest Results Summary** - Quick overview of most recent assessment
- **Risk History Visualization** - Recharts-powered interactive line charts
- **Detailed Report Pages** - Comprehensive analysis with actionable recommendations
- **Key Metrics Breakdown** - Visual progress bars and health factor analysis
- **Printable Reports** - Export functionality for healthcare provider consultations

### � **Privacy & Security**
- **Data Privacy Protection** - Real-time processing with no personal data storage
- **Anonymous Assessments** - No personally identifiable information required
- **Secure Architecture** - Industry-standard security practices
- **GDPR Compliance Ready** - Privacy-first design principles

### 🎯 **Healthcare Integration**
- **Share with Doctor** - Easy report sharing functionality for medical consultations
- **Export as PDF** - Professional report generation for healthcare records
- **Medical Disclaimers** - Clear educational purpose statements
- **Healthcare Provider Resources** - Tools to facilitate medical discussions

### 🚀 **User Management & Authentication**
- **User Registration & Login** - Secure JWT-based authentication system
- **Profile Management** - Personal health information tracking
- **Assessment History** - Complete record of previous evaluations
- **Personalized Recommendations** - Tailored health improvement suggestions

### 📞 **Support & Resources**
- **Contact Support Modal** - Integrated customer support system
- **Comprehensive FAQ** - Detailed answers to common questions
- **Educational Content** - Heart health tips and lifestyle recommendations
- **About Us Page** - Team information and platform mission

### 🔧 **Technical Features**
- **Responsive Grid Layouts** - Adaptive design across all screen sizes
- **Form Validation** - Comprehensive input validation and error handling
- **State Management** - Efficient React state and context management
- **Theme Context** - Global dark/light mode state management
- **Routing** - React Router powered navigation with scroll-to-top functionality
- **Loading States** - Simple text loading indicators
- **Error Handling** - User-friendly error messages and fallbacks

## � Live Demo

<!-- TODO: Add live demo link when deployed -->
[Live Demo](https://cardio-care-demo.vercel.app) *(Coming Soon)*

## 📸 Screenshots

<!-- TODO: Add screenshots of the application -->

### Main Dashboard
![Dashboard](./screenshots/dashboard.png) *(Screenshot placeholder)*

### Health Assessment Form
![Assessment Form](./screenshots/assessment-form.png) *(Screenshot placeholder)*

### Detailed Report
![Detailed Report](./screenshots/detailed-report.png) *(Screenshot placeholder)*

### Dark Mode
![Dark Mode](./screenshots/dark-mode.png) *(Screenshot placeholder)*

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS 3** - Utility-first CSS framework with custom design system
- **Recharts** - Composable charting library built on React components
- **React Router DOM** - Declarative routing for React
- **Lucide React** - Beautiful & consistent icon toolkit

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **PostgreSQL** - Advanced open source relational database
- **JWT (jsonwebtoken)** - Secure authentication token system
- **bcrypt** - Password hashing and authentication
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing middleware

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS transformation tool
- **Autoprefixer** - CSS vendor prefixing

## � Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git
- **PostgreSQL** (v12 or higher) - Must be installed and running locally

### Database Setup

Before running the application, you need to set up a local PostgreSQL database:

1. **Install PostgreSQL** (if not already installed)
   - Download from [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
   - Or use a package manager like Homebrew (macOS) or Chocolatey (Windows)

2. **Create the database**
   ```sql
   -- Connect to PostgreSQL as superuser (usually 'postgres')
   createdb cardio_care
   ```

3. **Set up database credentials**
   - Ensure you have a PostgreSQL user (default is usually 'postgres')
   - Note your password for the PostgreSQL user
   - Copy the environment template: `cp server/.env.example server/.env`
   - Update the password in `server/.env` file or update `server/db.js` directly

4. **Apply database schema**
   ```bash
   # Navigate to the server directory
   cd server
   
   # Run the schema file to create tables and sample data
   psql -U postgres -d cardio_care -f database/schema.pgsql
   ```

### Project Structure

This project is organized as a clean, production-ready application with separate client and server:

```
UI-2/
├── .gitignore          # Git ignore rules (includes .env protection)
├── README.md           # This documentation file
├── client/             # React frontend application
│   ├── src/           # React components, pages, and contexts
│   │   ├── components/# React components (layout, pages, ui)
│   │   ├── contexts/  # Theme and User contexts
│   │   └── utils/     # Utility functions
│   ├── index.html     # Main HTML file
│   ├── package.json   # Frontend dependencies
│   └── ...           # Vite, Tailwind, ESLint configs
└── server/            # Express.js backend API
    ├── .env           # Environment variables (secured)
    ├── .env.example   # Environment template
    ├── database/      # Database schema
    │   └── schema.pgsql
    ├── db.js          # Database connection
    ├── server.js      # Main server file
    ├── package.json   # Backend dependencies
    └── ...
```

**Project Size**: ~104 MB (optimized and production-ready)
**Total Files**: ~11,000 (essential files only)

### Security Features
- **Environment Variables**: All sensitive credentials stored in `.env` files
- **Git Protection**: `.env` files are ignored by version control
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cardio-care.git
   cd UI-2
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   ```bash
   # In the server directory, copy the environment template
   cp .env.example .env
   
   # Edit .env file with your actual database credentials
   # Update: DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET
   ```

### Development Workflow

To run the application in development mode, you'll need **two separate terminals**:

#### Terminal 1 - Frontend Development Server
```bash
cd client
npm run dev
```
The frontend will be available at `http://localhost:5173`

#### Terminal 2 - Backend API Server
```bash
cd server
node server.js
```
The backend API will be available at `http://localhost:5000`

### Available Scripts

#### Client Scripts (run from `/client` directory)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Server Scripts (run from `/server` directory)
- `node server.js` - Start server (development/production)

## 🔧 Database Setup

### Prerequisites
- PostgreSQL (v12 or higher) installed and running locally

### Setup Steps

1. **Create the database**
   ```sql
   createdb cardio_care
   ```

2. **Apply database schema**
   ```bash
   cd server
   psql -U postgres -d cardio_care -f database/schema.pgsql
   ```

3. **Update environment variables**
   ```bash
   # In server/.env file:
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=cardio_care
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_secure_jwt_secret
   ```

## � API Endpoints

### Risk Prediction API

**Endpoint:** `POST /api/predict`

**Description:** Calculates cardiovascular risk based on user health metrics.

**Request Body:**
```json
{
  "age": 45,
  "gender": "female",
  "systolicBP": 125,
  "cholesterol": 248,
  "maxHeartRate": 165,
  "restingECG": "normal"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "riskLevel": "Low Risk",
    "riskPercentage": 25,
    "contributingFactors": [
      {
        "factor": "Age",
        "impact": "Low",
        "value": 45
      },
      {
        "factor": "Blood Pressure",
        "impact": "Moderate",
        "value": 125
      }
    ],
    "recommendations": [
      "Continue maintaining your current healthy lifestyle",
      "Regular exercise routine is beneficial",
      "Monitor blood pressure periodically"
    ]
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Invalid input data",
  "message": "All health metrics are required"
}
```

## 🏗️ Component Structure

```
client/src/
├── components/           # React components
│   ├── layout/          # Layout components (Header, Footer, Navigation)
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── MobileTopBar.jsx
│   │   └── SideNav.jsx
│   ├── pages/           # Page components
│   │   ├── AboutUsPage.jsx
│   │   ├── AssessmentPage.jsx
│   │   ├── DemoDashboardPage.jsx
│   │   ├── DetailedReportPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── PredictionPage.jsx
│   │   ├── RealDashboardPage.jsx
│   │   ├── SettingsPage.jsx
│   │   └── SignUpPage.jsx
│   └── ui/              # UI components
│       ├── CookieConsent.jsx
│       ├── PredictionForm.jsx
│       ├── ResultsDisplay.jsx
│       └── ResultsSkeleton.jsx
├── contexts/            # React contexts
│   ├── ThemeContext.jsx # Dark/light mode management
│   └── UserContext.jsx  # User authentication state
├── utils/               # Utility functions
│   └── cookieUtils.js   # Cookie management
├── App.jsx              # Main app component
├── index.css            # Global styles
└── main.jsx             # Application entry point
```

## 🤝 Contributing

We welcome contributions to Cardio Care! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## � Roadmap

- [x] **Backend API Development** - Complete Express.js backend with PostgreSQL
- [x] **User Authentication** - Secure login and registration system
- [x] **Data Persistence** - Save user assessments and history
- [x] **Profile Management** - User profile editing and management system
- [ ] **Advanced Analytics** - Enhanced risk prediction algorithms
- [ ] **Mobile App** - React Native mobile application
- [ ] **Healthcare Provider Portal** - Professional dashboard for medical practitioners
- [ ] **Integration APIs** - Connect with popular health tracking devices
- [ ] **Multi-language Support** - Internationalization and localization

### Authentication Endpoints

**User Registration:** `POST /api/auth/register`
```json
{
  "full_name": "John Doe## 🗺️ Roadmap

- [x] **Backend API Development** - Complete Express.js backend with PostgreSQL
- [x] **User Authentication** - Secure JWT-based login and registration system
- [x] **Data Persistence** - Save user assessments and history
- [x] **Profile Management** - User profile editing and management system
- [x] **Environment Security** - Secure credential management with dotenv
- [x] **Production Optimization** - Clean, optimized codebase (50% size reduction)
- [ ] **Advanced Analytics** - Enhanced risk prediction algorithms
- [ ] **Mobile App** - React Native mobile application
- [ ] **Healthcare Provider Portal** - Professional dashboard for medical practitioners
- [ ] **Integration APIs** - Connect with popular health tracking devices
- [ ] **Multi-language Support** - Internationalization and localization": "john@example.com",
  "password": "securePassword123"
}
```

**User Login:** `POST /api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**User Profile:** `GET /api/auth/profile` (requires JWT authentication)

### Assessment Endpoints

**Submit Assessment:** `POST /api/assessment/submit` (requires authentication)

**Get User Assessments:** `GET /api/assessment/history` (requires authentication)

**Get Assessment by ID:** `GET /api/assessment/:assessmentId` (requires authentication)


## ⚠️ Medical Disclaimer

**Important:** Cardio Care is an informational tool and is not a substitute for a medical diagnosis. The predictions provided are for educational purposes only. Always consult with a qualified healthcare professional for any health concerns or before making any decisions related to your health.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Veda Popat** 
- **Vraj Patel**  

## 🙏 Acknowledgments

- Heart health data sourced from anonymized medical research datasets
- Design inspiration from modern healthcare applications

---

**Built with ❤️ for better heart health**