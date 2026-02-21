'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, Camera, Mail, Shield, User as UserIcon, 
  Calendar, Award, MapPin, Globe, Github,Twitter, Linkedin, 
  Save, X, Edit2, Phone, Bell, Lock, ShieldCheck,
  Users, Activity, ChevronRight, Download, Server, Database
} from 'lucide-react';
import { RoleShell } from '@/components/layout/role-shell';

// Mock admin data
const ADMIN_DATA = {
  profile: {
    fullName: 'Engr. Muhammad Abubakar',
    email: 'muhammad.abubakr@solutionlab.com',
    bio: 'Platform Administrator with over 10 years of experience in educational technology and system architecture. Passionate about building scalable learning platforms and fostering digital education innovation.',
    title: 'Senior Platform Administrator',
    department: 'Engineering & Operations',
    location: 'Kaduna City, KD',
    website: 'muhammad.dev',
    github: 'muhammadabubakar',
    twitter: '@muhammadabubakar',
    linkedin: 'muhammad-abubakar',
    phone: '+1 (555) 987-6543',
    joinDate: 'March 2020',
    avatar: '/avatar-user.svg',
    role: 'Super Admin',
    permissions: [
      'User Management',
      'Content Moderation',
      'System Configuration',
      'Analytics Access',
      'Security Settings',
      'Backup Management'
    ],
    expertise: ['System Architecture', 'Cloud Infrastructure', 'Security', 'DevOps', 'Team Leadership'],
    education: [
      { degree: 'Ph.D. in Computer Science', school: 'Stanford University', year: '2018' },
      { degree: 'M.S. in Information Systems', school: 'UC Berkeley', year: '2014' }
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023' },
      { name: 'Certified Information Systems Security Professional', issuer: 'ISC²', year: '2022' },
      { name: 'Google Cloud Professional', issuer: 'Google', year: '2021' }
    ]
  },
  stats: {
    totalUsers: 12547,
    totalCourses: 342,
    totalInstructors: 89,
    systemUptime: 99.98,
    activeSessions: 1243,
    pendingReviews: 23,
    resolvedTickets: 1245,
    avgResponseTime: '2.4 hours'
  },
  systemHealth: [
    { service: 'Web Server', status: 'operational', latency: '45ms', uptime: 99.99 },
    { service: 'Database', status: 'operational', latency: '12ms', uptime: 99.99 },
    { service: 'Storage', status: 'operational', latency: '89ms', uptime: 99.95 },
    { service: 'API Gateway', status: 'operational', latency: '23ms', uptime: 99.98 },
    { service: 'Email Service', status: 'degraded', latency: '234ms', uptime: 98.5 }
  ],
  recentActions: [
    { id: 1, action: 'Approved instructor application', target: 'Dr. James Wilson', timestamp: '15 minutes ago' },
    { id: 2, action: 'Updated system configuration', target: 'Email Templates', timestamp: '1 hour ago' },
    { id: 3, action: 'Resolved security alert', target: 'Failed login attempts', timestamp: '3 hours ago' },
    { id: 4, action: 'Created new backup', target: 'Database snapshot', timestamp: '5 hours ago' },
    { id: 5, action: 'Modified user permissions', target: 'john.doe@example.com', timestamp: 'yesterday' }
  ],
  securityLogs: [
    { id: 1, event: 'Successful login', ip: '192.168.1.100', location: 'San Francisco, CA', timestamp: '10:30 AM' },
    { id: 2, event: 'Password change', ip: '192.168.1.100', location: 'San Francisco, CA', timestamp: '9:15 AM' },
    { id: 3, event: '2FA enabled', ip: '192.168.1.100', location: 'San Francisco, CA', timestamp: 'Yesterday' },
    { id: 4, event: 'New device login', ip: '10.0.0.45', location: 'New York, NY', timestamp: '2 days ago' }
  ]
};

export default function AdminProfilePage() {
  const router = useRouter();
  const data = ADMIN_DATA;
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(data.profile);
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const getUserInitials = () => {
    return profile.fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAvatarChange = () => {
    toast.success('Avatar upload functionality would be implemented here');
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfile(data.profile);
    setIsEditing(false);
  };

  return (
    <RoleShell title="Admin Profile">
      {/* Back Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#157b86]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 rounded-lg bg-[#1fb6b6] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#157b86]"
          >
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#1fb6b6] to-[#157b86] px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a5f64] to-[#2a858b] p-8">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#7fe1d6]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        
        <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-start">
          {/* Avatar with Upload Option */}
          <div 
            className="relative"
            onMouseEnter={() => setIsHoveringAvatar(true)}
            onMouseLeave={() => setIsHoveringAvatar(false)}
          >
            <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white/30 shadow-xl md:h-32 md:w-32">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1fb6b6] to-[#157b86] text-3xl font-bold text-white md:text-4xl">
                  {getUserInitials()}
                </div>
              )}
              
              {isEditing && isHoveringAvatar && (
                <button
                  title="Change Avatar"
                  onClick={handleAvatarChange}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 transition-all"
                >
                  <Camera className="h-8 w-8 text-white" />
                </button>
              )}
            </div>
            
            {/* Admin Badge */}
            <div className="absolute -bottom-2 -right-2 rounded-full bg-yellow-400 p-1.5 shadow-lg">
              <Shield className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <h1 className="text-3xl font-bold text-white md:text-4xl">{profile.fullName}</h1>
              <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-semibold text-yellow-300 backdrop-blur-sm">
                {profile.role}
              </span>
            </div>
            <p className="mt-2 text-lg text-slate-200">{profile.title}</p>
            <p className="text-md text-slate-300">{profile.department}</p>
            
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300 md:justify-start">
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined {profile.joinDate}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </span>
            </div>

            {/* System Status Badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <Server className="h-4 w-4 text-[#7fe1d6]" />
              <span className="text-sm font-semibold text-white">System Uptime: {data.stats.systemUptime}%</span>
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="flex gap-3">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm text-center min-w-[80px]">
              <p className="text-2xl font-bold text-white">{data.stats.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-slate-300">Users</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm text-center min-w-[80px]">
              <p className="text-2xl font-bold text-white">{data.stats.totalCourses}</p>
              <p className="text-xs text-slate-300">Courses</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm text-center min-w-[80px]">
              <p className="text-2xl font-bold text-white">{data.stats.pendingReviews}</p>
              <p className="text-xs text-slate-300">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="mb-6 border-b border-slate-200">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === 'profile'
                ? 'text-[#157b86] border-b-2 border-[#157b86]'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <UserIcon className="inline h-4 w-4 mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === 'security'
                ? 'text-[#157b86] border-b-2 border-[#157b86]'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Shield className="inline h-4 w-4 mr-2" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === 'activity'
                ? 'text-[#157b86] border-b-2 border-[#157b86]'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Activity className="inline h-4 w-4 mr-2" />
            Activity
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Bio and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">About Me</h2>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="mt-3 h-32 w-full rounded-lg border border-slate-200 p-3 focus:border-[#157b86] focus:outline-none focus:ring-1 focus:ring-[#157b86]"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="mt-3 text-slate-600 leading-relaxed">{profile.bio}</p>
              )}
            </div>

            {/* Permissions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Admin Permissions</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {profile.permissions.map((permission) => (
                  <div key={permission} className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
                    <ShieldCheck className="h-4 w-4 text-[#157b86]" />
                    <span className="text-sm text-slate-700">{permission}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas of Expertise */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Technical Expertise</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.expertise.map((skill) => (
                  <span 
                    key={skill}
                    className="rounded-full bg-[#e3f8f5] px-4 py-2 text-sm font-medium text-[#157b86]"
                  >
                    {skill}
                  </span>
                ))}
                {isEditing && (
                  <button className="rounded-full border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-500 hover:border-[#157b86] hover:text-[#157b86]">
                    + Add Skill
                  </button>
                )}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Education & Certifications</h2>
              
              <div className="mt-6 space-y-6">
                {/* Education */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Education</h3>
                  <div className="mt-3 space-y-4">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[#e3f8f5] flex items-center justify-center">
                          <Award className="h-4 w-4 text-[#157b86]" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{edu.degree}</p>
                          <p className="text-sm text-slate-600">{edu.school} • {edu.year}</p>
                        </div>
                      </div>
                    ))}
                    {isEditing && (
                      <button className="text-sm text-[#157b86] hover:underline">+ Add Education</button>
                    )}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Certifications</h3>
                  <div className="mt-3 space-y-4">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="h-8 w-8 rounded-lg bg-[#e3f8f5] flex items-center justify-center">
                          <Shield className="h-4 w-4 text-[#157b86]" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{cert.name}</p>
                          <p className="text-sm text-slate-600">{cert.issuer} • {cert.year}</p>
                        </div>
                      </div>
                    ))}
                    {isEditing && (
                      <button className="text-sm text-[#157b86] hover:underline">+ Add Certification</button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Contact Information</h2>
              
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#157b86]" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="flex-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-[#157b86] focus:outline-none"
                    />
                  ) : (
                    <span className="text-slate-600">{profile.phone}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#157b86]" />
                  <span className="text-slate-600">{profile.email}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-[#157b86]" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.website}
                      onChange={(e) => setProfile({...profile, website: e.target.value})}
                      className="flex-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-[#157b86] focus:outline-none"
                    />
                  ) : (
                    <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-[#157b86] hover:underline">
                      {profile.website}
                    </a>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#157b86]" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      className="flex-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-[#157b86] focus:outline-none"
                    />
                  ) : (
                    <span className="text-slate-600">{profile.location}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Social Links</h2>
              
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-[#157b86]" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.github}
                      onChange={(e) => setProfile({...profile, github: e.target.value})}
                      className="flex-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-[#157b86] focus:outline-none"
                      placeholder="GitHub username"
                    />
                  ) : (
                    <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-[#157b86] hover:underline">
                      @{profile.github}
                    </a>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5 text-[#157b86]" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.twitter}
                      onChange={(e) => setProfile({...profile, twitter: e.target.value})}
                      className="flex-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-[#157b86] focus:outline-none"
                      placeholder="Twitter handle"
                    />
                  ) : (
                    <a href={`https://twitter.com/${profile.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-[#157b86] hover:underline">
                      {profile.twitter}
                    </a>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-[#157b86]" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.linkedin}
                      onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                      className="flex-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-[#157b86] focus:outline-none"
                      placeholder="LinkedIn username"
                    />
                  ) : (
                    <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-[#157b86] hover:underline">
                      {profile.linkedin}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats and System Info */}
          <div className="space-y-6">
            {/* System Health */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">System Health</h2>
              <div className="mt-4 space-y-4">
                {data.systemHealth.map((service) => (
                  <div key={service.service} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${
                        service.status === 'operational' ? 'bg-green-500' :
                        service.status === 'degraded' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                      <span className="text-sm text-slate-600">{service.service}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">{service.latency}</span>
                      <span className="text-xs font-medium text-slate-700">{service.uptime}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Overall Uptime</span>
                  <span className="font-bold text-green-600">{data.stats.systemUptime}%</span>
                </div>
              </div>
            </div>

            {/* Admin Stats */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Admin Overview</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-2xl font-bold text-[#157b86]">{data.stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-slate-600">Total Users</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-2xl font-bold text-[#157b86]">{data.stats.activeSessions}</p>
                  <p className="text-xs text-slate-600">Active Sessions</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-2xl font-bold text-[#157b86]">{data.stats.pendingReviews}</p>
                  <p className="text-xs text-slate-600">Pending Reviews</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-2xl font-bold text-[#157b86]">{data.stats.resolvedTickets}</p>
                  <p className="text-xs text-slate-600">Resolved Tickets</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
              <div className="mt-4 space-y-2">
                <button className="w-full flex items-center justify-between rounded-lg border border-slate-200 p-3 text-left transition-all hover:border-[#157b86]">
                  <span className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-[#157b86]" />
                    <span className="text-sm font-medium text-slate-700">Backup System</span>
                  </span>
                  <Download className="h-4 w-4 text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between rounded-lg border border-slate-200 p-3 text-left transition-all hover:border-[#157b86]">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#157b86]" />
                    <span className="text-sm font-medium text-slate-700">Review Users</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between rounded-lg border border-slate-200 p-3 text-left transition-all hover:border-[#157b86]">
                  <span className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-[#157b86]" />
                    <span className="text-sm font-medium text-slate-700">System Alerts</span>
                  </span>
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">3</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Security Logs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Recent Security Events</h2>
            <div className="mt-4 space-y-4">
              {data.securityLogs.map((log) => (
                <div key={log.id} className="flex items-start justify-between border-b border-slate-100 pb-3 last:border-0">
                  <div className="flex items-start gap-3">
                    <Lock className="h-4 w-4 text-[#157b86] mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{log.event}</p>
                      <p className="text-xs text-slate-500">{log.ip} • {log.location}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Security Settings</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Two-Factor Authentication</p>
                  <p className="text-xs text-slate-500">Add an extra layer of security</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" defaultChecked />
                  <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#1fb6b6] peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Login Notifications</p>
                  <p className="text-xs text-slate-500">Get alerts for new device logins</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" defaultChecked />
                  <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#1fb6b6] peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Session Timeout</p>
                  <p className="text-xs text-slate-500">Auto-logout after 30 minutes</p>
                </div>
                <select title='Session Timeout Settings' className="rounded-lg border border-slate-200 px-3 py-1 text-sm">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                </select>
              </div>

              <button className="mt-4 w-full rounded-lg bg-[#1fb6b6] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#157b86]">
                Change Password
              </button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Active Sessions</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Current Session</p>
                    <p className="text-xs text-slate-500">Chrome on macOS • San Francisco, CA</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">Active now</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-slate-300" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">iPhone 14 Pro</p>
                    <p className="text-xs text-slate-500">Safari on iOS • New York, NY</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Actions */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Recent Admin Actions</h2>
            <div className="mt-4 space-y-3">
              {data.recentActions.map((action) => (
                <div key={action.id} className="flex items-start justify-between border-b border-slate-100 pb-3 last:border-0">
                  <div className="flex items-start gap-3">
                    <Activity className="h-4 w-4 text-[#157b86] mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{action.action}</p>
                      <p className="text-xs text-slate-500">Target: {action.target}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{action.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </RoleShell>
  );
}