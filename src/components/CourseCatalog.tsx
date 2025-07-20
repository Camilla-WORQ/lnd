'use client';



interface Course {
  id: string;
  title: string;
  partner: string;
  duration: string;
  level: string;
  venue: string;
  price: string;
  description: string;
}

const CourseCatalog: React.FC = () => {
  const courses: Course[] = [
    {
      id: 'digital-marketing',
      title: 'Certified Professional in Digital Marketing',
      partner: 'Growth Academy',
      duration: '3 Days',
      level: 'Intermediate',
      venue: 'WORQ KL Gateway',
      price: 'RM 2,500',
      description: 'Master digital marketing strategies including SEO, SEM, social media marketing, and analytics.'
    },
    {
      id: 'agile-scrum',
      title: 'Agile Project Management with Scrum',
      partner: 'Innovate Learning',
      duration: '2 Days',
      level: 'All Levels',
      venue: 'WORQ M-City',
      price: 'RM 1,800',
      description: 'Learn Agile methodologies and Scrum framework for effective project management.'
    },
    {
      id: 'financial-modelling',
      title: 'Advanced Financial Modelling & Analysis',
      partner: 'FinancePro Experts',
      duration: '3 Days',
      level: 'Advanced',
      venue: 'WORQ KL Gateway',
      price: 'RM 3,200',
      description: 'Develop advanced financial modeling skills for business analysis and decision making.'
    },
    {
      id: 'leadership',
      title: 'Leadership & Team Management',
      partner: 'Leadership Institute',
      duration: '2 Days',
      level: 'Intermediate',
      venue: 'WORQ Subang',
      price: 'RM 2,000',
      description: 'Enhance leadership skills and learn effective team management techniques.'
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics for Business',
      partner: 'Data Insights Pro',
      duration: '3 Days',
      level: 'Intermediate',
      venue: 'WORQ KL Gateway',
      price: 'RM 2,800',
      description: 'Transform data into actionable business insights using modern analytics tools.'
    },
    {
      id: 'customer-service',
      title: 'Customer Service Excellence',
      partner: 'Service Excellence Academy',
      duration: '1 Day',
      level: 'All Levels',
      venue: 'WORQ M-City',
      price: 'RM 1,200',
      description: 'Develop exceptional customer service skills and build lasting customer relationships.'
    }
  ];

  const handleRegisterNow = (courseId: string) => {
    // For now, just log the selection since form is for newsletter
    console.log('Course selected:', courseId);
    // TODO: Implement course registration flow
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured HRD Corp Claimable Courses
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Discover professional training programs hosted at WORQ locations. 
            All courses are HRD Corp claimable for Malaysian companies.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              {/* Course Header */}
              <div className="p-4 border-b border-gray-100">
                {/* HRD Corp Badge */}
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 mb-3">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  HRD Corp Claimable
                </div>

                {/* Course Title */}
                <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>

                {/* Partner Info */}
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <span className="font-medium">Provided by:</span>
                  <span className="ml-1">{course.partner}</span>
                </div>

                {/* Course Description */}
                <p className="text-gray-600 text-xs leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Course Details */}
              <div className="p-4">
                {/* Key Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="text-sm font-medium text-gray-900">{course.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Level</div>
                      <div className="text-sm font-medium text-gray-900">{course.level}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Venue</div>
                      <div className="text-sm font-medium text-gray-900">{course.venue}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-500">Price</div>
                      <div className="text-sm font-medium text-gray-900">{course.price}</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleRegisterNow(course.id)}
                  className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-blue-50 rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Need Customised Training?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              We can develop tailored training programs specifically designed for your organization&apos;s needs.
            </p>
            <button
              onClick={() => {
                console.log('Custom training requested');
                // TODO: Implement custom training request flow
              }}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Request Custom Training
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseCatalog; 