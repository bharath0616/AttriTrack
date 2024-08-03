from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler

app = Flask(__name__)
CORS(app)

# Load the trained model
model_path = 'AttriTrack'  # Adjust the path if necessary
with open(model_path, 'rb') as file:
    model = pickle.load(file)

# Initialize encoders and scalers (ensure these are pre-fitted)
label_encoder = LabelEncoder()
scaler = StandardScaler()

@app.route('/check', methods=['GET'])
def check():
    print("Port is working")
    return "Server is running and the port is working!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_data = {
        'gender': data['gender'],
        'SeniorCitizen': data['SeniorCitizen'],
        'Partner': data['Partner'],
        'Dependents': data['Dependents'],
        'tenure': data['tenure'],
        'PhoneService': data['PhoneService'],
        'MultipleLines': data['MultipleLines'],
        'Contract': data['Contract'],
        'TotalCharges': data['TotalCharges']
    }

    # Create DataFrame from the dictionary
    df = pd.DataFrame([input_data])

    # Apply label encoding to each categorical column
    categorical_columns = ['gender', 'SeniorCitizen', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines', 'Contract']
    for column in categorical_columns:
        df[column] = label_encoder.fit_transform(df[column].astype(str))

    # Apply scaling
    df = scaler.transform(df)  # Use pre-fitted scaler

    # Make a prediction
    prediction = model.predict(df).reshape(1, -1)[0]
    result = 'churn' if prediction == 1 else 'not churn'
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
