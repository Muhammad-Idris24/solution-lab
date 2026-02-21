import { MOCK_COURSES } from '@/data/mock-data';
import { Course } from '@/types/index';
import { apiClient } from './api-client';

export const courseService = {
  async listCourses(): Promise<Course[]> {
    try {
      const { data } = await apiClient.get<Course[]>('/courses');
      return data;
    } catch {
      return MOCK_COURSES;
    }
  },
};
