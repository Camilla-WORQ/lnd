'use client';

import { useState } from 'react';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Lim',
      position: 'HR Manager',
      company: 'TechCorp Malaysia',
      content: 'The HRD Corp claimable courses at WORQ have been excellent for our team development. The facilities are world-class and the training partners are highly professional.',
      rating: 5,
      avatar: 'SL'
    },
    {
      id: '2',
      name: 'Ahmad Rahman',
      position: 'Learning & Development Director',
      company: 'Global Solutions Sdn Bhd',
      content: 'We\'ve trained over 50 employees through these programs. The quality of instruction and the convenience of the WORQ locations make it our preferred training partner.',
      rating: 5,
      avatar: 'AR'
    },
    {
      id: '3',
      name: 'Lisa Chen',
      position: 'Training Coordinator',
      company: 'Innovate Malaysia',
      content: 'The courses are well-structured and the HRD Corp claim process is straightforward. Our team has gained valuable skills that directly impact our business.',
      rating: 5,
      avatar: 'LC'
    },
    {
      id: '4',
      name: 'David Wong',
      position: 'Operations Manager',
      company: 'Digital Dynamics',
      content: 'Professional training in a premium environment. The courses are practical and immediately applicable to our daily operations.',
      rating: 5,
      avatar: 'DW'
    },
    {
      id: '5',
      name: 'Nurul Huda',
      position: 'Senior HR Executive',
      company: 'Future Forward Ltd',
      content: 'Excellent training programs with certified partners. The WORQ facilities provide the perfect learning environment for our employees.',
      rating: 5,
      avatar: 'NH'
    },
    {
      id: '6',
      name: 'Michael Tan',
      position: 'CEO',
      company: 'Startup Ventures',
      content: 'As a growing company, we need cost-effective training solutions. The HRD Corp claimable courses at WORQ have been perfect for our needs.',
      rating: 5,
      avatar: 'MT'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Hear from professionals who have attended training programs 
            hosted at WORQ locations across Malaysia.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-sm text-gray-700 mb-4 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.position}</div>
                  <div className="text-xs text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default TestimonialsSection; 