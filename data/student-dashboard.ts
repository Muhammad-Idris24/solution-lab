export interface StudentDashboardData {
  enrolledCourses: {
    id: string;
    title: string;
    category: string;
    progress: number;
    nextLesson: string;
    eta: string;
  }[];
  completedCourses: {
    id: string;
    title: string;
    completedOn: string;
    score: number;
  }[];
  certificates: {
    id: string;
    title: string;
    issuedOn: string;
    credentialId: string;
  }[];
  achievements: {
    id: string;
    title: string;
    points: number;
    icon: string;
  }[];
  learningTimeHours: {
    week: string;
    hours: number;
  }[];
  leaderboard: {
    rank: number;
    name: string;
    points: number;
    role: 'Student' | 'Mentor';
  }[];
  activityFeed: {
    id: string;
    type: 'reply' | 'post' | 'like';
    text: string;
    timestamp: string;
  }[];
  streak: {
    currentDays: number;
    bestDays: number;
    activeDays: number[];
  };
  profile: {
    fullName: string;
    email: string;
    bio: string;
    school: string;
  };
}

export const STUDENT_DASHBOARD_DATA: StudentDashboardData = {
  enrolledCourses: [
    {
      id: 'c1',
      title: 'UI/UX Design Fundamentals',
      category: 'Design',
      progress: 68,
      nextLesson: 'Design systems and component thinking',
      eta: '20 mins',
    },
    {
      id: 'c2',
      title: 'Advanced AI & Machine Learning',
      category: 'DeepTech',
      progress: 42,
      nextLesson: 'Regularization techniques in deep networks',
      eta: '35 mins',
    },
    {
      id: 'c3',
      title: 'IoT & Embedded Systems',
      category: 'Robotics',
      progress: 83,
      nextLesson: 'Publishing telemetry to cloud broker',
      eta: '15 mins',
    },
  ],
  completedCourses: [
    { id: 'cc1', title: 'Digital Productivity Essentials', completedOn: '2026-01-14', score: 91 },
    { id: 'cc2', title: 'Remote Team Collaboration', completedOn: '2025-12-18', score: 88 },
  ],
  certificates: [
    {
      id: 'cert1',
      title: 'Digital Productivity Essentials',
      issuedOn: '2026-01-16',
      credentialId: 'SL-YT-2026-0017',
    },
    {
      id: 'cert2',
      title: 'Remote Team Collaboration',
      issuedOn: '2025-12-20',
      credentialId: 'SL-YT-2025-0981',
    },
  ],
  achievements: [
    { id: 'a1', title: '7-Day Consistency', points: 120, icon: '🔥' },
    { id: 'a2', title: 'Top 10 in AI Cohort', points: 220, icon: '🏆' },
    { id: 'a3', title: 'Community Helper', points: 160, icon: '🤝' },
  ],
  learningTimeHours: [
    { week: 'W1', hours: 4 },
    { week: 'W2', hours: 6 },
    { week: 'W3', hours: 7 },
    { week: 'W4', hours: 5 },
    { week: 'W5', hours: 8 },
    { week: 'W6', hours: 9 },
  ],
  leaderboard: [
    { rank: 1, name: 'Chidera N.', points: 1730, role: 'Student' },
    { rank: 2, name: 'Amina B.', points: 1695, role: 'Student' },
    { rank: 3, name: 'Samuel O.', points: 1652, role: 'Student' },
    { rank: 4, name: 'You', points: 1515, role: 'Student' },
    { rank: 5, name: 'Mentor Ada', points: 1490, role: 'Mentor' },
  ],
  activityFeed: [
    { id: 'ac1', type: 'post', text: 'Posted in “Help with Figma Auto Layout”', timestamp: '2h ago' },
    { id: 'ac2', type: 'reply', text: 'Replied to “Project Ideas for Robotics”', timestamp: '5h ago' },
    { id: 'ac3', type: 'like', text: 'Liked 4 community answers', timestamp: '1d ago' },
  ],
  streak: {
    currentDays: 11,
    bestDays: 24,
    activeDays: [1, 2, 3, 5, 6, 8, 9, 10, 11],
  },
  profile: {
    fullName: 'SolutionLab Learner',
    email: 'student@solutionlab.org',
    bio: 'Passionate about practical digital skills, community, and real-world projects.',
    school: 'School of DeepTech',
  },
};
