
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
            <div className="inline-block rounded-full bg-white p-3 mb-4">
              
                <img 
                    src="https://i.pinimg.com/736x/d8/1f/f2/d81ff2cf510ac8804e127380c154b969.jpg" 
                    alt="icon" 
                    className="h-20 w-20 rounded-full "
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 00-1-1h-3a1 1 0 00-1 1v2z" />
              
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
