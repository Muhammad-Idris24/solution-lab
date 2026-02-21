'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, Camera, Mail, School, User as UserIcon, 
  BookOpen, Calendar, Award, MapPin, Globe, Github,
  Twitter, Linkedin, Save, X, Edit2, GraduationCap,
  Users, Star, Clock, ChevronRight, Briefcase,
  Phone, MessageSquare, Download,
  Settings
} from 'lucide-react';
import { RoleShell } from '@/components/layout/role-shell';
import { ProgressBar } from '@/components/student/progress-bar';

// Mock instructor data
const INSTRUCTOR_DATA = {
  profile: {
    fullName: 'Engr. Alamin Musa Magaga',
    email: 'alamin.maga@solutionlab.com',
    bio: 'Senior UX Designer and Educator with over 12 years of industry experience. Passionate about bridging the gap between design and technology. Previously led design teams at Google and Microsoft.',
    title: 'Lead Instructor - Design & Development',
    department: 'School of Design & Technology',
    location: 'San Francisco, CA',
    website: 'alaminmaga.design',
    github: 'alaminmaga',
    twitter: '@alaminmaga',
    linkedin: 'alaminmaga',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2022',
    avatar: '/avatar-user.svg',
    expertise: ['UX Design', 'Product Strategy', 'Design Systems', 'User Research'],
    education: [
      { degree: 'M.Des in Human-Computer Interaction', school: 'Stanford University', year: '2012' },
      { degree: 'B.Sc in Computer Science', school: 'MIT', year: '2010' }
    ],
    certifications: [
      { name: 'Certified UX Professional', issuer: 'Nielsen Norman Group', year: '2018' },
      { name: 'Advanced Design Thinking', issuer: 'IDEO U', year: '2019' }
    ]
  },
  stats: {
    totalCourses: 8,
    totalStudents: 1247,
    totalReviews: 342,
    averageRating: 4.8,
    completedCourses: 12,
    responseRate: 98,
    responseTime: '< 2 hours'
  },
  courses: [
    { id: 1, title: 'UX/UI Design Masterclass', students: 450, rating: 4.9, image: '/courses/ux.jpg' },
    { id: 2, title: 'Product Design Fundamentals', students: 320, rating: 4.8, image: '/courses/product.jpg' },
    { id: 3, title: 'Design Systems in Practice', students: 280, rating: 4.9, image: '/courses/design-systems.jpg' },
    { id: 4, title: 'User Research Methods', students: 197, rating: 4.7, image: '/courses/research.jpg' }
  ],
  achievements: [
    { id: 1, icon: '🏆', title: 'Top Instructor 2024', description: 'Ranked #1 in Design category' },
    { id: 2, icon: '⭐', title: 'Excellence in Teaching', description: 'Awarded for outstanding student feedback' },
    { id: 3, icon: '📚', title: 'Course of the Month', description: 'UX/UI Design Masterclass - March 2024' }
  ],
  recentActivity: [
    { id: 1, type: 'course_updated', text: 'Updated "UX/UI Design Masterclass" with new module', timestamp: '2 hours ago' },
    { id: 2, type: 'assignment_graded', text: 'Graded 15 assignments in "Product Design"', timestamp: '5 hours ago' },
    { id: 3, type: 'qa_answered', text: 'Answered 8 questions in Q&A forum', timestamp: 'yesterday' },
    { id: 4, type: 'announcement', text: 'Posted new announcement about project deadline', timestamp: '2 days ago' }
  ]
};

export default function InstructorProfilePage() {
  const router = useRouter();
  const data = INSTRUCTOR_DATA;
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(data.profile);
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
    setProfile(data.profile);
    setIsEditing(false);
  };

  return (
    <RoleShell title="Instructor Profile">
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
                 title="Change profile picture"
                  onClick={handleAvatarChange}
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

            {/* Rating Badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-white">{data.stats.averageRating}</span>
              <span className="text-xs text-slate-200">({data.stats.totalReviews} reviews)</span>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="flex gap-3">
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm text-center min-w-[80px]">
              <p className="text-2xl font-bold text-white">{data.stats.totalCourses}</p>
              <p className="text-xs text-slate-300">Courses</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm text-center min-w-[80px]">
              <p className="text-2xl font-bold text-white">{data.stats.totalStudents}</p>
              <p className="text-xs text-slate-300">Students</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm text-center min-w-[80px]">
              <p className="text-2xl font-bold text-white">{data.stats.responseRate}%</p>
              <p className="text-xs text-slate-300">Response</p>
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
              <p className="mt-3 text-slate-600 leading-relaxed">{profile.bio}</p>
            )}
          </div>

          {/* Areas of Expertise */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Areas of Expertise</h2>
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
                      <GraduationCap className="h-5 w-5 text-[#157b86] flex-shrink-0" />
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
                      <Award className="h-5 w-5 text-[#157b86] flex-shrink-0" />
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
                    title='phone number'
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
                    title='Personal website URL'
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
                    title='Location (City, Country)'
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

        {/* Right Column - Stats and Achievements */}
        <div className="space-y-6">
          {/* Teaching Stats */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Teaching Stats</h2>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Student Satisfaction</span>
                  <span className="font-semibold text-slate-900">{data.stats.averageRating}/5.0</span>
                </div>
                <ProgressBar value={96} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Response Rate</span>
                  <span className="font-semibold text-slate-900">{data.stats.responseRate}%</span>
                </div>
                <ProgressBar value={data.stats.responseRate} />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Course Completion</span>
                  <span className="font-semibold text-slate-900">87%</span>
                </div>
                <ProgressBar value={87} />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <p className="text-2xl font-bold text-[#157b86]}">{data.stats.totalStudents}</p>
                  <p className="text-xs text-slate-600">Total Students</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 text-center">
                  <p className="text-2xl font-bold text-[#157b86]}">{data.stats.responseTime}</p>
                  <p className="text-xs text-slate-600">Response Time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Achievements</h2>
            <div className="mt-4 space-y-4">
              {data.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{achievement.title}</p>
                    <p className="text-xs text-slate-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Courses */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Featured Courses</h2>
              <Link href="/instructor/courses" className="text-sm text-[#157b86] hover:underline">View all</Link>
            </div>
            
            <div className="space-y-4">
              {data.courses.slice(0, 3).map((course) => (
                <div key={course.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#1fb6b6] to-[#157b86] flex items-center justify-center text-white font-bold">
                    {course.title.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{course.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500">{course.students} students</span>
                      <span className="flex items-center gap-1 text-xs text-yellow-500">
                        <Star className="h-3 w-3 fill-current" />
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
            <div className="mt-4 space-y-3">
              {data.recentActivity.map((activity) => (
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
            href="/instructor/settings"
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