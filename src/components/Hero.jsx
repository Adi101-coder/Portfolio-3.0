import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../Stylesheets/Hero.css';

const TITLES = [
  'Full Stack Developer',
  'ML Enthusiast',
  'Competitive Programmer'
];

const Hero = ({ theme }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
        setFade(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const handleDownloadResume = () => {
    window.open('https://drive.google.com/file/d/1rOHAKUua2qLQm25DiqBIFIaiWUs9wQd7/view?usp=sharing', '_blank');
  };

  return (
    <section className="hero">
      <div className={`hero-background ${theme === 'light' ? 'light-dots' : ''}`}>
        <div className="grain-overlay"></div>
      </div>
      
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="hero-title"
          variants={itemVariants}
        >
          Hi, I'm Adit<br />
          <motion.span
            className={`hero-animated-title fade-effect${fade ? ' fade-in' : ' fade-out'}`}
            key={titleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {TITLES[titleIndex]}
          </motion.span>
        </motion.h1>
        
        <motion.p
          className="hero-description"
          variants={itemVariants}
        >
          Passionate about building impactful digital solutions at the intersection of Full Stack Development, Machine Learning, and Competitive Programming.
        </motion.p>
        
        <motion.div
          className="hero-actions"
          variants={itemVariants}
        >
          <motion.button
            className="download-resume-btn"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleDownloadResume}
          >
            Download Resume <i className="fas fa-download"></i>
          </motion.button>
        </motion.div>
      </motion.div>
      

    </section>
  );
};

export default Hero;