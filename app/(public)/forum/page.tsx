'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, Users, Compass, TrendingUp, Bookmark, 
  MessageCircle, Share2, MoreHorizontal, 
  Search, Plus, Award, Flame,
  ThumbsUp, MessageSquare, Eye, Bell
} from 'lucide-react';

export default function ForumPage() {
  const [activeTab, setActiveTab] = useState('general');

  // Mock data for communities
  const userCommunities = [
    { name: 'Machine Learning', members: '2M', icon: '🤖', color: 'from-blue-500 to-purple-500' },
    { name: 'Programming', members: '2M', icon: '💻', color: 'from-green-500 to-teal-500' },
    { name: 'Webdev', members: '2M', icon: '🌐', color: 'from-orange-500 to-red-500' },
    { name: 'ReactJS', members: '2M', icon: '⚛️', color: 'from-cyan-500 to-blue-500' },
  ];

  // Mock data for trending topics
  const trendingTopics = [
    { topic: 'Technology', posts: '90K', change: '+8.5%', up: true },
    { topic: 'Gaming', posts: '9,989', change: '+6.2%', up: true },
    { topic: 'Memes', posts: '7,968', change: '+5.2%', up: true },
    { topic: 'Politics', posts: '1,968', change: '+4.4%', up: true },
  ];

  // Mock data for suggested communities
  const suggestedCommunities = [
    { 
      name: 'AI Automation', 
      description: 'AI and ML discussions', 
      members: '2.8M', 
      icon: '🤖',
      color: 'from-[#1fb6b6] to-[#157b86]'
    },
    { 
      name: 'Startups', 
      description: 'Entrepreneur Peeps', 
      members: '12M', 
      icon: '🚀',
      color: 'from-orange-500 to-pink-500'
    },
    { 
      name: 'Cyber Security', 
      description: 'InfoSec professionals', 
      members: '890K', 
      icon: '🔒',
      color: 'from-red-500 to-purple-500'
    },
    { 
      name: 'Linux Community', 
      description: 'Linux Specialist', 
      members: '650K', 
      icon: '🐧',
      color: 'from-yellow-500 to-orange-500'
    },
  ];

  // Mock data for posts
  const posts = [
    {
      id: 1,
      author: {
        name: 'Muhammad Idris',
        username: '@idris24',
        avatar: '/idris.jpeg',
        verified: true
      },
      community: 'Technology',
      timeAgo: '4h',
      title: 'Is Rust the future of system programming?',
      content: "I've been diving into Rust for the past few weeks, and honestly, it feels like a game changer compared to C++. The memory safety + performance combo is impressive. Curious – do you think Rust will replace C++ in large-scale projects, or is it just hype?",
      stats: {
        upvotes: '3.6K',
        downvotes: '210',
        comments: '234',
        shares: '89'
      },
      tags: ['#Technology', '#C++', '#Daily', '#Productivity'],
      liked: false
    },
    {
      id: 2,
      author: {
        name: 'Yayandy',
        username: '@hack_yayandy',
        avatar: '/Bayero.jpg',
        verified: false
      },
      community: 'Technology',
      timeAgo: '4h',
      title: 'How do you disconnect from screens?',
      content: "With remote work and constant notifications, I've realized I spend 10+ hours daily in front of a screen 😅. What's your favorite way to recharge offline? Hiking, journaling, or something else?",
      stats: {
        upvotes: '1.2K',
        downvotes: '510',
        comments: '156',
        shares: '45'
      },
      tags: ['#Wellbeing', '#Tech', '#Daily', '#Productivity'],
      liked: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-8">
            <Link href="/forum" className="text-xl font-bold text-[#157b86]">
              Convo
            </Link>
            <div className="hidden items-center gap-1 md:flex">
              <button 
                onClick={() => setActiveTab('general')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'general' 
                    ? 'bg-[#157b86] text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                General
              </button>
              <button title="Communities" className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
                Communities
              </button>
              <button title="Explore" className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
                Explore
              </button>
              <button title="Trending" className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
                Trending
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search conversations..."
                className="w-64 rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:border-[#157b86] focus:outline-none focus:ring-1 focus:ring-[#157b86]"
              />
            </div>
            <button title="Create Post" className="rounded-full bg-[#1fb6b6] p-2 text-white transition-all hover:bg-[#157b86]">
              <Plus className="h-5 w-5" />
            </button>
            <button title="Notifications" className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Left Sidebar - Communities */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Navigation Menu */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  General
                </h3>
                <nav className="space-y-1">
                  <Link href="#" className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                    <Home className="h-4 w-4 text-[#157b86]" />
                    Home
                  </Link>
                  <Link href="#" className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                    <Users className="h-4 w-4 text-[#157b86]" />
                    Communities
                  </Link>
                  <Link href="#" className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                    <Compass className="h-4 w-4 text-[#157b86]" />
                    Explore
                  </Link>
                  <Link href="#" className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                    <TrendingUp className="h-4 w-4 text-[#157b86]" />
                    Trending
                  </Link>
                  <Link href="#" className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                    <Bookmark className="h-4 w-4 text-[#157b86]" />
                    Saved
                  </Link>
                </nav>

                <h3 className="mb-3 mt-6 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Your Community
                </h3>
                <div className="space-y-2">
                  {userCommunities.map((community) => (
                    <Link 
                      key={community.name}
                      href="#"
                      className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{community.icon}</span>
                        <span className="text-sm font-medium text-slate-700">{community.name}</span>
                      </div>
                      <span className="text-xs text-slate-500">{community.members}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">Trending Topics</h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <Link 
                      key={topic.topic}
                      href="#"
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-500">0{index + 1}.</span>
                        <span className="text-sm font-medium text-slate-900">{topic.topic}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500">{topic.posts} posts</span>
                        <span className={`ml-2 text-xs ${topic.up ? 'text-green-600' : 'text-red-600'}`}>
                          {topic.change}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Suggested Communities */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">Suggested Community</h3>
                <div className="space-y-4">
                  {suggestedCommunities.map((community) => (
                    <div key={community.name} className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${community.color} flex items-center justify-center text-white`}>
                          <span className="text-lg">{community.icon}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{community.name}</p>
                          <p className="text-xs text-slate-500">{community.description}</p>
                          <p className="mt-1 text-xs text-slate-400">{community.members} members</p>
                        </div>
                      </div>
                      <button className="rounded-lg border border-[#157b86] px-3 py-1 text-xs font-medium text-[#157b86] transition-all hover:bg-[#157b86] hover:text-white">
                        Join
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed - Center Column */}
          <div className="lg:col-span-2">
            {/* Create Post */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-[#1fb6b6] to-[#157b86]">
                  <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                    U
                  </div>
                </div>
                <input 
                  type="text" 
                  placeholder="Start a discussion..."
                  className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm focus:border-[#157b86] focus:outline-none"
                />
                <button className="rounded-lg bg-[#1fb6b6] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#157b86]">
                  Post
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <article key={post.id} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md">
                  {/* Author Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-[#1fb6b6] to-[#157b86]">
                        <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900">{post.author.name}</p>
                          {post.author.verified && (
                            <Award className="h-4 w-4 fill-[#1fb6b6] text-white" />
                          )}
                          <span className="text-xs text-slate-500">{post.author.username}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{post.community}</span>
                          <span>·</span>
                          <span>{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    <button title="More options" className="rounded-lg p-2 hover:bg-slate-100">
                      <MoreHorizontal className="h-4 w-4 text-slate-500" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="mt-4">
                    <h2 className="text-xl font-bold text-slate-900">{post.title}</h2>
                    <p className="mt-2 text-slate-700">{post.content}</p>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link 
                        key={tag}
                        href="#"
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>

                  {/* Post Stats */}
                  <div className="mt-4 flex items-center gap-6 border-t border-slate-100 pt-4">
                    <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#157b86]">
                      <ThumbsUp className="h-4 w-4" />
                      {post.stats.upvotes}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#157b86]">
                      <MessageSquare className="h-4 w-4" />
                      {post.stats.comments}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#157b86]">
                      <Share2 className="h-4 w-4" />
                      {post.stats.shares}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#157b86]">
                      <Eye className="h-4 w-4" />
                      2.3K
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-6 text-center">
              <button className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-600 transition-all hover:border-[#157b86] hover:text-[#157b86]">
                Load More Discussions
              </button>
            </div>
          </div>

          {/* Right Sidebar - Trending & Suggested */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Today's Top Discussions */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">🔥 Trending Today</h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Link key={i} href="#" className="block">
                      <p className="text-sm font-medium text-slate-900 hover:text-[#157b86]">
                        What's your favorite productivity hack?
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                        <MessageCircle className="h-3 w-3" />
                        <span>234 comments</span>
                        <span>·</span>
                        <Flame className="h-3 w-3 text-orange-500" />
                        <span>Hot</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Community Stats */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">Community Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total Members</span>
                    <span className="font-semibold text-slate-900">1.2M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Online Now</span>
                    <span className="font-semibold text-green-600">12.3K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Posts Today</span>
                    <span className="font-semibold text-slate-900">2.4K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">New Members</span>
                    <span className="font-semibold text-slate-900">+567</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { user: 'Alex Chen', action: 'posted in', target: 'Machine Learning', time: '5m' },
                    { user: 'Sarah Kim', action: 'commented on', target: 'Webdev', time: '12m' },
                    { user: 'Mike Ross', action: 'joined', target: 'Programming', time: '23m' },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <div className="h-6 w-6 rounded-full bg-slate-200 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-600">
                          <span className="font-medium text-slate-900">{activity.user}</span> {activity.action}{' '}
                          <span className="font-medium text-[#157b86]">{activity.target}</span>
                        </p>
                        <p className="text-xs text-slate-400">{activity.time} ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}