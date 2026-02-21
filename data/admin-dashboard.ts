export type ModerationStatus = 'pending' | 'approved' | 'flagged' | 'rejected';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  status: 'active' | 'suspended' | 'pending';
  points: number;
}

export interface InstructorApproval {
  id: string;
  name: string;
  expertise: string;
  requestedAt: string;
  status: ModerationStatus;
}

export interface CourseModerationItem {
  id: string;
  title: string;
  instructor: string;
  status: ModerationStatus;
  reports: number;
}

export interface CommunityModerationItem {
  id: string;
  type: 'post' | 'comment';
  author: string;
  excerpt: string;
  reports: number;
  status: ModerationStatus;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
}

export const ADMIN_DASHBOARD_DATA = {
  users: [
    { id: 'u1', name: 'Amina Yusuf', email: 'amina@yandytech.org', role: 'STUDENT', status: 'active', points: 1530 },
    { id: 'u2', name: 'Tobi Ahmed', email: 'tobi@yandytech.org', role: 'STUDENT', status: 'active', points: 1200 },
    { id: 'u3', name: 'Grace Kalu', email: 'grace@yandytech.org', role: 'INSTRUCTOR', status: 'active', points: 4500 },
    { id: 'u4', name: 'John Obi', email: 'john@yandytech.org', role: 'INSTRUCTOR', status: 'pending', points: 300 },
  ] as AdminUser[],
  instructorApprovals: [
    { id: 'ia1', name: 'John Obi', expertise: 'Machine Learning', requestedAt: '2026-02-12', status: 'pending' },
    { id: 'ia2', name: 'Blessing Ene', expertise: 'UX Design', requestedAt: '2026-02-10', status: 'pending' },
  ] as InstructorApproval[],
  courses: [
    { id: 'c1', title: 'UI/UX Design Fundamentals', instructor: 'Grace Kalu', status: 'approved', reports: 0 },
    { id: 'c2', title: 'AI & Machine Learning Intensive', instructor: 'John Obi', status: 'pending', reports: 2 },
    { id: 'c3', title: 'Robotics for Beginners', instructor: 'Timi Ekanem', status: 'flagged', reports: 6 },
  ] as CourseModerationItem[],
  communityItems: [
    { id: 'cm1', type: 'post', author: 'Amina Yusuf', excerpt: 'Need help with assignment 2 rubric', reports: 0, status: 'approved' },
    { id: 'cm2', type: 'comment', author: 'Unknown User', excerpt: 'Spam external links in thread', reports: 7, status: 'flagged' },
    { id: 'cm3', type: 'post', author: 'Tobi Ahmed', excerpt: 'Looking for teammate in robotics challenge', reports: 1, status: 'pending' },
  ] as CommunityModerationItem[],
  analytics: {
    monthlyActiveUsers: [420, 510, 640, 710, 860, 920],
    courseCompletions: [110, 130, 170, 190, 240, 260],
    moderationVolume: [32, 26, 41, 48, 39, 55],
  },
  siteConfiguration: {
    maintenanceMode: false,
    allowRegistration: true,
    supportEmail: 'support@yandytech.org',
    timezone: 'Africa/Lagos',
  },
  certificateTemplate: {
    title: 'SolutionLab Certificate of Completion',
    signatory: 'Program Director',
    accentColor: '#1fb6b6',
  },
  emailTemplates: [
    { id: 'et1', name: 'Welcome Email', subject: 'Welcome to SolutionLab LMS' },
    { id: 'et2', name: 'Course Completion', subject: 'Congratulations on completing your course' },
  ],
  pointsRules: [
    { id: 'pr1', event: 'Complete lesson', points: 10 },
    { id: 'pr2', event: 'Submit assignment', points: 20 },
    { id: 'pr3', event: 'Helpful community reply', points: 15 },
  ],
  auditLogs: [
    { id: 'al1', actor: 'Admin Sarah', action: 'Approved instructor', target: 'John Obi', timestamp: '2026-02-15 09:23' },
    { id: 'al2', actor: 'Admin Sarah', action: 'Flagged course', target: 'Robotics for Beginners', timestamp: '2026-02-15 08:11' },
    { id: 'al3', actor: 'Admin Mike', action: 'Updated points rule', target: 'Complete lesson', timestamp: '2026-02-14 17:44' },
  ] as AuditLog[],
};
