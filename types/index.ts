export type UserRole = 'PUBLIC' | 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export enum SchoolType {
  DESIGN = 'School of Design',
  DEEPTECH = 'School of DeepTech',
  ROBOTICS = 'School of Robotics',
  VIRTUAL_ECONOMY = 'School of Virtual Economy',
  LIFE_LEARNING = 'School of Life Learning',
  BASIC_DIGITAL = 'School of Basic Digital Skills',
}

export interface Course {
  students: number;
  id: string;
  title: string;
  school: SchoolType;
  instructor: string;
  description: string;
  syllabus: string[];
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}
