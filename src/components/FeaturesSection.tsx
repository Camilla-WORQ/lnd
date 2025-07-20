'use client';

import React from 'react';
import CheckIcon from './icons/CheckIcon';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      id: '1',
      title: 'HRDF-Claimable Courses',
      description: 'All our training programs are HRDF-claimable, helping Malaysian companies reduce training costs.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      benefits: [
        'HRDF levy reimbursement',
        'Reduced training costs',
        'Compliance with regulations',
        'Easy claim process'
      ]
    },
    {
      id: '2',
      title: 'Certified Training Partners',
      description: 'Learn from WORQ\'s network of certified and experienced training professionals.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      benefits: [
        'Industry-certified instructors',
        'Real-world experience',
        'Practical case studies',
        'Professional networking'
      ]
    },
    {
      id: '3',
      title: 'Flexible Training Formats',
      description: 'Choose from in-person, virtual, or hybrid training formats to suit your schedule.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      benefits: [
        'In-person training sessions',
        'Virtual classroom options',
        'Hybrid learning formats',
        'Flexible scheduling'
      ]
    },
    {
      id: '4',
      title: 'Convenient Locations',
      description: 'Access training at WORQ\'s premium coworking spaces across Malaysia.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      benefits: [
        'Multiple locations nationwide',
        'Premium training facilities',
        'Modern learning environment',
        'Easy accessibility'
      ]
    },
    {
      id: '5',
      title: 'Professional Certificates',
      description: 'Receive recognized certificates upon completion to enhance your professional credentials.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      benefits: [
        'Industry-recognized certificates',
        'Professional development credits',
        'Portfolio enhancement',
        'Career advancement support'
      ]
    },
    {
      id: '6',
      title: 'Post-Training Support',
      description: 'Get ongoing support and resources to apply your new skills in the workplace.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
        </svg>
      ),
      benefits: [
        'Follow-up consultations',
        'Resource materials access',
        'Implementation guidance',
        'Ongoing support network'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose WORQ Training?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            WORQ&apos;s training programs combine professional expertise with convenient access 
            to help you and your organization achieve learning and development goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                {feature.icon}
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {feature.description}
              </p>

              {/* Benefits List */}
              <div className="space-y-3">
                {feature.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-700 mb-2">
                5,000+
              </div>
              <div className="text-gray-600">Professionals Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-700 mb-2">
                100%
              </div>
              <div className="text-gray-600">HRDF Claimable</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-700 mb-2">
                25+
              </div>
              <div className="text-gray-600">Training Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-700 mb-2">
                8
              </div>
              <div className="text-gray-600">Locations Nationwide</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 