import pickle
import pandas as pd
import os
from pathlib import Path

# Get the directory where this file is located
current_dir = Path(__file__).parent

# Initialize model and scaler variables
model = None
scaler = None

def load_models():
    """Load the pre-trained model and scaler with error handling"""
    global model, scaler
    
    try:
        model_path = current_dir / 'model.pkl'
        scaler_path = current_dir / 'scaler.pkl'
        
        if not model_path.exists():
            print(f"Warning: Model file not found at {model_path}")
            return False
            
        if not scaler_path.exists():
            print(f"Warning: Scaler file not found at {scaler_path}")
            return False
        
        # Load the pre-trained model
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        
        # Load the scaler
        with open(scaler_path, 'rb') as f:
            scaler = pickle.load(f)
            
        print("✅ ML model and scaler loaded successfully")
        return True
        
    except Exception as e:
        print(f"❌ Error loading ML models: {e}")
        model = None
        scaler = None
        return False

# Try to load models when module is imported
load_models()

def make_prediction(input_data):
    """
    Takes the 21 assessment parameters, preprocesses them,
    and returns a prediction from the ML model.
    """
    global model, scaler
    
    try:
        # Check if models are loaded
        if model is None or scaler is None:
            print("⚠️ ML models not loaded, attempting to reload...")
            if not load_models():
                print("❌ Failed to load ML models, returning fallback prediction")
                # Return a fallback prediction structure
                return {
                    'risk_score': 0.3,  # Default moderate risk
                    'risk_level': 'Moderate',
                    'confidence_score': 0.6,
                    'recommendations': [
                        'ML model unavailable - consult healthcare provider for assessment',
                        'Regular health checkups are recommended'
                    ],
                    'risk_factors': ['Model temporarily unavailable']
                }
        
        # Convert the input data dictionary to a Pandas DataFrame
        # The column order MUST match the order the model was trained on
        df = pd.DataFrame([input_data])
        
        # Scale the data using the loaded scaler
        scaled_data = scaler.transform(df)
        
        # Make a prediction
        prediction = model.predict(scaled_data)
        prediction_proba = model.predict_proba(scaled_data)
        
        # Format the result
        risk_score = float(prediction_proba[0][1])  # Probability of heart attack
        risk_level = 'High' if risk_score > 0.5 else 'Low'  # Example threshold

        result = {
            'risk_score': risk_score,
            'risk_level': risk_level,
            'confidence_score': float(max(prediction_proba[0])),
            'recommendations': ['Consult a doctor for a full evaluation.'],
            'risk_factors': ['Based on model analysis.']
        }
        
        return result

    except Exception as e:
        print(f"❌ Error during prediction: {e}")
        # Return fallback prediction on any error
        return {
            'risk_score': 0.3,
            'risk_level': 'Moderate',
            'confidence_score': 0.6,
            'recommendations': [
                'Prediction service temporarily unavailable',
                'Please try again or consult healthcare provider'
            ],
            'risk_factors': ['System error occurred']
        }