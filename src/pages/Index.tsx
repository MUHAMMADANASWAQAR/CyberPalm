
import React from 'react';
import Layout from '@/components/Layout';
import LoginForm from '@/components/LoginForm';
import PageTransition from '@/components/PageTransition';

const Index: React.FC = () => {
  return (
    <Layout 
      title="CYBER PALM" 
      subtitle="Sign in to continue your journey"
      backgroundEffect="gradient"
    >
      <div className="mt-12 flex flex-col items-center justify-center">
        <PageTransition animationType="fade">
          <div className="mb-8 text-center">
            <div className="inline-block rounded-full bg-cyber-super-light p-3 mb-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyber text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a2.5 2.5 0 015 0v6a2.5 2.5 0 01-5 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 00-1-1h-3a1 1 0 00-1 1v2z" />
                </svg>
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Access your account</h2>
            <p className="mt-1 text-sm text-gray-500">Choose your preferred login method below</p>
          </div>
        </PageTransition>
        
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Index;
