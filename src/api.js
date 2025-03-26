import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8001' }); // Adjust based on your backend URL

export const uploadDocument = (pdf_file, conversation_id) => {
  const formData = new FormData();
  formData.append('pdf_file', pdf_file);
  if (conversation_id) formData.append('conversation_id', conversation_id);
  return API.post('/conversation/upload-document', formData);
};

export const askQuestion = (query, conversation_id) =>
  API.post('/conversation/ask', { query }, { params: { conversation_id } });

export const getHistory = (conversation_id) =>
  API.get(`/conversation/history/${conversation_id}`);
