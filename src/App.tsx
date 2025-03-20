
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import FacialRecognition from "./pages/FacialRecognition";
import MainMenu from "./pages/MainMenu";
import Quiz from "./pages/Quiz";
import Learning from "./pages/Learning";
import KeyboardPractice from "./pages/KeyboardPractice";
import NotFound from "./pages/NotFound";
import { PageWrapper } from "./components/PageTransition";

const queryClient = new QueryClient();

// AnimatedRoutes component to handle route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageWrapper>
            <Index />
          </PageWrapper>
        } />
        <Route path="/facial-recognition" element={
          <PageWrapper>
            <FacialRecognition />
          </PageWrapper>
        } />
        <Route path="/main-menu" element={
          <PageWrapper>
            <MainMenu />
          </PageWrapper>
        } />
        <Route path="/quiz" element={
          <PageWrapper>
            <Quiz />
          </PageWrapper>
        } />
        <Route path="/learning" element={
          <PageWrapper>
            <Learning />
          </PageWrapper>
        } />
        <Route path="/keyboard-practice" element={
          <PageWrapper>
            <KeyboardPractice />
          </PageWrapper>
        } />
        <Route path="*" element={
          <PageWrapper>
            <NotFound />
          </PageWrapper>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
