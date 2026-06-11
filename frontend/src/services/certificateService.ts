import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios.js';
import type { ApiResponse, Certificate } from '../types/index.js';

export const useCertificates = () =>
  useQuery<Certificate[]>({
    queryKey: ['certificates'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Certificate[]>>('/certificates');
      return data.data;
    },
  });

export const useCreateCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (certData: Partial<Certificate>) => {
      const { data } = await api.post<ApiResponse<Certificate>>('/certificates', certData);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['certificates'] }),
  });
};

export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/certificates/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['certificates'] }),
  });
};
