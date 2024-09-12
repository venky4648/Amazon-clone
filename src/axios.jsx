import axios from 'axios';

// Create an instance of axios with default settings
const instance = axios.create({
  baseURL: 'http://127.0.0.1:5001/clone-97aff/us-central1/api', // Replace with your Firebase function URL
  // You can add default headers if needed:
  // headers: { 'Authorization': 'Bearer your-token' }
});

export default instance;
