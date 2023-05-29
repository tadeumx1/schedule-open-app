import axios from 'axios';
import { Platform } from 'react-native';

const url =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export const api = axios.create({
  baseURL: url,
});
