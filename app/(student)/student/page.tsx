'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { 
  CalendarDays, Medal, Trophy, BookOpen, Clock, 
  ChevronRight, Award, TrendingUp, Users, Target,
  Play, FileText, CheckCircle, Star, BarChart3,
  MessageSquare, Bell, Settings, LogOut, Sparkles,
  Bookmark, GraduationCap, Layers, PenTool, Camera,
  Edit2, MoreHorizontal
} from 'lucide-react';
import { RoleShell } from '@/components/layout/role-shell';
import { DashboardSection } from '@/components/student/dashboard-section';
import { LearningTimeChart } from '@/components/student/learning-time-chart';
import { ProgressBar } from '@/components/student/progress-bar';
import { STUDENT_DASHBOARD_DATA } from '@/data/student-dashboard';

interface ProfileForm {
  fullName: string;
  email: string;
  bio: string;
  school: string;
  avatar?: string;
}

export default function StudentDashboardPage() {
  const data = STUDENT_DASHBOARD_DATA;

  // Local form state keeps profile editing responsive before API persistence is wired.
  const [profile, setProfile] = useState<ProfileForm>({
    ...data.profile,
    avatar: '/avatar-user.svg' // Default avatar path
  });

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const totalPoints = useMemo(
    () => data.achievements.reduce((sum, achievement) => sum + achievement.points, 0),
    [data.achievements],
  );

  const averageProgress = useMemo(
    () => Math.round(data.enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / data.enrolledCourses.length),
    [data.enrolledCourses],
  );

  // Current date and time
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const greeting = hours < 12 ? 'Morning' : hours < 18 ? 'Afternoon' : 'Evening';
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    return profile.fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <RoleShell title="Student Dashboard">
      {/* Welcome Section with Profile Picture and Settings */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a5f64] to-[#2a858b] p-8">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#7fe1d6]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        
        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white/30 shadow-xl md:h-24 md:w-24">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1fb6b6] to-[#157b86] text-2xl font-bold text-white md:text-3xl">
                    {getUserInitials()}
                  </div>
                )}
              </div>
              
              {/* Online Status Indicator */}
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 md:bottom-2 md:right-2"></span>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white md:text-4xl">
                Good {greeting}, {profile.fullName.split(' ')[0]}!
              </h1>
              <p className="mt-2 text-lg text-slate-200">
                Continue your learning to achieve your target
              </p>
              <div className="mt-4 flex items-center gap-3 text-sm text-slate-300">
                <CalendarDays className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Quick Stats and Settings */}
          <div className="flex items-center gap-4">
            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">{data.enrolledCourses.length}</p>
                <p className="text-xs text-slate-300">Active Courses</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">{data.streak.currentDays}</p>
                <p className="text-xs text-slate-300">Day Streak</p>
              </div>
            </div>

            {/* Settings Icon with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                title="Account Settings"
                className="rounded-xl bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <Settings className="h-5 w-5 text-white" />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <div className="absolute right-0 top-14 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                    <Link
                      href="/student/profile"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Users className="h-4 w-4 text-[#157b86]" />
                      View Profile
                    </Link>
                    <Link
                      href="/student/profile/edit"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Edit2 className="h-4 w-4 text-[#157b86]" />
                      Edit Profile
                    </Link>
                    <Link
                      href="/student/settings"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings className="h-4 w-4 text-[#157b86]" />
                      Account Settings
                    </Link>
                    <hr className="my-1 border-slate-200" />
                    <button
                      className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 transition-colors hover:bg-red-50"
                      onClick={() => {
                        setShowProfileMenu(false);
                        toast.success('Logged out successfully');
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#157b86] hover:shadow-lg">
          <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#157b86]/5 transition-transform group-hover:scale-150" />
          <BookOpen className="h-6 w-6 text-[#157b86]" />
          <p className="mt-4 text-2xl font-bold text-slate-900">{data.enrolledCourses.length}</p>
          <p className="text-sm text-slate-600">Enrolled Courses</p>
        </div>
        
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#157b86] hover:shadow-lg">
          <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#157b86]/5 transition-transform group-hover:scale-150" />
          <TrendingUp className="h-6 w-6 text-[#157b86]" />
          <p className="mt-4 text-2xl font-bold text-slate-900">{averageProgress}%</p>
          <p className="text-sm text-slate-600">Avg. Progress</p>
        </div>
        
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#157b86] hover:shadow-lg">
          <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#157b86]/5 transition-transform group-hover:scale-150" />
          <Target className="h-6 w-6 text-[#157b86]" />
          <p className="mt-4 text-2xl font-bold text-slate-900">{data.streak.currentDays}</p>
          <p className="text-sm text-slate-600">Day Streak</p>
        </div>
        
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#157b86] hover:shadow-lg">
          <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#157b86]/5 transition-transform group-hover:scale-150" />
          <Award className="h-6 w-6 text-[#157b86]" />
          <p className="mt-4 text-2xl font-bold text-slate-900">{totalPoints}</p>
          <p className="text-sm text-slate-600">Total Points</p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - My Courses */}
        <div className="lg:col-span-2 space-y-6">
          <DashboardSection 
            title="My Courses" 
            action={
              <Link href="/courses" className="text-sm font-semibold text-[#157b86] hover:text-[#1fb6b6]">
                See all
              </Link>
            }
          >
            <div className="space-y-4">
              {data.enrolledCourses.map((course) => (
                <div key={course.id} className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-[#157b86] hover:shadow-md">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#e3f8f5] px-2.5 py-0.5 text-xs font-semibold text-[#157b86]">
                          {course.category}
                        </span>
                        <span className="text-sm text-slate-500">{course.progress}% complete</span>
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-[#157b86]">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{course.nextLesson}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-700">{course.eta}</p>
                        <p className="text-xs text-slate-500">Time left</p>
                      </div>
                      <Link
                        href={`/course/${course.id}`}
                        className="rounded-lg bg-[#1fb6b6] p-2.5 text-white transition-all hover:bg-[#157b86]"
                      >
                        <Play className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4">
                    <ProgressBar value={course.progress} />
                  </div>
                </div>
              ))}
            </div>
          </DashboardSection>

          {/* Learning Time Chart */}
          <DashboardSection title="Learning Activity">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <LearningTimeChart data={data.learningTimeHours} />
            </div>
          </DashboardSection>
        </div>

        {/* Right Column - Assignments and Stats */}
        <div className="space-y-6">
          {/* Assignments Section */}
          <DashboardSection 
            title="Assignments" 
            action={
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                Due Today
              </span>
            }
          >
            <div className="space-y-3">
              <div className="rounded-xl border-l-4 border-l-red-500 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Wire frame design project</p>
                    <p className="mt-1 text-xs text-slate-500">UX/UI Design project</p>
                  </div>
                  <span className="text-xs font-medium text-red-600">1:40 AM</span>
                </div>
              </div>
              
              <div className="rounded-xl border-l-4 border-l-yellow-500 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Full stack Project</p>
                    <p className="mt-1 text-xs text-slate-500">Database schema design</p>
                  </div>
                  <span className="text-xs font-medium text-yellow-600">Tomorrow</span>
                </div>
              </div>
              
              <Link 
                href="/assignments" 
                className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-[#157b86] transition-colors hover:bg-slate-50"
              >
                View all assignments
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </DashboardSection>

          {/* Completed Courses */}
          <DashboardSection title="Completed">
            <div className="space-y-3">
              {data.completedCourses.slice(0, 3).map((course) => (
                <div key={course.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{course.title}</p>
                      <p className="text-xs text-slate-500">{course.completedOn}</p>
                    </div>
                  </div>
                  <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                    {course.score}%
                  </span>
                </div>
              ))}
            </div>
          </DashboardSection>

          {/* Your Mentors */}
          <DashboardSection title="Your Mentors">
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#157b86] to-[#1fb6b6] flex items-center justify-center text-white font-bold">
                  SR
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Steve Rogers</p>
                  <p className="text-xs text-slate-500">Mentor • UX Design</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1fb6b6] to-[#7fe1d6] flex items-center justify-center text-white font-bold">
                  ED
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Emma Davis</p>
                  <p className="text-xs text-slate-500">Mentor • Development</p>
                </div>
              </div>
              <Link 
                href="/mentors" 
                className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-[#157b86] transition-colors hover:bg-slate-50"
              >
                View all mentors
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </DashboardSection>
        </div>
      </div>

      {/* Bottom Grid - Leaderboard and Achievements */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Leaderboard */}
        <DashboardSection 
          title="Leaderboard" 
          action={<Trophy className="h-5 w-5 text-[#157b86]" />}
        >
          <div className="space-y-2">
            {data.leaderboard.map((entry) => (
              <div
                key={`${entry.rank}-${entry.name}`}
                className={`flex items-center justify-between rounded-xl border p-4 ${
                  entry.name === 'You' 
                    ? 'border-[#1fb6b6] bg-[#e3f8f5]' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                    entry.rank === 2 ? 'bg-slate-100 text-slate-700' :
                    entry.rank === 3 ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-50 text-slate-600'
                  }`}>
                    #{entry.rank}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{entry.name}</p>
                    <p className="text-xs text-slate-500">{entry.role}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#157b86]">{entry.points} pts</span>
              </div>
            ))}
          </div>
        </DashboardSection>

        {/* Achievements */}
        <DashboardSection 
          title="Recent Achievements" 
          action={<Award className="h-5 w-5 text-[#157b86]" />}
        >
          <div className="grid grid-cols-2 gap-3">
            {data.achievements.slice(0, 4).map((achievement) => (
              <div key={achievement.id} className="rounded-xl border border-slate-200 bg-white p-4 text-center transition-all hover:border-[#157b86]">
                <span className="text-3xl">{achievement.icon}</span>
                <p className="mt-2 text-sm font-semibold text-slate-900">{achievement.title}</p>
                <p className="mt-1 text-xs text-slate-500">+{achievement.points} pts</p>
              </div>
            ))}
          </div>
        </DashboardSection>
      </div>
    </RoleShell>
  );
}