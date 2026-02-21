'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { 
  BarChart3, Megaphone, MessageSquareText, Users, 
  BookOpen, Clock, Award, Star, TrendingUp, Target,
  ChevronRight, Play, Settings, LogOut, Calendar,
  CheckCircle, AlertCircle, PlusCircle, Filter,
  MoreHorizontal, Edit, Trash2, Eye, Download
} from 'lucide-react';
import { RoleShell } from '@/components/layout/role-shell';
import { AnalyticsMiniChart } from '@/components/instructor/analytics-mini-chart';
import { DragModuleList } from '@/components/instructor/drag-module-list';
import { InstructorSection } from '@/components/instructor/instructor-section';
import {
  AssignmentSubmission,
  INSTRUCTOR_DASHBOARD_DATA,
  InstructorCourse,
  LessonModule,
} from '@/data/instructor-dashboard';

export default function InstructorDashboardPage() {
  const data = INSTRUCTOR_DASHBOARD_DATA;
  const [selectedCourseId, setSelectedCourseId] = useState(data.courses[0].id);
  const [modules, setModules] = useState<LessonModule[]>(data.lessonModules);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(data.submissions);
  const [announcement, setAnnouncement] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  const selectedCourse = useMemo<InstructorCourse | undefined>(
    () => data.courses.find((course) => course.id === selectedCourseId),
    [data.courses, selectedCourseId],
  );

  const studentsForCourse = useMemo(
    () => data.students.filter((student) => student.courseId === selectedCourseId),
    [data.students, selectedCourseId],
  );

  const pendingSubmissions = useMemo(() => submissions.filter((entry) => entry.score === undefined).length, [submissions]);

  const gradeSubmission = (id: string, score: number) => {
    setSubmissions((previous) =>
      previous.map((entry) => (entry.id === id ? { ...entry, score } : entry)),
    );
    toast.success('Assignment graded.');
  };

  const publishAnnouncement = () => {
    if (!announcement.trim()) {
      toast.error('Write an announcement first.');
      return;
    }
    toast.success('Announcement published to selected cohort.');
    setAnnouncement('');
  };

  // Get instructor initials for avatar fallback
  const getInstructorInitials = () => {
    return 'AM'; // This would come from actual user data
  };

  // Current date
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <RoleShell title="Instructor Dashboard">
      {/* Welcome Section with Profile */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a5f64] to-[#2a858b] p-8">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#7fe1d6]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        
        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white/30 shadow-xl md:h-24 md:w-24">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1fb6b6] to-[#157b86] text-2xl font-bold text-white md:text-3xl">
                  {getInstructorInitials()}
                </div>
              </div>
              {/* Online Status */}
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 md:bottom-2 md:right-2"></span>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white md:text-4xl">
                Welcome back, Engr. Magaga!
              </h1>
              <p className="mt-2 text-lg text-slate-200">
                Manage your courses and engage with your students
              </p>
              <div className="mt-4 flex items-center gap-3 text-sm text-slate-300">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Quick Stats and Settings */}
          <div className="flex items-center gap-4">
            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm text-center">
                <p className="text-2xl font-bold text-white">{data.courses.length}</p>
                <p className="text-xs text-slate-300">Courses</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm text-center">
                <p className="text-2xl font-bold text-white">{data.students.length}</p>
                <p className="text-xs text-slate-300">Students</p>
              </div>
            </div>

            {/* Settings Icon with Dropdown */}
            <div className="relative">
              <button
                title="Profile and settings"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
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
                      href="/instructor/profile"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Users className="h-4 w-4 text-[#157b86]" />
                      View Profile
                    </Link>
                    <Link
                      href="/instructor/settings"
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

      {/* Statistics Cards - Enhanced */}
      <section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#157b86] hover:shadow-lg">
          <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#157b86]/5 transition-transform group-hover:scale-150" />
          <BookOpen className="h-6 w-6 text-[#157b86]" />
          <p className="mt-4 text-2xl font-bold text-slate-900">{data.courses.length}</p>
          <p className="text-sm text-slate-600">Active Courses</p>
          <span className="mt-2 inline-block text-xs text-green-600">+2 this month</span>
        </div>
        
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#157b86] hover:shadow-lg">
          <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#157b86]/5 transition-transform group-hover:scale-150" />
          <Users className="h-6 w-6 text-[#157b86]" />
          <p className="mt-4 text-2xl font-bold text-slate-900">{data.students.length}</p>
          <p className="text-sm text-slate-600">Total Students</p>
          <span className="mt-2 inline-block text-xs text-green-600">+12 this week</span>
        </div>
        
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#157b86] hover:shadow-lg">
          <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#157b86]/5 transition-transform group-hover:scale-150" />
          <Clock className="h-6 w-6 text-[#157b86]" />
          <p className="mt-4 text-2xl font-bold text-slate-900">{pendingSubmissions}</p>
          <p className="text-sm text-slate-600">Pending Grading</p>
          <span className="mt-2 inline-block text-xs text-orange-600">{pendingSubmissions} need attention</span>
        </div>
        
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#157b86] hover:shadow-lg">
          <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#157b86]/5 transition-transform group-hover:scale-150" />
          <MessageSquareText className="h-6 w-6 text-[#157b86]" />
          <p className="mt-4 text-2xl font-bold text-slate-900">{data.qa.filter((item) => !item.answered).length}</p>
          <p className="text-sm text-slate-600">Unanswered Q&A</p>
          <span className="mt-2 inline-block text-xs text-red-600">Reply needed</span>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Courses and Students */}
        <div className="lg:col-span-2 space-y-6">
          {/* Courses Section */}
          <InstructorSection
            title="Your Courses"
            action={
              <div className="flex items-center gap-2">
                <select
                  value={selectedCourseId}
                  onChange={(event) => setSelectedCourseId(event.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:border-[#157b86] focus:outline-none"
                  aria-label="Select a course"
                >
                  {data.courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                <button title="Create new course" className="rounded-lg bg-[#1fb6b6] p-2 text-white hover:bg-[#157b86]">
                  <PlusCircle className="h-5 w-5" />
                </button>
              </div>
            }
          >
            <div className="space-y-4">
              {data.courses.map((course) => (
                <div
                  key={course.id}
                  className={`group rounded-xl border p-5 transition-all ${
                    course.id === selectedCourseId 
                      ? 'border-[#1fb6b6] bg-gradient-to-r from-[#e3f8f5] to-white' 
                      : 'border-slate-200 bg-white hover:border-[#157b86] hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          course.status === 'Published' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {course.status}
                        </span>
                        <span className="text-sm text-slate-500">{course.enrolledStudents} students</span>
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-[#157b86]">
                        {course.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-slate-600">
                          <TrendingUp className="h-4 w-4 text-[#157b86]" />
                          {course.completionRate}% completion
                        </span>
                        <span className="flex items-center gap-1 text-slate-600">
                          <Award className="h-4 w-4 text-[#157b86]" />
                          {course.avgScore}% avg score
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/instructor/course/${course.id}/edit`}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition-all hover:border-[#157b86] hover:text-[#157b86]"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/course/${course.id}/preview`}
                        className="rounded-lg bg-[#1fb6b6] p-2 text-white transition-all hover:bg-[#157b86]"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InstructorSection>

          {/* Student List */}
          <InstructorSection 
            title="Recent Students" 
            action={
              <Link href="/instructor/students" className="text-sm font-semibold text-[#157b86] hover:text-[#1fb6b6]">
                View all
              </Link>
            }
          >
            <div className="space-y-3">
              {studentsForCourse.length === 0 ? (
                <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                  No students enrolled in this course yet.
                </p>
              ) : (
                studentsForCourse.slice(0, 5).map((student) => (
                  <div key={student.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#157b86] hover:shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1fb6b6] to-[#157b86] flex items-center justify-center text-sm font-bold text-white">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-200">
                            <div 
                              className="h-full bg-[#1fb6b6] rounded-full"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-[#157b86]">{student.progress}%</span>
                        </div>
                      </div>
                      <button title="Message student" className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:border-[#157b86] hover:text-[#157b86]">
                        <MessageSquareText className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </InstructorSection>
        </div>

        {/* Right Column - Analytics and Preview */}
        <div className="space-y-6">
          {/* Course Analytics */}
          <InstructorSection title="Course Analytics" action={<BarChart3 className="h-5 w-5 text-[#157b86]" />}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">Completion Rate</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">{selectedCourse?.completionRate ?? 0}%</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${selectedCourse?.completionRate ?? 0}%` }}
                    />
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-500">Average Score</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">{selectedCourse?.avgScore ?? 0}%</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div 
                      className="h-full bg-[#1fb6b6] rounded-full"
                      style={{ width: `${selectedCourse?.avgScore ?? 0}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-slate-700">Weekly Engagement</p>
                  <select 
                    title='Select time range for analytics'
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="text-xs border border-slate-200 rounded px-2 py-1"
                  >
                    <option value="week">Last 7 days</option>
                    <option value="month">Last 30 days</option>
                    <option value="quarter">Last 90 days</option>
                  </select>
                </div>
                <AnalyticsMiniChart values={[45, 62, 58, 70, 76, 82, selectedCourse?.completionRate ?? 0]} />
              </div>

              <Link 
                href={`/instructor/analytics/${selectedCourseId}`}
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-[#157b86] transition-colors hover:bg-slate-50"
              >
                View detailed analytics
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </InstructorSection>

          {/* Course Preview */}
          <InstructorSection title="Course Preview" action={<Eye className="h-5 w-5 text-[#157b86]" />}>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#1fb6b6] to-[#157b86] flex items-center justify-center text-white">
                  <Play className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{selectedCourse?.title}</p>
                  <p className="text-xs text-slate-500">Preview as student</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Simulate learner experience before publishing new lesson updates.
              </p>
              <Link
                href={`/course/${selectedCourseId}/preview`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1fb6b6] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#157b86]"
              >
                Launch Preview
                <Play className="h-4 w-4" />
              </Link>
            </div>
          </InstructorSection>
        </div>
      </div>

      {/* Bottom Grid - Lesson Builder and Grading */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Lesson Builder */}
        <InstructorSection 
          title="Lesson Builder" 
          action={
            <button className="text-sm font-semibold text-[#157b86] hover:text-[#1fb6b6]">
              + Add Module
            </button>
          }
        >
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 mb-4 text-sm text-slate-600">
            <span className="font-semibold">💡 Tip:</span> Drag modules to reorder lesson flow for the selected course.
          </div>
          <DragModuleList
            modules={modules}
            onReorder={(nextModules) => {
              setModules(nextModules);
              toast.success('Module order updated.');
            }}
          />
        </InstructorSection>

        {/* Assignment Grading */}
        <InstructorSection 
          title="Pending Submissions" 
          action={
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-semibold text-[#157b86]">{pendingSubmissions} pending</span>
            </div>
          }
        >
          <div className="space-y-3">
            {submissions.length === 0 ? (
              <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                No submissions to grade.
              </p>
            ) : (
              submissions.map((submission) => (
                <div key={submission.id} className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#157b86]">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{submission.assignmentTitle}</p>
                      <p className="text-sm text-slate-600">{submission.studentName}</p>
                      <p className="mt-1 text-xs text-slate-500">Submitted {submission.submittedAt}</p>
                    </div>
                    {submission.score !== undefined ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                        {submission.score}%
                      </span>
                    ) : (
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                        Pending
                      </span>
                    )}
                  </div>
                  
                  {submission.score === undefined && (
                    <div className="mt-3 flex items-center gap-2">
                      <p className="text-xs text-slate-500 mr-2">Quick grade:</p>
                      {[70, 80, 90, 100].map((score) => (
                        <button
                          key={score}
                          onClick={() => gradeSubmission(submission.id, score)}
                          className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 transition-all hover:border-[#1fb6b6] hover:bg-[#e3f8f5] hover:text-[#157b86]"
                        >
                          {score}%
                        </button>
                      ))}
                      <button title='More options' className="ml-auto rounded-md border border-slate-200 p-1 text-slate-600 hover:border-[#157b86]">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </InstructorSection>
      </div>

      {/* Bottom Grid - Announcements and Q&A */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Announcements */}
        <InstructorSection title="Announcements" action={<Megaphone className="h-5 w-5 text-[#157b86]" />}>
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <textarea
                value={announcement}
                onChange={(event) => setAnnouncement(event.target.value)}
                placeholder="Write an announcement to your learners..."
                className="h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#157b86] focus:outline-none focus:ring-1 focus:ring-[#157b86]"
              />
              <div className="mt-3 flex items-center justify-between">
                <select title='Select course for announcement'
                 className="rounded-lg border border-slate-200 px-3 py-2 text-xs">
                  <option>All courses</option>
                  {data.courses.map(course => (
                    <option key={course.id}>{course.title}</option>
                  ))}
                </select>
                <button 
                  onClick={publishAnnouncement} 
                  className="rounded-lg bg-gradient-to-r from-[#1fb6b6] to-[#157b86] px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
                >
                  Publish
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recent Announcements</p>
              {data.announcements.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.audience} • {item.date}</p>
                    </div>
                    <button title="More options" className="text-slate-400 hover:text-[#157b86]">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </InstructorSection>

        {/* Q&A Management */}
        <InstructorSection title="Q&A Management" action={<MessageSquareText className="h-5 w-5 text-[#157b86]" />}>
          <div className="space-y-3">
            {data.qa.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#157b86]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-slate-900">{item.student}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.answered 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {item.answered ? 'Answered' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">{item.question}</p>
                    <p className="mt-2 text-xs text-slate-500">{item.course} • {item.date || '2 hours ago'}</p>
                  </div>
                  {!item.answered && (
                    <button className="rounded-lg bg-[#1fb6b6] px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#157b86]">
                      Reply
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            <Link 
              href="/instructor/qa"
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-[#157b86] transition-colors hover:bg-slate-50"
            >
              View all questions
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </InstructorSection>
      </div>
    </RoleShell>
  );
}