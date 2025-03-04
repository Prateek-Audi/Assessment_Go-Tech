import axios from 'axios';

export const login = async (username: string, password: string) => {
  const response = await axios.post('https://dummyjson.com/auth/login', {
    username,
    password,
  });
  return response.data;
};
