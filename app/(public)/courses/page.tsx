'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { 
  Search, Clock, Users, Star, Filter, Grid3x3, 
  List, ChevronDown, BookOpen, Award, ArrowRight,
  SlidersHorizontal, X
} from 'lucide-react';
import { MOCK_COURSES } from '@/data/mock-data';

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories and levels from courses
  const categories = useMemo(() => {
    const cats = MOCK_COURSES.map(c => c.school);
    return ['all', ...new Set(cats)];
  }, []);

  const levels = useMemo(() => {
    const lvls = MOCK_COURSES.map(c => c.level);
    return ['all', ...new Set(lvls)];
  }, []);

  // Filter and sort courses
  const courses = useMemo(() => {
    let filtered = MOCK_COURSES.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                           course.description.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const matchesCategory = selectedCategory === 'all' || course.school === selectedCategory;
      return matchesSearch && matchesLevel && matchesCategory;
    });

    // Sort courses
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.id || '').localeCompare(a.id || ''));
        break;
      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [search, selectedLevel, selectedCategory, sortBy]);

  // Mock additional course data for enhanced display
  const enhancedCourses = courses.map(course => ({
    ...course,
    students: Math.floor(Math.random() * 5000) + 500,
    rating: (Math.random() * 2 + 3).toFixed(1),
    duration: '8 weeks',
    lessons: Math.floor(Math.random() * 30) + 10
  }));

  const clearFilters = () => {
    setSearch('');
    setSelectedLevel('all');
    setSelectedCategory('all');
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a5f64] to-[#2a858b] py-16">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#7fe1d6]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <BookOpen className="mr-2 h-4 w-4 text-[#7fe1d6]" />
              Course Library
            </span>
            <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
              Expand Your Knowledge
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-200">
              Discover courses crafted by industry experts to accelerate your career
            </p>
          </div>

          {/* Search Bar - Enhanced */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#157b86]" />
              <input 
                className="w-full rounded-xl border-0 bg-white py-4 pl-12 pr-4 text-slate-900 shadow-lg outline-none ring-1 ring-white/20 transition-all focus:ring-2 focus:ring-[#1fb6b6]"
                placeholder="Search for courses, topics, or skills..."
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
              />
              {search && (
                <button
                  title='Clear search'
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Filter Bar */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-[#157b86] hover:text-[#157b86] lg:hidden"
              title="Toggle filters"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {(selectedLevel !== 'all' || selectedCategory !== 'all') && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#157b86] text-xs text-white">
                  {[selectedLevel !== 'all' ? 1 : 0, selectedCategory !== 'all' ? 1 : 0].reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              {/* Category Filter */}
              <select
                title="Filter courses by category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition-all hover:border-[#157b86] focus:border-[#157b86]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>

              {/* Level Filter */}
              <select
                title="Filter courses by level"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition-all hover:border-[#157b86] focus:border-[#157b86]"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : level}
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                title="Sort courses by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none transition-all hover:border-[#157b86] focus:border-[#157b86]"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
              </select>
            </div>

            {/* Active Filters */}
            {(selectedLevel !== 'all' || selectedCategory !== 'all' || search) && (
              <div className="flex flex-wrap items-center gap-2">
                {selectedLevel !== 'all' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#157b86]/10 px-3 py-1.5 text-xs font-medium text-[#157b86]">
                    Level: {selectedLevel}
                    <button title='Clear level filter' onClick={() => setSelectedLevel('all')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#157b86]/10 px-3 py-1.5 text-xs font-medium text-[#157b86]">
                    Category: {selectedCategory}
                    <button 
                      title='Clear category filter'
                      onClick={() => setSelectedCategory('all')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#157b86]/10 px-3 py-1.5 text-xs font-medium text-[#157b86]">
                    Search: {search}
                    <button onClick={() => setSearch('')} title='Clear search'>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-slate-500 hover:text-[#157b86]"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-end">
            {/* Results Count */}
            <p className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{courses.length}</span> courses
            </p>

            {/* View Toggle */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
              <button
                title='Switch to grid view'
                onClick={() => setViewMode('grid')}
                className={`rounded-lg p-2 transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-[#157b86] text-white' 
                    : 'text-slate-400 hover:text-[#157b86]'
                }`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                title='Switch to list view'
                onClick={() => setViewMode('list')}
                className={`rounded-lg p-2 transition-all ${
                  viewMode === 'list' 
                    ? 'bg-[#157b86] text-white' 
                    : 'text-slate-400 hover:text-[#157b86]'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {showFilters && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Filters</h3>
              <button onClick={() => setShowFilters(false)} title='Close filters'>
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Category</label>
                <select
                  value={selectedCategory}
                  title='Filter courses by category'
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Level</label>
                <select
                  value={selectedLevel}
                  title='Filter courses by level'
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-slate-500">Sort By</label>
                <select
                  value={sortBy}
                  title='Sort courses by'
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Course Grid/List View */}
        {courses.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" 
              : "space-y-4"
          }>
            {enhancedCourses.map((course) => (
              <Link 
                key={course.id} 
                href={`/course/${course.id}`} 
                className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl ${
                  viewMode === 'list' ? 'flex gap-6' : ''
                }`}
              >
                {/* Image Container */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'
                }`}>
                  <img 
                    src={course.thumbnail} 
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      viewMode === 'list' ? 'h-full' : 'aspect-video'
                    }`} 
                    alt={course.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  {/* Level Badge */}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-[#157b86] backdrop-blur-sm">
                    {course.level}
                  </span>
                </div>

                {/* Content */}
                <div className={`flex flex-1 flex-col p-5 ${
                  viewMode === 'list' ? 'justify-center' : ''
                }`}>
                  {/* School/Category */}
                  <p className="text-xs font-bold uppercase tracking-wider text-[#157b86]">
                    {course.school}
                  </p>

                  {/* Title */}
                  <h3 className={`mt-1 font-bold text-slate-900 group-hover:text-[#157b86] transition-colors ${
                    viewMode === 'list' ? 'text-xl' : 'text-lg'
                  }`}>
                    {course.title}
                  </h3>

                  {/* Description - List view only */}
                  {viewMode === 'list' && (
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {course.description}
                    </p>
                  )}

                  {/* Course Stats */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {course.students.toLocaleString()}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-semibold text-slate-900">{course.rating}</span>
                    </div>
                    <span className="text-xs text-slate-500">(2.3k reviews)</span>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Free</span>
                    <span className="inline-flex items-center text-sm font-semibold text-[#157b86] transition-transform group-hover:translate-x-1">
                      View Course
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <BookOpen className="h-16 w-16 text-slate-300" />
            <h3 className="mt-4 text-xl font-semibold text-slate-900">No courses found</h3>
            <p className="mt-2 text-slate-600">
              We couldn't find any courses matching your criteria. Try adjusting your filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 rounded-lg bg-[#157b86] px-6 py-3 font-semibold text-white transition-all hover:bg-[#1fb6b6]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}