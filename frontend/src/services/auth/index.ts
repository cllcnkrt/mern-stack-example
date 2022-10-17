import axios from 'axios';
import { IAuth } from '../../redux/slices/auth/IAuth';
const API_URL = '/api/users';

const register = async (userData: IAuth.State) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
};

export default authService;
