'use client';

import React, { useState } from 'react';
import CheckIcon from './icons/CheckIcon';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: string;
    yearly: string;
  };
  features: string[];
  popular?: boolean;
  cta: string;
}

const PricingSection: React.FC = () => {
  const [billingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const pricingTiers: PricingTier[] = [
    {
      id: 'individual',
      name: 'Individual Training',
      description: 'Perfect for professionals seeking skill development',
      price: {
        monthly: 'RM 800 - 1,800',
        yearly: 'RM 800 - 1,800'
      },
      features: [
        'Single course enrollment',
        'HRDF claimable (for eligible companies)',
        'Professional certificate',
        'Training materials included',
        'Post-training support',
        'Flexible scheduling options'
      ],
      cta: 'Enroll Now'
    },
    {
      id: 'corporate',
      name: 'Corporate Training',
      description: 'Ideal for companies and organizations',
      price: {
        monthly: 'Custom Pricing',
        yearly: 'Custom Pricing'
      },
      features: [
        'Bulk enrollment discounts',
        'Customized training programs',
        'On-site training options',
        'HRDF claim assistance',
        'Progress tracking reports',
        'Dedicated training coordinator',
        'Flexible payment terms',
        'Priority scheduling'
      ],
      popular: true,
      cta: 'Get Quote'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Solutions',
      description: 'For large organizations with specific training needs',
      price: {
        monthly: 'Custom',
        yearly: 'Custom'
      },
      features: [
        'Custom training curriculum',
        'Dedicated training facilities',
        'Exclusive training partners',
        'Comprehensive HRDF support',
        'Training needs assessment',
        'ROI measurement tools',
        'Executive coaching programs',
        'Ongoing consultation services',
        'Custom reporting & analytics',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Training Investment Options
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the training solution that best fits your needs and budget. 
            All courses are HRDF-claimable for eligible Malaysian companies.
          </p>

          {/* HRDF Badge */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-medium text-green-700">
              All courses are HRDF-claimable for eligible Malaysian companies
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 hover:shadow-lg ${
                tier.popular 
                  ? 'border-blue-500 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {tier.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {tier.price[billingCycle]}
                    </span>
                    {tier.price[billingCycle] !== 'Custom' && (
                      <span className="text-gray-500 ml-2">
                        /{billingCycle === 'monthly' ? 'month' : 'month, billed yearly'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                    tier.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              What&apos;s Included
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <CheckIcon className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Professional certificates</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Training materials</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckIcon className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Post-training support</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Have questions about pricing?
          </p>
          <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
            View our FAQ →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 