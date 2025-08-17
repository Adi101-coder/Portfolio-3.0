import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../Stylesheets/Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
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
    }
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left - Adit Katiyar */}
      <motion.div
        variants={linkVariants}
        whileHover="hover"
      >
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: 'inherit',
            fontSize: window.innerWidth <= 480 ? '1.1rem' : window.innerWidth <= 768 ? '1.3rem' : '1.5rem',
            fontWeight: '700'
          }}
        >
          Adit Katiyar
        </Link>
      </motion.div>

      {/* Middle - My Works */}
      <motion.div
        variants={linkVariants}
        whileHover="hover"
      >
        <Link 
          to="/myworks" 
          style={{ 
            textDecoration: 'none', 
            color: 'inherit',
            fontSize: window.innerWidth <= 480 ? '0.8rem' : window.innerWidth <= 768 ? '0.9rem' : '1.1rem',
            fontWeight: '500'
          }}
        >
          My Works
        </Link>
      </motion.div>

      {/* Class Works link hidden */}
    </motion.nav>
  );
};

export default Navbar;
