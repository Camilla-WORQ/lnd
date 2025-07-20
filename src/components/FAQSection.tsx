'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'How do I register and pay for a course?',
      answer: 'Simply select the course you\'re interested in from the form above and submit your details. Our training partner will then contact you directly with an official quotation and payment instructions to proceed with your HRD Corp claim.'
    },
    {
      question: 'How does the HRD Corp claim process work?',
      answer: 'Our training partners are all registered providers with HRD Corp. Upon registration, they will provide you with all the necessary documentation to submit your grant application through the HRD Corp portal.'
    },
    {
      question: 'Can you create a customised training program for my company?',
      answer: 'Yes. Please select "Customised Training for my Company" in the form above and provide your details. Our L&D consultant will schedule a call to discuss your specific needs and develop a tailored curriculum.'
    },
    {
      question: 'Are the courses conducted online or in-person?',
      answer: 'All courses listed are conducted in-person at our WORQ locations to provide an immersive and collaborative learning experience.'
    },
    {
      question: 'What is included in the course fee?',
      answer: 'Course fees include training materials, certificates, refreshments, and access to our premium training facilities. Some courses may also include lunch depending on the duration.'
    },
    {
      question: 'Can I get a refund if I need to cancel?',
      answer: 'Cancellation policies vary by training partner. Generally, cancellations made 14 days or more before the course date are eligible for a full refund. Please check with your specific training provider for detailed terms.'
    },
    {
      question: 'Do you offer corporate group bookings?',
      answer: 'Yes, we offer special rates for corporate group bookings. Please select "Customised Training for my Company" in the form and mention your group size in the additional message field.'
    },
    {
      question: 'What qualifications do the trainers have?',
      answer: 'All our training partners are certified professionals with extensive industry experience. They are carefully selected based on their expertise, teaching ability, and track record of delivering high-quality training programs.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Your Questions, Answered
          </h2>
          <p className="text-base text-gray-600">
            Everything you need to know about our training programs and the registration process.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg transition-colors duration-200"
              >
                <span className="text-sm font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-4 pb-3">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-8">
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Our training consultants are here to help you find the perfect course for your needs.
            </p>
            <button
              onClick={() => {
                console.log('Contact us clicked');
                // TODO: Implement contact form or redirect to contact page
              }}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 