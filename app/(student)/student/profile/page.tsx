'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, Camera, Mail, School, User as UserIcon, 
  BookOpen, Calendar, Award, MapPin, Globe, Github,
  Twitter, Linkedin, Save, X, Edit2,
  Settings,
  ChevronRight
} from 'lucide-react';
import { RoleShell } from '@/components/layout/role-shell';
import { STUDENT_DASHBOARD_DATA } from '@/data/student-dashboard';
import { ProgressBar } from '@/components/student/progress-bar';

export default function StudentProfilePage() {
  const router = useRouter();
  const data = STUDENT_DASHBOARD_DATA;
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: data.profile.fullName,
    email: data.profile.email,
    bio: data.profile.bio || 'Passionate learner exploring the world of technology and design. Love building projects that make a difference.',
    school: data.profile.school || 'University of Technology',
    location: 'Kaduna City, KD',
    website: 'solutionlab.dev',
    github: 'solutionlab',
    twitter: '@solutionlab',
    linkedin: 'solutionlab',
    joinDate: 'January 2024',
    avatar: '/avatar-user.svg'
  });

  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);

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
    // Reset to original values
    setProfile({
      fullName: data.profile.fullName,
      email: data.profile.email,
      bio: data.profile.bio || 'Passionate learner exploring the world of technology and design. Love building projects that make a difference.',
      school: data.profile.school || 'University of Technology',
      location: 'Kaduna City, KD',
      website: 'solutionlab.dev',
      github: 'solutionlab',
      twitter: '@solutionlab',
      linkedin: 'solutionlab',
      joinDate: 'January 2024',
      avatar: '/avatar-user.svg'
    
    });
    setIsEditing(false);
  };

  return (
    <RoleShell title="Student Profile">
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
                  onClick={handleAvatarChange}
                  title="avatar"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 transition-all"
                >
                  <Camera className="h-8 w-8 text-white" />
                </button>
              )}
            </div>
            
            {/* Online Status */}
            <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-2 border-white bg-green-500"></span>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white md:text-4xl">{profile.fullName}</h1>
            <p className="mt-2 text-lg text-slate-200">Student • {profile.school}</p>
            
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
          </div>

          {/* Stats Summary */}
          <div className="flex gap-3">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold text-white">{data.enrolledCourses.length}</p>
              <p className="text-xs text-slate-300">Courses</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold text-white">{data.completedCourses.length}</p>
              <p className="text-xs text-slate-300">Completed</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm text-center">
              <p className="text-2xl font-bold text-white">{data.streak.currentDays}</p>
              <p className="text-xs text-slate-300">Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content Grid */}
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
              <p className="mt-3 text-slate-600">{profile.bio}</p>
            )}
          </div>

          {/* Personal Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>
            
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    title="Full Name"
                    value={profile.fullName}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-[#157b86] focus:outline-none"
                  />
                ) : (
                  <p className="mt-1 font-medium text-slate-900">{profile.fullName}</p>
                )}
              </div>
              
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    title="Email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-[#157b86] focus:outline-none"
                  />
                ) : (
                  <p className="mt-1 font-medium text-slate-900">{profile.email}</p>
                )}
              </div>
              
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-slate-500">School</label>
                {isEditing ? (
                  <input
                    type="text"
                    title="School"
                    value={profile.school}
                    onChange={(e) => setProfile({...profile, school: e.target.value})}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-[#157b86] focus:outline-none"
                  />
                ) : (
                  <p className="mt-1 font-medium text-slate-900">{profile.school}</p>
                )}
              </div>
              
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    title="Location"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-[#157b86] focus:outline-none"
                  />
                ) : (
                  <p className="mt-1 font-medium text-slate-900">{profile.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Social Links</h2>
            
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-[#157b86]" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.website}
                    onChange={(e) => setProfile({...profile, website: e.target.value})}
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 focus:border-[#157b86] focus:outline-none"
                    placeholder="Website"
                  />
                ) : (
                  <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-[#157b86] hover:underline">
                    {profile.website}
                  </a>
                )}
              </div>
              
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

        {/* Right Column - Stats and Activity */}
        <div className="space-y-6">
          {/* Learning Stats */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Learning Stats</h2>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Courses Completed</span>
                  <span className="font-semibold text-slate-900">{data.completedCourses.length}/{data.enrolledCourses.length}</span>
                </div>
                <ProgressBar value={(data.completedCourses.length / data.enrolledCourses.length) * 100} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total Learning Hours</span>
                  <span className="font-semibold text-slate-900">127h</span>
                </div>
                <ProgressBar value={65} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Achievements</span>
                  <span className="font-semibold text-slate-900">{data.achievements.length}/20</span>
                </div>
                <ProgressBar value={35} />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
            <div className="mt-4 space-y-3">
              {data.activityFeed.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div className="h-2 w-2 mt-2 rounded-full bg-[#1fb6b6]" />
                  <div>
                    <p className="text-sm text-slate-800">{activity.text}</p>
                    <p className="text-xs text-slate-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Settings Link */}
          <Link
            href="/student/settings"
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-[#157b86] hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-[#157b86]" />
              <div>
                <p className="font-semibold text-slate-900">Account Settings</p>
                <p className="text-xs text-slate-500">Password, notifications, privacy</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </Link>
        </div>
      </div>
    </RoleShell>
  );
}