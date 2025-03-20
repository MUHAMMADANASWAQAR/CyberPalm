
import React from 'react';
import Layout from '@/components/Layout';
import CameraView from '@/components/CameraView';
import PageTransition from '@/components/PageTransition';

const FacialRecognition: React.FC = () => {
  return (
    <Layout 
      title="CYBER PALM" 
      subtitle="Facial Recognition Authentication"
      showBackButton
      backTo="/"
      backgroundEffect="gradient"
    >
      <div className="mt-8 flex flex-col items-center">
        <PageTransition animationType="fade">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">LOOK AT THE CAMERA!</h2>
            <p className="mt-2 text-sm text-gray-500">Position your face within the frame for scanning</p>
          </div>
        </PageTransition>
        
        <CameraView />
      </div>
    </Layout>
  );
};

export default FacialRecognition;
