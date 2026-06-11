import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios.js';
import type { ApiResponse, Message } from '../types/index.js';

export const useMessages = () =>
  useQuery<Message[]>({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Message[]>>('/messages');
      return data.data;
    },
  });

export const useSendMessage = () =>
  useMutation({
    mutationFn: async (messageData: Pick<Message, 'name' | 'email' | 'company' | 'jobRole' | 'subject' | 'content'>) => {
      const { data } = await api.post<ApiResponse<Message>>('/messages', messageData);
      return data;
    },
  });

export const useUpdateMessageStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; isRead?: boolean; isResponded?: boolean }) => {
      const { data } = await api.patch<ApiResponse<Message>>(`/messages/${id}`, updates);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/messages/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });
};
