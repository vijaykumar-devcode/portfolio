import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios.js';

export interface Skill {
  _id: string;
  category: string;
  icon: string;
  color: string;
  items: string[];
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

// Fetch all visible skills (Public)
export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: Skill[] }>('/skills');
      return data.data;
    },
  });
};

// Fetch all skills (Admin)
export const useAdminSkills = () => {
  return useQuery({
    queryKey: ['admin-skills'],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: Skill[] }>('/skills/admin');
      return data.data;
    },
  });
};

// Create Skill
export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (skillData: Partial<Skill>) => {
      const { data } = await api.post<{ success: boolean; data: Skill }>('/skills', skillData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
    },
  });
};

// Update Skill
export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Skill> }) => {
      const res = await api.put<{ success: boolean; data: Skill }>(`/skills/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
    },
  });
};

// Delete Skill
export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/skills/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
    },
  });
};

// Toggle Visibility
export const useToggleSkillVisibility = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.patch<{ success: boolean; data: Skill }>(`/skills/${id}/toggle`);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      queryClient.invalidateQueries({ queryKey: ['admin-skills'] });
    },
  });
};
