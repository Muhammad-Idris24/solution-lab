export interface InstructorCourse {
  id: string;
  title: string;
  enrolledStudents: number;
  completionRate: number;
  avgScore: number;
  status: 'Draft' | 'Published';
}

export interface CourseStudent {
  id: string;
  name: string;
  email: string;
  progress: number;
  courseId: string;
}

export interface AssignmentSubmission {
  id: string;
  studentName: string;
  assignmentTitle: string;
  submittedAt: string;
  score?: number;
}

export interface QAItem {
  [x: string]: string;
  id: string;
  student: string;
  question: string;
  course: string;
  answered: boolean;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  audience: string;
  date: string;
}

export interface LessonModule {
  id: string;
  title: string;
  duration: string;
  type: 'Video' | 'Quiz' | 'Reading' | 'Assignment';
}

export const INSTRUCTOR_DASHBOARD_DATA = {
  courses: [
    { id: 'c1', title: 'UI/UX Design Fundamentals', enrolledStudents: 124, completionRate: 72, avgScore: 84, status: 'Published' },
    { id: 'c2', title: 'Advanced AI & Machine Learning', enrolledStudents: 96, completionRate: 58, avgScore: 79, status: 'Published' },
    { id: 'c3', title: 'Product Thinking for Founders', enrolledStudents: 0, completionRate: 0, avgScore: 0, status: 'Draft' },
  ] as InstructorCourse[],
  students: [
    { id: 's1', name: 'Amina Yusuf', email: 'amina@yandytech.org', progress: 91, courseId: 'c1' },
    { id: 's2', name: 'Tobi Ahmed', email: 'tobi@yandytech.org', progress: 64, courseId: 'c1' },
    { id: 's3', name: 'Grace Kalu', email: 'grace@yandytech.org', progress: 49, courseId: 'c2' },
    { id: 's4', name: 'John Obi', email: 'john@yandytech.org', progress: 76, courseId: 'c2' },
  ] as CourseStudent[],
  lessonModules: [
    { id: 'm1', title: 'Welcome and Course Roadmap', duration: '12 mins', type: 'Video' },
    { id: 'm2', title: 'Design principles quick quiz', duration: '8 mins', type: 'Quiz' },
    { id: 'm3', title: 'Reading: UX laws in practice', duration: '15 mins', type: 'Reading' },
    { id: 'm4', title: 'Assignment: Redesign checkout', duration: '40 mins', type: 'Assignment' },
  ] as LessonModule[],
  submissions: [
    { id: 'g1', studentName: 'Amina Yusuf', assignmentTitle: 'Checkout Redesign', submittedAt: '2026-02-10', score: 93 },
    { id: 'g2', studentName: 'Tobi Ahmed', assignmentTitle: 'Checkout Redesign', submittedAt: '2026-02-11' },
    { id: 'g3', studentName: 'Grace Kalu', assignmentTitle: 'AI Ethics Reflection', submittedAt: '2026-02-12', score: 88 },
  ] as AssignmentSubmission[],
  announcements: [
    { id: 'a1', title: 'Live mentorship holds Friday 6PM', audience: 'All students', date: '2026-02-14' },
    { id: 'a2', title: 'Deadline extended by 48 hours', audience: 'UI/UX cohort', date: '2026-02-12' },
  ] as AnnouncementItem[],
  qa: [
    { id: 'q1', student: 'Tobi Ahmed', question: 'How do I structure my case study?', course: 'UI/UX Design Fundamentals', answered: false },
    { id: 'q2', student: 'Grace Kalu', question: 'Can I use transfer learning for final project?', course: 'Advanced AI & Machine Learning', answered: true },
  ] as QAItem[],
};
