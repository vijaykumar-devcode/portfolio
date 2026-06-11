import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios.js';

export interface UserProfile {
  cvUrl?: string;
  username?: string;
  password?: string;
}

// Fetch public profile
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: UserProfile | null }>('/users/profile');
      return data.data;
    },
  });
};

// Update admin profile (cvUrl)
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profileData: UserProfile) => {
      const { data } = await api.put<{ success: boolean; data: UserProfile }>('/users/profile', profileData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

// Upload CV File
export const useUploadCV = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('cv', file);
      const { data } = await api.post<{ success: boolean; data: { url: string; publicId: string } }>('/upload/cv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
