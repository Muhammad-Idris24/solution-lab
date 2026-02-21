import Link from 'next/link';
import { ArrowRight, Award, Users, ChevronRight, Star, Shield, Clock, Megaphone } from 'lucide-react';
import { MOCK_COURSES } from '@/data/mock-data';

export default function HomePage() {
  // Partner logos array with clickable links
  const partners = [
    { id: 1, name: 'Nest Africa', logo: '/partners/nest-ai.jpeg', alt: 'Nest Africa Logo', 
      url: 'https://nestafrica.ai/' },
    { id: 2, name: 'SmartAid', logo: '/partners/smart-aid.jpeg', alt: 'SmartAid Logo', 
      url: 'https://www.smartaidinitiative.org/' },
    { id: 3, name: 'DeepTech_Ready', logo: '/partners/deep-tech.jpeg', alt: 'DeepTech_Ready Logo', 
      url: 'https://3mtt.nitda.gov.ng/deeptech/' },
    { id: 4, name: '48 Percent', logo: '/partners/48-percent.jpeg', alt: '48 Percent Logo', 
      url: 'https://www.48percent.org/' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">

      {/* Hero Section - Enhanced with modern design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a5f64] to-[#2a858b] py-20 md:py-28">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute right-0 top-0 -mr-16 mt-16 h-64 w-64 rounded-full bg-[#7fe1d6]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-[#1fb6b6]/20 blur-3xl" />
        
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Award className="mr-2 h-4 w-4 text-[#7fe1d6]" />
              YandyTech Community
            </span>
            <h1 className="mb-6 mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
              Learn Beyond <br />Boundaries with{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#7fe1d6]">SolutionLab LMS</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#7fe1d6]/20 blur-xl"></span>
              </span>
            </h1>
            <p className="mb-10 max-w-2xl text-lg text-slate-200 md:text-xl">
              Access world-class education tailored for the modern workforce. Join thousands of learners shaping their future.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link 
                href="/courses" 
                className="group relative overflow-hidden rounded-xl bg-[#1fb6b6] px-8 py-4 font-bold text-white transition-all hover:bg-[#1a9f9f] hover:shadow-xl hover:shadow-[#1fb6b6]/25"
              >
                <span className="relative z-10 flex items-center">
                  Explore Courses
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link 
                href="/forum" 
                className="rounded-xl border-2 border-white/30 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
              >
                Join Community
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-200">
              <span className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#7fe1d6]" /> 
                Certifications
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#7fe1d6]" /> 
                Mentor-led cohorts
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#7fe1d6]" /> 
                Lifetime access
              </span>
            </div>
          </div>
          
          {/* Hero Right Column - Enhanced stats card */}
          <div className="relative animate-fade-in">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#7fe1d6] to-[#1fb6b6] opacity-30 blur"></div>
            <div className="relative rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white">Learning Overview</h3>
              <div className="mt-8 space-y-4">
                {[
                  { label: 'Active Cohorts', value: '14', icon: Users },
                  { label: 'Projects Completed', value: '120+', icon: Award },
                  { label: 'Expert Mentors', value: '40+', icon: Star },
                  { label: 'Learning Hours', value: '10k+', icon: Clock },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="group flex items-center justify-between rounded-2xl bg-white/10 p-4 transition-all hover:bg-white/20">
                      <span className="flex items-center gap-3 text-slate-100">
                        <Icon className="h-5 w-5 text-[#7fe1d6]" />
                        {item.label}
                      </span>
                      <span className="text-xl font-bold text-white">{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breaking News / Latest Announcement Section - with more visible background */}
      <section className="relative overflow-hidden py-24">
        {/* Background Image with lighter overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/image.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed', // Adds parallax effect
          }}
        >
          {/* Lighter gradient overlay - reduced opacity from 95 to 70 */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a858b]/70 to-[#1a5f64]/70" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left side - Breaking News Content */}
            <div className="text-white">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-red-500">
                  <Megaphone className="h-4 w-4 text-white" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-[#7fe1d6]">
                  What's New
                </span>
              </div>
              
              <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
                Introducing Our{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#7fe1d6]">Technology to the Locals - TTL</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-[#7fe1d6]/30 blur-xl"></span>
                </span>
              </h2>
              
              <p className="mt-6 text-xl text-slate-100">
                Brining Technology Closer to Communities. Equipping local communities with practical 
                digital skills and essential online safety knowledge for sustainable growth.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/courses/ai-learning-paths"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-[#157b86] shadow-xl transition-all hover:shadow-2xl"
                >
                  Learn More About This Feature
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
                >
                  View All New Courses
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            {/* Right side - Quick Highlights with more transparent background */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: '🚀',
                  title: 'Launch Date',
                  value: 'March 15, 2024',
                },
                {
                  icon: '🎯',
                  title: 'Early Access',
                  value: 'Limited Spots',
                },
                {
                  icon: '💡',
                  title: 'Features',
                  value: 'Smart Recommendations',
                },
                {
                  icon: '⭐',
                  title: 'Beta Testers',
                  value: '500+ Joined',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/30 bg-black/20 p-4 backdrop-blur-sm transition-all hover:bg-black/30"
                >
                  <div className="text-2xl">{item.icon}</div>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#7fe1d6]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Courses Section - Enhanced */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="section-kicker text-sm font-semibold uppercase tracking-wider text-[#157b86]">
              Trending now
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Most Popular Courses
            </h2>
            <p className="mt-2 text-slate-600">
              Join thousands of students learning these top-rated courses
            </p>
          </div>
          <Link 
            href="/courses" 
            className="group flex items-center gap-2 rounded-xl bg-[#157b86]/10 px-6 py-3 font-semibold text-[#157b86] transition-all hover:bg-[#157b86] hover:text-white"
          >
            View all courses
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {MOCK_COURSES.map((course) => (
            <Link 
              key={course.id} 
              href={`/course/${course.id}`} 
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#157b86] backdrop-blur-sm">
                  {course.level}
                </span>
              </div>
              <div className="p-5">
                <h3 className="line-clamp-2 font-bold text-slate-900 group-hover:text-[#157b86]">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{course.duration}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {course.instructor || 'Expert Instructor'}
                  </span>
                  <span className="inline-flex items-center text-sm font-semibold text-[#157b86] transition-transform group-hover:translate-x-1">
                    Enroll now <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Our Partners Section - Enhanced with centralized layout and visible logos */}
      <section className="border-y border-slate-200 bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center rounded-full bg-[#157b86]/10 px-4 py-2 text-sm font-medium text-[#157b86] mb-4">
              <Star className="mr-2 h-4 w-4" />
              Trusted Partners
            </span>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Our Valued Partners
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Collaborating with industry leaders to bring you the best learning experience
            </p>
          </div>
          
          {/* Centered grid with max-width for better logo visibility */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl">
              {partners.map((partner) => (
                <a 
                  key={partner.id}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-[#157b86] hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Logo container with better visibility */}
                  <div className="relative h-24 w-32 flex items-center justify-center mb-4">
                    <img 
                      src={partner.logo} 
                      alt={partner.alt}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Partner name - visible on hover */}
                  <span className="text-sm font-medium text-slate-600 group-hover:text-[#157b86] transition-colors">
                    {partner.name}
                  </span>
                  
                  {/* Decorative element */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#157b86]/0 via-[#157b86]/5 to-[#157b86]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Optional: Add partnership CTA */}
          <div className="text-center mt-12">
            <Link 
              href="/become-partner" 
              className="inline-flex items-center gap-2 text-[#157b86] font-semibold hover:text-[#1fb6b6] transition-colors"
            >
              Become a Partner
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#157b86] to-[#2a858b] py-24">
        {/* Decorative elements */}
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#7fe1d6]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-200">
            Join our community of learners and get access to expert mentors, 
            interactive courses, and lifetime support.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="group relative overflow-hidden rounded-xl bg-white px-8 py-4 font-bold text-[#157b86] shadow-xl transition-all hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/support"
              className="rounded-xl border-2 border-white/30 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
            >
              Contact Support
            </Link>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-200">
            <span className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#7fe1d6]" />
              24/7 Support
            </span>
            <span className="flex items-center gap-2">
              <Award className="h-5 w-5 text-[#7fe1d6]" />
              Money-back guarantee
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#7fe1d6]" />
              10k+ Active Learners
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}