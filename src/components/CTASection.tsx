'use client';

import React from 'react';
import CheckIcon from './icons/CheckIcon';

const CTASection: React.FC = () => {
  const benefits = [
    'Be the first to know about new courses',
    'Exclusive early access to training programs',
    'Special offers and discounts for subscribers',
    'Updates on HRDF-claimable courses',
    'Training schedule notifications'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main CTA */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Stay Updated with New Courses
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Subscribe to our newsletter to be the first to know about new training courses 
            hosted at WORQ. Get early access and exclusive offers for upcoming programs.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 text-blue-100">
                <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => {
                console.log('Subscribe to newsletter clicked');
                // TODO: Implement newsletter subscription flow
              }}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Subscribe to Newsletter
            </button>
            <button 
              onClick={() => {
                console.log('View current courses clicked');
                // TODO: Implement course catalog navigation
              }}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              View Current Courses
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5,000+</div>
              <div className="text-blue-100">Professionals Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-100">HRDF Claimable</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">8</div>
              <div className="text-blue-100">WORQ Locations</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              What you'll receive:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">📧</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Course Updates</h4>
                <p className="text-blue-100 text-sm">
                  Be notified when new courses are available at WORQ
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">🎯</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Early Access</h4>
                <p className="text-blue-100 text-sm">
                  Get priority registration for upcoming training programs
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">💎</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Exclusive Offers</h4>
                <p className="text-blue-100 text-sm">
                  Special discounts and promotions for newsletter subscribers
                </p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-12">
            <p className="text-blue-100 mb-6">
              Stay informed about new courses • No spam, unsubscribe anytime
            </p>
            <button 
              onClick={() => {
                console.log('Subscribe now clicked');
                // TODO: Implement newsletter subscription flow
              }}
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors duration-200 shadow-lg"
            >
              Subscribe Now - It's Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 