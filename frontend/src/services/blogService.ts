import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios.js';
import type { ApiResponse, Blog } from '../types/index.js';

export const useBlogs = () =>
  useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Blog[]>>('/blogs');
      return data.data;
    },
  });

export const useBlog = (slug: string) =>
  useQuery<Blog>({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Blog>>(`/blogs/slug/${slug}`);
      return data.data;
    },
    enabled: !!slug,
  });

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (blogData: Partial<Blog>) => {
      const { data } = await api.post<ApiResponse<Blog>>('/blogs', blogData);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...blogData }: Partial<Blog> & { id: string }) => {
      const { data } = await api.put<ApiResponse<Blog>>(`/blogs/${id}`, blogData);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/blogs/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  });
};
