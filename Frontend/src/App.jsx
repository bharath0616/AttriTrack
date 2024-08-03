import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    gender: '',
    SeniorCitizen: '',
    Partner: '',
    Dependents: '',
    tenure: '',
    PhoneService: '',
    MultipleLines: '',
    Contract: '',
    TotalCharges: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/predict', formData)
      .then(response => {
        setResult(response.data.result);
      })
      .catch(error => {
        console.error('There was an error making the request!', error);
      });
  };

  return (
    <div>
      <h1>Churn Predictor</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Senior Citizen:
          <select name="SeniorCitizen" value={formData.SeniorCitizen} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <br />
        <label>
          Partner:
          <select name="Partner" value={formData.Partner} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <br />
        <label>
          Dependents:
          <select name="Dependents" value={formData.Dependents} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <br />
        <label>
          Tenure:
          <input type="number" name="tenure" value={formData.tenure} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone Service:
          <select name="PhoneService" value={formData.PhoneService} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <br />
        <label>
          Multiple Lines:
          <select name="MultipleLines" value={formData.MultipleLines} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="No phone service">No phone service</option>
          </select>
        </label>
        <br />
        <label>
          Contract:
          <select name="Contract" value={formData.Contract} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Month-to-month">Month-to-month</option>
            <option value="One year">One year</option>
            <option value="Two year">Two year</option>
          </select>
        </label>
        <br />
        <label>
          Total Charges:
          <input type="number" name="TotalCharges" value={formData.TotalCharges} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>
      {result && <h2>Result: {result}</h2>}
    </div>
  );
}

export default App;
