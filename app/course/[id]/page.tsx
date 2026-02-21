import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, Clock, Users, Award, Star, BookOpen, 
  PlayCircle, CheckCircle, Calendar, BarChart, 
  Share2, Bookmark, ChevronRight, Target, Zap
} from 'lucide-react';
import { MOCK_COURSES } from '@/data/mock-data';

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = MOCK_COURSES.find((entry) => entry.id === id);
  if (!course) notFound();

  // Mock additional course data
  const courseDetails = {
    duration: '8 weeks',
    lessons: 24,
    quizzes: 6,
    projects: 3,
    students: 1234,
    rating: 4.8,
    level: course.level || 'Intermediate',
    instructor: {
      name: 'Alamin Musa Magaga',
      title: 'Lead Instructor at SolutionLab',
      avatar: '/alamin.jpg',
      students: 5000,
      rating: 4.9
    },
    prerequisites: [
      'Basic understanding of programming concepts',
      'Familiarity with web technologies',
      'Access to a computer with internet connection'
    ],
    whatYoullLearn: [
      'Master core concepts and advanced techniques',
      'Build real-world projects from scratch',
      'Implement industry best practices',
      'Debug and optimize your code effectively'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section with Course Image */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden md:h-[50vh]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>
        
        {/* Navigation - Fixed z-index and positioning */}
        <div className="absolute left-0 right-0 top-0 z-20 p-6">
          <div className="mx-auto max-w-7xl">
            <Link 
              href="/courses" 
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 cursor-pointer relative z-30"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Link>
          </div>
        </div>

        {/* Course Title Overlay - Lower z-index than navigation */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
              <span className="rounded-full bg-[#1fb6b6]/20 px-3 py-1 text-xs font-semibold text-[#7fe1d6] backdrop-blur-sm">
                {course.school}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {courseDetails.duration}
              </span>
              <span className="flex items-center gap-1">
                <BarChart className="h-4 w-4" />
                {courseDetails.level}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {course.title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/90">
              {course.description}
            </p>
            
            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1fb6b6] to-[#157b86] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl">
                <PlayCircle className="h-5 w-5" />
                Start Learning
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                <Bookmark className="h-5 w-5" />
                Save for Later
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                <Share2 className="h-5 w-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: BookOpen, label: 'Lessons', value: courseDetails.lessons },
                { icon: Target, label: 'Quizzes', value: courseDetails.quizzes },
                { icon: Award, label: 'Projects', value: courseDetails.projects },
                { icon: Users, label: 'Students', value: `${courseDetails.students}+` },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="group rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#157b86] hover:shadow-md">
                    <Icon className="h-5 w-5 text-[#157b86]" />
                    <p className="mt-2 text-xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-600">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* What You'll Learn */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <Zap className="h-5 w-5 text-[#157b86]" />
                What You'll Learn
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {courseDetails.whatYoullLearn.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#1fb6b6]" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Syllabus */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-slate-900">Course Syllabus</h2>
              <div className="mt-4 space-y-4">
                {course.syllabus.map((item, index) => (
                  <div key={index} className="group rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-[#157b86] hover:bg-white">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#157b86]/10 text-xs font-bold text-[#157b86]">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-semibold text-slate-900">{item}</h3>
                          <p className="mt-1 text-sm text-slate-600">
                            {index === 0 && 'Introduction to core concepts and fundamentals'}
                            {index === 1 && 'Deep dive into advanced techniques and best practices'}
                            {index === 2 && 'Hands-on project implementation and real-world applications'}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-500">45 min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-slate-900">Prerequisites</h2>
              <ul className="mt-4 space-y-2">
                {courseDetails.prerequisites.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#157b86]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Instructor Card */}
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">Your Instructor</h3>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-[#1fb6b6] to-[#157b86]">
                  {courseDetails.instructor.avatar ? (
                    <img 
                      src={courseDetails.instructor.avatar} 
                      alt={courseDetails.instructor.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xl font-bold text-white">
                      {courseDetails.instructor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{courseDetails.instructor.name}</p>
                  <p className="text-sm text-slate-600">{courseDetails.instructor.title}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {courseDetails.instructor.students}+ students
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {courseDetails.instructor.rating}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Expert instructor with over 10 years of industry experience. Passionate about teaching and helping students succeed in their careers.
              </p>
            </div>

            {/* Course Includes */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">This course includes</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <Clock className="h-4 w-4 text-[#157b86]" />
                  {courseDetails.duration} of on-demand video
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <Award className="h-4 w-4 text-[#157b86]" />
                  Certificate of completion
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <Users className="h-4 w-4 text-[#157b86]" />
                  Access to student community
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-700">
                  <Calendar className="h-4 w-4 text-[#157b86]" />
                  Lifetime access
                </li>
              </ul>
            </div>

            {/* Enrollment Card */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-[#1a5f64] to-[#2a858b] p-6 text-white">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#7fe1d6]">Enrollment</span>
                <span className="rounded-full bg-white/20 px-2 py-1 text-xs">Limited spots</span>
              </div>
              <p className="mt-4 text-2xl font-bold">Free</p>
              <p className="mt-1 text-sm text-white/80">Start learning today</p>
              <button className="mt-6 w-full rounded-xl bg-white px-4 py-3 font-semibold text-[#157b86] transition-all hover:bg-[#7fe1d6]">
                Enroll Now
              </button>
              <p className="mt-3 text-center text-xs text-white/60">
                30-day money-back guarantee
              </p>
            </div>

            {/* Reviews Preview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Student Reviews</h3>
                <Link href="#" className="text-sm font-medium text-[#157b86] hover:underline">
                  See all
                </Link>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-slate-900">{courseDetails.rating}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(courseDetails.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{courseDetails.students} reviews</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs text-slate-600 w-6">{star} ★</span>
                      <div className="h-1.5 flex-1 rounded-full bg-slate-200">
                        <div 
                          className="h-1.5 rounded-full bg-[#157b86]" 
                          style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 5}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 w-8">
                        {star === 5 ? '70%' : star === 4 ? '20%' : '5%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Related Courses</h2>
            <Link href="/courses" className="group flex items-center gap-1 text-sm font-semibold text-[#157b86]">
              View all
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_COURSES.filter(c => c.id !== course.id).slice(0, 3).map((relatedCourse) => (
              <Link 
                key={relatedCourse.id} 
                href={`/course/${relatedCourse.id}`}
                className="group rounded-xl border border-slate-200 bg-white overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <img 
                  src={relatedCourse.thumbnail} 
                  alt={relatedCourse.title}
                  className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="p-4">
                  <p className="text-xs font-bold uppercase text-[#157b86]">{relatedCourse.school}</p>
                  <h3 className="mt-1 font-semibold text-slate-900 group-hover:text-[#157b86]">
                    {relatedCourse.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">{relatedCourse.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Optional: Add a small invisible element to ensure z-index works */}
      <div className="relative z-0" />
    </div>
  );
}