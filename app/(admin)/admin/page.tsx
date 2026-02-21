'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  Search, Settings, ShieldCheck, Users, BookOpen,
  AlertTriangle, Calendar, Download, Filter, MoreHorizontal,
  CheckCircle, XCircle, Clock, Eye, UserCheck, UserX,
  TrendingUp, BarChart3, Globe, Mail, Award, Bell,
  LogOut, ChevronRight, PlusCircle, Edit, Trash2,
  DollarSign, Activity, Camera
} from 'lucide-react';
import { RoleShell } from '@/components/layout/role-shell';
import { AdminMiniChart } from '@/components/admin/admin-mini-chart';
import { AdminSection } from '@/components/admin/admin-section';
import {
  ADMIN_DASHBOARD_DATA,
  CommunityModerationItem,
  CourseModerationItem,
  InstructorApproval,
} from '@/data/admin-dashboard';

export default function AdminDashboardPage() {
  const data = ADMIN_DASHBOARD_DATA;

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'>('ALL');
  const [instructorApprovals, setInstructorApprovals] = useState<InstructorApproval[]>(data.instructorApprovals);
  const [courses, setCourses] = useState<CourseModerationItem[]>(data.courses);
  const [communityItems, setCommunityItems] = useState<CommunityModerationItem[]>(data.communityItems);
  const [supportEmail, setSupportEmail] = useState(data.siteConfiguration.supportEmail);
  const [certTitle, setCertTitle] = useState(data.certificateTemplate.title);
  const [emailTemplates, setEmailTemplates] = useState(data.emailTemplates);
  const [pointsRules, setPointsRules] = useState(data.pointsRules);
  const [auditLogs, setAuditLogs] = useState(data.auditLogs);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  const filteredUsers = useMemo(() => {
    return data.users.filter((user) => {
      const byRole = roleFilter === 'ALL' || user.role === roleFilter;
      const bySearch = [user.name, user.email].join(' ').toLowerCase().includes(search.toLowerCase());
      return byRole && bySearch;
    });
  }, [data.users, roleFilter, search]);

  const appendLog = (action: string, target: string) => {
    const item = {
      id: `al-${Date.now()}`,
      actor: 'Current Admin',
      action,
      target,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };
    setAuditLogs((previous) => [item, ...previous].slice(0, 20));
  };

  const decideInstructor = (id: string, status: 'approved' | 'rejected') => {
    setInstructorApprovals((previous) =>
      previous.map((entry) => (entry.id === id ? { ...entry, status } : entry)),
    );
    const target = instructorApprovals.find((entry) => entry.id === id)?.name ?? id;
    appendLog(status === 'approved' ? 'Approved instructor' : 'Rejected instructor', target);
    toast.success(`Instructor ${status}.`);
  };

  const moderateCourse = (id: string, status: 'approved' | 'flagged' | 'rejected') => {
    setCourses((previous) => previous.map((entry) => (entry.id === id ? { ...entry, status } : entry)));
    const target = courses.find((entry) => entry.id === id)?.title ?? id;
    appendLog('Updated course moderation', target);
    toast.success(`Course marked ${status}.`);
  };

  const moderateCommunity = (id: string, status: 'approved' | 'flagged' | 'rejected') => {
    setCommunityItems((previous) => previous.map((entry) => (entry.id === id ? { ...entry, status } : entry)));
    const target = communityItems.find((entry) => entry.id === id)?.id ?? id;
    appendLog('Updated community moderation', target);
    toast.success(`Community item marked ${status}.`);
  };

  // Get admin initials
  const getAdminInitials = () => {
    return 'AD'; // This would come from actual user data
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
    <RoleShell title="Admin Control Panel">
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
                  {getAdminInitials()}
                </div>
              </div>
              {/* Online Status */}
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 md:bottom-2 md:right-2"></span>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white md:text-4xl">
                Welcome back, Admin
              </h1>
              <p className="mt-2 text-lg text-slate-200">
                Manage platform settings, users, and content moderation
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
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm text-center min-w-[80px]">
                <p className="text-2xl font-bold text-white">{data.users.length}</p>
                <p className="text-xs text-slate-300">Users</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm text-center min-w-[80px]">
                <p className="text-2xl font-bold text-white">{data.courses.length}</p>
                <p className="text-xs text-slate-300">Courses</p>
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
                      href="/admin/profile"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Users className="h-4 w-4 text-[#157b86]" />
                      View Profile
                    </Link>
                    <Link
                      href="/admin/settings"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings className="h-4 w-4 text-[#157b86]" />
                      System Settings
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
          <Users className="h-6 w-6 text-[#157b86]" />
          <p className="mt-4 text-2xl font-bold text-slate-900">{data.users.length}</p>
          <p className="text-sm text-slate-600">Total Users</p>
          <span className="mt-2 inline-block text-xs text-green-600">+124 this month</span>
        </div>
        
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#157b86] hover:shadow-lg">
          <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#157b86]/5 transition-transform group-hover:scale-150" />
          <UserCheck className="h-6 w-6 text-[#157b86]" />
          <p className="mt-4 text-2xl font-bold text-slate-900">{instructorApprovals.filter((a) => a.status === 'pending').length}</p>
          <p className="text-sm text-slate-600">Pending Approvals</p>
          <span className="mt-2 inline-block text-xs text-orange-600">Needs review</span>
        </div>
        
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#157b86] hover:shadow-lg">
          <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#157b86]/5 transition-transform group-hover:scale-150" />
          <AlertTriangle className="h-6 w-6 text-[#157b86]" />
          <p className="mt-4 text-2xl font-bold text-slate-900">{courses.filter((c) => c.status === 'flagged').length + communityItems.filter((c) => c.status === 'flagged').length}</p>
          <p className="text-sm text-slate-600">Flagged Content</p>
          <span className="mt-2 inline-block text-xs text-red-600">Immediate attention</span>
        </div>
        
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#157b86] hover:shadow-lg">
          <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-[#157b86]/5 transition-transform group-hover:scale-150" />
          <Activity className="h-6 w-6 text-[#157b86]" />
          <p className="mt-4 text-2xl font-bold text-slate-900">{auditLogs.length}</p>
          <p className="text-sm text-slate-600">Audit Logs</p>
          <span className="mt-2 inline-block text-xs text-blue-600">Last 24 hours</span>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - User Management */}
        <div className="lg:col-span-2 space-y-6">
          <AdminSection
            title="User Management"
            action={
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input 
                    value={search} 
                    onChange={(event) => setSearch(event.target.value)} 
                    placeholder="Search users..." 
                    className="w-64 rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm focus:border-[#157b86] focus:outline-none focus:ring-1 focus:ring-[#157b86]"
                  />
                </div>
                <select 
                  title='Filter users by role'
                  value={roleFilter} 
                  onChange={(event) => setRoleFilter(event.target.value as 'ALL' | 'STUDENT' | 'INSTRUCTOR' | 'ADMIN')} 
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#157b86] focus:outline-none"
                >
                  <option value="ALL">All Roles</option>
                  <option value="STUDENT">Students</option>
                  <option value="INSTRUCTOR">Instructors</option>
                  <option value="ADMIN">Admins</option>
                </select>
                <button title="Add new user" className="rounded-lg bg-[#1fb6b6] p-2 text-white hover:bg-[#157b86]">
                  <PlusCircle className="h-5 w-5" />
                </button>
              </div>
            }
          >
            <div className="space-y-3">
              {filteredUsers.slice(0, 6).map((user) => (
                <div key={user.id} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#157b86] hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1fb6b6] to-[#157b86] flex items-center justify-center text-sm font-bold text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{user.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-slate-500">{user.email}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                          user.role === 'INSTRUCTOR' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.status}
                    </span>
                    <button 
                      title='View user profile'
                      className="rounded-lg border border-slate-200 p-1.5 text-slate-600 transition-all hover:border-[#157b86] hover:text-[#157b86]"
                      onClick={() => { appendLog('Viewed user profile', user.name); toast.success('User profile opened.'); }}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button title='Edit user details' className="rounded-lg border border-slate-200 p-1.5 text-slate-600 transition-all hover:border-[#157b86] hover:text-[#157b86]">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              <Link 
                href="/admin/users" 
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-[#157b86] transition-colors hover:bg-slate-50"
              >
                View all users
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </AdminSection>

          {/* Platform Analytics */}
          <AdminSection title="Platform Analytics" action={<BarChart3 className="h-5 w-5 text-[#157b86]" />}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Monthly Active Users</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">2,847</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  +12.5% from last month
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-xs text-slate-500">Course Completions</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">1,234</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  +8.3% from last month
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">Weekly Activity</p>
                <select 
                  title='Select time range for analytics data'
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="text-xs border border-slate-200 rounded px-2 py-1"
                >
                  <option value="week">Last 7 days</option>
                  <option value="month">Last 30 days</option>
                  <option value="quarter">Last 90 days</option>
                </select>
              </div>
              <AdminMiniChart values={data.analytics.monthlyActiveUsers} label="Monthly Active Users" />
              <AdminMiniChart values={data.analytics.courseCompletions} label="Course Completions" />
              <AdminMiniChart values={data.analytics.moderationVolume} label="Moderation Volume" />
            </div>
          </AdminSection>
        </div>

        {/* Right Column - Quick Actions & Stats */}
        <div className="space-y-6">
          {/* System Health */}
          <AdminSection title="System Health" action={<ShieldCheck className="h-5 w-5 text-[#157b86]" />}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Server Status</span>
                <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Database</span>
                <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">API Response Time</span>
                <span className="text-sm font-semibold text-slate-900">124ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Active Users</span>
                <span className="text-sm font-semibold text-slate-900">342 online</span>
              </div>
              <div className="mt-4 rounded-lg bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Storage Used</p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-3/4 rounded-full bg-[#1fb6b6]" />
                </div>
                <p className="mt-1 text-right text-xs text-slate-600">75% of 100GB</p>
              </div>
            </div>
          </AdminSection>

          {/* Quick Actions */}
          <AdminSection title="Quick Actions">
            <div className="grid grid-cols-2 gap-3">
              <button className="rounded-xl border border-slate-200 bg-white p-4 text-center transition-all hover:border-[#157b86] hover:shadow-md">
                <Mail className="h-5 w-5 text-[#157b86] mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Send Broadcast</p>
              </button>
              <button className="rounded-xl border border-slate-200 bg-white p-4 text-center transition-all hover:border-[#157b86] hover:shadow-md">
                <Download className="h-5 w-5 text-[#157b86] mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Export Data</p>
              </button>
              <button className="rounded-xl border border-slate-200 bg-white p-4 text-center transition-all hover:border-[#157b86] hover:shadow-md">
                <Globe className="h-5 w-5 text-[#157b86] mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Site Settings</p>
              </button>
              <button className="rounded-xl border border-slate-200 bg-white p-4 text-center transition-all hover:border-[#157b86] hover:shadow-md">
                <Award className="h-5 w-5 text-[#157b86] mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">Certificates</p>
              </button>
            </div>
          </AdminSection>

          {/* Recent Reports */}
          <AdminSection title="Recent Reports" action={<Bell className="h-5 w-5 text-[#157b86]" />}>
            <div className="space-y-3">
              <div className="rounded-lg border-l-4 border-l-red-500 bg-white p-3">
                <p className="text-sm font-semibold text-slate-900">Multiple flags on course</p>
                <p className="text-xs text-slate-500">UX Design Masterclass • 2 hours ago</p>
              </div>
              <div className="rounded-lg border-l-4 border-l-yellow-500 bg-white p-3">
                <p className="text-sm font-semibold text-slate-900">New instructor pending</p>
                <p className="text-xs text-slate-500">Sarah Johnson • 5 hours ago</p>
              </div>
              <div className="rounded-lg border-l-4 border-l-blue-500 bg-white p-3">
                <p className="text-sm font-semibold text-slate-900">System backup completed</p>
                <p className="text-xs text-slate-500">12 hours ago</p>
              </div>
            </div>
          </AdminSection>
        </div>
      </div>

      {/* Moderation Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Instructor Approvals */}
        <AdminSection 
          title="Instructor Approvals" 
          action={
            <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-600">
              {instructorApprovals.filter((a) => a.status === 'pending').length} pending
            </span>
          }
        >
          <div className="space-y-3">
            {instructorApprovals.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#157b86]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1fb6b6] to-[#157b86] flex items-center justify-center text-sm font-bold text-white">
                      {entry.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{entry.name}</p>
                      <p className="text-xs text-slate-500">{entry.expertise}</p>
                      <p className="text-xs text-slate-400 mt-1">Requested: {entry.requestedAt}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    entry.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    entry.status === 'approved' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {entry.status}
                  </span>
                </div>
                {entry.status === 'pending' && (
                  <div className="mt-3 flex gap-2">
                    <button 
                      className="flex-1 rounded-lg bg-[#1fb6b6] px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-[#157b86]"
                      onClick={() => decideInstructor(entry.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button 
                      className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-all hover:bg-red-50"
                      onClick={() => decideInstructor(entry.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </AdminSection>

        {/* Course Moderation */}
        <AdminSection 
          title="Course Moderation" 
          action={
            <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
              {courses.filter((c) => c.status === 'flagged').length} flagged
            </span>
          }
        >
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#157b86]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-900">{course.title}</p>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        course.status === 'approved' ? 'bg-green-100 text-green-700' :
                        course.status === 'flagged' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{course.instructor}</p>
                    <p className="text-xs text-slate-400">Reports: {course.reports}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button 
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:border-[#157b86] hover:text-[#157b86]"
                    onClick={() => moderateCourse(course.id, 'approved')}
                  >
                    <CheckCircle className="inline h-3 w-3 mr-1" />
                    Approve
                  </button>
                  <button 
                    className="rounded-lg border border-amber-200 px-3 py-1.5 text-xs font-semibold text-amber-700 transition-all hover:bg-amber-50"
                    onClick={() => moderateCourse(course.id, 'flagged')}
                  >
                    <AlertTriangle className="inline h-3 w-3 mr-1" />
                    Flag
                  </button>
                  <button 
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-all hover:bg-red-50"
                    onClick={() => moderateCourse(course.id, 'rejected')}
                  >
                    <XCircle className="inline h-3 w-3 mr-1" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>

      {/* Community Moderation */}
      <div className="mt-6">
        <AdminSection title="Community Moderation">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {communityItems.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#157b86]">
                <div className="flex items-start justify-between mb-2">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase">
                    {item.type}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    item.status === 'approved' ? 'bg-green-100 text-green-700' :
                    item.status === 'flagged' ? 'bg-red-100 text-red-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900">{item.author}</p>
                <p className="mt-1 text-sm text-slate-600 line-clamp-2">{item.excerpt}</p>
                <p className="mt-2 text-xs text-slate-500">Reports: {item.reports}</p>
                <div className="mt-3 flex gap-2">
                  <button 
                    className="flex-1 rounded-lg border border-slate-200 px-2 py-1 text-xs hover:border-[#157b86]"
                    onClick={() => moderateCommunity(item.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button 
                    className="flex-1 rounded-lg border border-amber-200 px-2 py-1 text-xs text-amber-700 hover:bg-amber-50"
                    onClick={() => moderateCommunity(item.id, 'flagged')}
                  >
                    Flag
                  </button>
                  <button 
                    className="flex-1 rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                    onClick={() => moderateCommunity(item.id, 'rejected')}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>

      {/* Configuration Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Site Configuration */}
        <AdminSection title="Site Configuration" action={<Settings className="h-5 w-5 text-[#157b86]" />}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Support Email</label>
              <input 
                title='Email address for user support inquiries'
                value={supportEmail} 
                onChange={(event) => setSupportEmail(event.target.value)} 
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-[#157b86] focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Maintenance Mode</span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" checked={data.siteConfiguration.maintenanceMode} readOnly />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#1fb6b6] peer-checked:after:translate-x-full"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Allow Registration</span>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" checked={data.siteConfiguration.allowRegistration} readOnly />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#1fb6b6] peer-checked:after:translate-x-full"></div>
              </label>
            </div>
            <button 
              className="w-full rounded-lg bg-gradient-to-r from-[#1fb6b6] to-[#157b86] px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
              onClick={() => { appendLog('Updated site configuration', 'Support Email'); toast.success('Site configuration saved.'); }}
            >
              Save Configuration
            </button>
          </div>
        </AdminSection>

        {/* Certificate Template */}
        <AdminSection title="Certificate Settings">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Certificate Title</label>
              <input 
                value={certTitle} 
                onChange={(event) => setCertTitle(event.target.value)} 
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-[#157b86] focus:outline-none"
                placeholder="Certificate Title"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500">Signatory</label>
                <p className="text-sm font-semibold text-slate-900">{data.certificateTemplate.signatory}</p>
              </div>
              <div>
                <label className="text-xs text-slate-500">Accent Color</label>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: data.certificateTemplate.accentColor }} />
                  <p className="text-sm text-slate-900">{data.certificateTemplate.accentColor}</p>
                </div>
              </div>
            </div>
            <button 
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-[#157b86] hover:text-[#157b86]"
              onClick={() => { appendLog('Updated certificate template', certTitle); toast.success('Certificate template updated.'); }}
            >
              Save Template
            </button>
          </div>
        </AdminSection>

        {/* Points Rules */}
        <AdminSection title="Points Configuration">
          <div className="space-y-3">
            {pointsRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                <p className="text-sm font-semibold text-slate-900">{rule.event}</p>
                <div className="flex items-center gap-2">
                  <input
                    title='Points awarded for this event'
                    type="number"
                    value={rule.points}
                    onChange={(event) => setPointsRules((previous) => previous.map((entry) => entry.id === rule.id ? { ...entry, points: Number(event.target.value) } : entry))}
                    className="w-20 rounded-md border border-slate-200 px-2 py-1 text-sm focus:border-[#157b86] focus:outline-none"
                  />
                  <span className="text-xs text-slate-500">pts</span>
                </div>
              </div>
            ))}
            <button 
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-[#157b86] hover:text-[#157b86]"
              onClick={() => { appendLog('Updated points rules', 'Gamification'); toast.success('Points rules saved.'); }}
            >
              Save Points Rules
            </button>
          </div>
        </AdminSection>
      </div>

      {/* Email Templates */}
      <div className="mt-6">
        <AdminSection title="Email Templates">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {emailTemplates.map((template) => (
              <div key={template.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-semibold text-slate-900">{template.name}</p>
                <input
                  value={template.subject}
                  onChange={(event) => setEmailTemplates((previous) => previous.map((entry) => entry.id === template.id ? { ...entry, subject: event.target.value } : entry))}
                  className="mt-2 w-full rounded-md border border-slate-200 px-2 py-1 text-sm focus:border-[#157b86] focus:outline-none"
                  placeholder="Email subject"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              className="rounded-lg bg-[#1fb6b6] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#157b86]"
              onClick={() => { appendLog('Updated email templates', 'Platform Templates'); toast.success('Email templates saved.'); }}
            >
              Save All Templates
            </button>
          </div>
        </AdminSection>
      </div>

      {/* Audit Logs */}
      <div className="mt-6">
        <AdminSection title="Audit Logs" action={<Download className="h-5 w-5 text-[#157b86]" />}>
          <div className="max-h-72 space-y-2 overflow-auto pr-1">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{log.action}</p>
                  <p className="text-xs text-slate-500">
                    <span className="font-medium text-[#157b86]">{log.actor}</span> • {log.target} • {log.timestamp}
                  </p>
                </div>
                <span className="text-xs text-slate-400">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {log.timestamp.split(' ')[1]}
                </span>
              </div>
            ))}
          </div>
        </AdminSection>
      </div>
    </RoleShell>
  );
}