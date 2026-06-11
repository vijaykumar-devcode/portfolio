import api from '../lib/axios.js';

export interface UploadResult {
  url: string;
  publicId: string;
}

export const uploadImage = async (file: File): Promise<UploadResult> => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await api.post<{ success: boolean; data: UploadResult }>(
    '/upload',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data.data;
};

export const uploadMultipleImages = async (files: File[]): Promise<UploadResult[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));

  const { data } = await api.post<{ success: boolean; data: UploadResult[] }>(
    '/upload/multiple',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data.data;
};
