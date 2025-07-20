'use client';

import { useState } from 'react';
import InterestForm from './InterestForm';

interface FormData {
  fullName: string;
  companyName: string;
  workEmail: string;
  contactNumber: string;
}

const HeroSection: React.FC = () => {
  const [submissionCount, setSubmissionCount] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Demo mode - simulate successful submission
      console.log('Form submitted:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setSubmissionCount(prev => (prev || 0) + 1);
      
      // Reset form after success
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Upskill Your Team with{' '}
                <span className="text-blue-600">HRD Corp Claimable</span>{' '}
                Training at WORQ
              </h1>
              <p className="text-base text-gray-600 leading-relaxed">
                Explore a curated list of professional development courses run by our expert L&D partners. 
                Enhance your team&apos;s skills in a premium learning environment, with the full cost being 
                claimable through the Human Resource Development Corporation (HRD Corp).
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-gray-900">
                Why choose training at WORQ:
              </h3>
              <ul className="space-y-1.5">
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Premium training facilities at WORQ locations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">100% HRD Corp claimable for Malaysian companies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Expert L&D partners with proven track records</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Convenient locations across Malaysia</span>
                </li>
              </ul>
            </div>

            {/* Submission Count */}
            {submissionCount !== null && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <UsersIcon className="w-4 h-4" />
                <span>{submissionCount} professionals have registered for training</span>
              </div>
            )}
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Subscribe to Newsletter
              </h2>
              <p className="text-sm text-gray-600">
                Stay updated with new HRD Corp claimable courses at WORQ
              </p>
            </div>

            <InterestForm 
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
              submitStatus={submitStatus}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const UsersIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default HeroSection; 