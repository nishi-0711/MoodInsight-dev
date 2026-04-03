import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust IP for your environment

const setItem = async (key, value) => {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

const getItem = async (key) => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

const deleteItem = async (key) => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    await setItem('userToken', response.data.token);
  }
  return response.data;
};

export const signup = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/signup`, { name, email, password });
  return response.data;
};

export const logout = async () => {
  await deleteItem('userToken');
};

export const getToken = async () => {
  return await getItem('userToken');
};
