import React, { useContext, lazy, Suspense, memo, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';
import AnimatedBackground from './components/AnimatedBackground';

import './App.css';

// Lazy load components for better performance
const MyWorks = lazy(() => import('./myworks'));
const ClassWorks = lazy(() => import('./components/ClassWorks'));

// Loading component for lazy-loaded routes
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.2rem',
    color: 'var(--text-color)'
  }}>
    Loading...
  </div>
);

// Memoized background components to prevent unnecessary re-renders
const MemoizedAnimatedBackground = memo(AnimatedBackground);

function AppContent() {
  const { theme } = useTheme();

  // Memoize transition variants to prevent recreation on each render
  const pageTransition = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  }), []);

  const slideTransition = useMemo(() => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3, ease: "easeOut" }
  }), []);

  return (
    <LazyMotion features={domAnimation}>
      <div className={`App ${theme}-mode`}>
        <MemoizedAnimatedBackground />
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <motion.div {...pageTransition}>
                  <Hero />
                  <Skills />
                  <Projects />
                  <Contact />
                </motion.div>
              } />
              <Route path="/classworks" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <motion.div {...slideTransition}>
                    <ClassWorks />
                  </motion.div>
                </Suspense>
              } />
              <Route path="/myworks" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <motion.div {...slideTransition}>
                    <MyWorks />
                  </motion.div>
                </Suspense>
              } />
            </Routes>
          </AnimatePresence>
        </main>

      </div>
    </LazyMotion>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;