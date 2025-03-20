
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Button from './Button';
import PageTransition from './PageTransition';
import { Camera, CameraOff, RefreshCw } from 'lucide-react';

interface CameraViewProps {
  onSuccess?: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onSuccess }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const setupCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsActive(true);
          setHasError(false);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setHasError(true);
        setIsActive(false);
        
        toast({
          title: "Camera Error",
          description: "Unable to access your camera. Please check permissions.",
          variant: "destructive"
        });
      }
    };
    
    if (!isActive && !hasError) {
      setupCamera();
    }
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isActive, hasError, toast]);
  
  const handleRetry = () => {
    setIsActive(false);
    setHasError(false);
  };
  
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || isProcessing) return;
    
    setIsProcessing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame on canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Simulate processing
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsProcessing(false);
      setIsSuccess(true);
      
      toast({
        title: "Recognition Successful",
        description: "Welcome back! Redirecting to the main menu..."
      });
      
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/main-menu');
        }
      }, 2000);
    }, 3000);
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <PageTransition animationType="scale" delay={200}>
        <div className="glass-panel p-6 overflow-hidden">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
            {isActive && !hasError ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover transition-all duration-500 ${isProcessing ? 'opacity-50' : 'opacity-100'}`}
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Scanner effect */}
                <div className={`absolute inset-0 border-2 rounded-lg transition-all duration-300 ${isProcessing ? 'border-cyber animate-border-pulse' : 'border-transparent'}`}>
                  {isProcessing && (
                    <div className="absolute top-0 h-0.5 w-full bg-cyber animate-pulse-slow"></div>
                  )}
                </div>
                
                {/* Facial recognition grid effect */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-gradient-dots bg-dots-sm opacity-40"></div>
                )}
                
                {/* Loading indicator during processing */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="loader">
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                )}
                
                {/* Success indicator */}
                {isSuccess && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
                    <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center animate-scale-in">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="mt-4 text-white font-medium text-lg animate-fade-in">
                      Recognition Complete
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
                {hasError ? (
                  <>
                    <CameraOff className="h-12 w-12 text-red-500 mb-4" />
                    <p className="text-white text-center mb-4">Camera access denied</p>
                    <Button 
                      size="sm" 
                      icon={<RefreshCw className="h-4 w-4" />}
                      onClick={handleRetry}
                    >
                      Try Again
                    </Button>
                  </>
                ) : (
                  <>
                    <Camera className="h-12 w-12 text-white mb-4 animate-pulse" />
                    <p className="text-white">Initializing camera...</p>
                  </>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleCapture}
              disabled={!isActive || hasError || isProcessing || isSuccess}
              isLoading={isProcessing}
              icon={<Camera className="h-5 w-5" />}
            >
              {isProcessing ? "Processing..." : "Scan Face"}
            </Button>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default CameraView;
