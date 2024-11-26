import axios from "axios"

export async function login(username, password) {
    try {
      const data = {
        username: username,
        password: password,
      };
  
      const res = await axios.post('http://217.12.38.89:5000/auth/login', data);
  
      return res.data; 
    } catch (e) {
      throw e; 
    }
  }