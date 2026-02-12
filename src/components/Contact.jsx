import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { addContactSubmission } from '../firebase/contactService';

const Contact = () => {
  const { theme } = useContext(ThemeContext) || { theme: 'dark' }; // Fallback to dark if context not available
  
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const contactMethods = [
    {
      id: 'twitter',
      title: 'Follow on X',
      subtitle: 'Let\'s connect',
      description: 'Follow me on X for updates and quick conversations',
      value: '@adit_katiyar',
      url: 'https://x.com/adit_katiyar',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      id: 'email',
      title: 'Email Me',
      subtitle: 'Drop me a line',
      description: 'Perfect for detailed discussions and project inquiries',
      value: 'aditkatiyar101@gmail.com',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    },
    {
      id: 'linkedin',
      title: 'Connect on LinkedIn',
      subtitle: 'Professional network',
      description: 'Let\'s connect professionally and explore opportunities',
      value: 'Adit Katiyar',
      url: 'https://www.linkedin.com/in/adit-katiyar-0863692b9/',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    }
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const handleCardClick = (method) => {
    if (method.id === 'email') {
      setIsFormVisible(true);
      setSelectedMethod(method);
    } else {
      setSelectedMethod(method);
      setAnimatedCards(prev => [...prev, method.id]);
      if (method.url) {
        window.open(method.url, '_blank');
      }
      setTimeout(() => {
        setAnimatedCards(prev => prev.filter(id => id !== method.id));
      }, 1000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Save to Supabase
      const result = await addContactSubmission(formData);

      if (result.success) {
        setSubmitStatus('success');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Close form after 2 seconds
        setTimeout(() => {
          setIsFormVisible(false);
          setSelectedMethod(null);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
        console.error('Submission error:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedMethod(null);
  };

  const handleContactDetailClick = (method) => {
    if (method.id === 'email') {
      const mailtoLink = `mailto:${method.value}`;
      window.location.href = mailtoLink;
    } else if (method.url) {
      window.open(method.url, '_blank');
    }
  };

  // Theme-based styles
  const getThemeStyles = () => {
    const isDark = theme === 'dark';
    
    return {
      container: {
        minHeight: '100vh',
        background: isDark ? '#000000' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000',
        padding: '20px 20px 40px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      },
      floatingDot: {
        background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      },
      card: {
        background: isDark 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))'
          : 'linear-gradient(135deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.02))',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      },
      cardHover: {
        borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
        background: isDark 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'
          : 'linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05))',
        boxShadow: isDark ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.15)'
      },
      iconWrapper: {
        background: isDark 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))'
          : 'linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05))'
      },
      subtitle: {
        color: isDark ? '#aaaaaa' : '#666666'
      },
      description: {
        color: isDark ? '#888888' : '#777777'
      },
      cardValue: {
        background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
      },
      selectedInfo: {
        background: isDark 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))'
          : 'linear-gradient(135deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.03))',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
      },
      contactDetail: {
        background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
      },
      modalOverlay: {
        background: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'
      },
      modalContent: {
        background: isDark ? '#000000' : '#ffffff',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)'
      },
      formInput: {
        border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)',
        background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        color: isDark ? '#ffffff' : '#000000'
      }
    };
  };

  const styles = getThemeStyles();

  return (
    <motion.div 
      style={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="contact-gradient-heading"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '1rem',
            backgroundImage: `linear-gradient(135deg, ${theme === 'dark' ? '#ffffff' : '#000000'}, ${theme === 'dark' ? '#cccccc' : '#666666'})`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Let's Connect
        </motion.h1>
        
        <motion.p
          style={{
            fontSize: '1.2rem',
            textAlign: 'center',
            color: styles.subtitle.color,
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Choose your preferred way to get in touch. I'm always excited to hear about new opportunities and collaborations.
        </motion.p>

        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}
          variants={containerVariants}
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.id}
              style={{
                ...styles.card,
                padding: '2rem',
                borderRadius: '20px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleCardClick(method)}
            >
              <motion.div
                style={{
                  ...styles.iconWrapper,
                  width: '60px',
                  height: '60px',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                  {method.icon}
              </motion.div>

              <motion.h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                {method.title}
              </motion.h3>

              <motion.p
                style={{
                  ...styles.subtitle,
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.1 }}
              >
                {method.subtitle}
              </motion.p>

              <motion.p
                style={{
                  ...styles.description,
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.2 }}
              >
                {method.description}
              </motion.p>

              <motion.div
                style={{
                  ...styles.cardValue,
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {method.value}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form Modal */}
        <AnimatePresence>
        {isFormVisible && (
            <motion.div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                ...styles.modalOverlay,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '20px'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeForm}
            >
              <motion.div
                style={{
                  ...styles.modalContent,
                  maxWidth: '500px',
                  width: '100%',
                  borderRadius: '20px',
                  padding: '2rem',
                  position: 'relative'
                }}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  onClick={closeForm}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: theme === 'dark' ? '#ffffff' : '#000000'
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>

                <motion.form
                  onSubmit={handleSubmit}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h2
                    style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      marginBottom: '1.5rem',
                      textAlign: 'center'
                    }}
                    variants={inputVariants}
                  >
                    Send Message
                  </motion.h2>

                  <motion.div style={{ marginBottom: '1rem' }} variants={inputVariants}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        ...styles.formInput,
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                  </motion.div>

                  <motion.div style={{ marginBottom: '1rem' }} variants={inputVariants}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        ...styles.formInput,
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                  </motion.div>

                  <motion.div style={{ marginBottom: '1rem' }} variants={inputVariants}>
                  <input
                    type="text"
                    name="subject"
                      placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                      style={{
                        ...styles.formInput,
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                    />
                  </motion.div>

                  <motion.div style={{ marginBottom: '2rem' }} variants={inputVariants}>
                  <textarea
                    name="message"
                      placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                      required
                    rows="5"
                      style={{
                        ...styles.formInput,
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '10px',
                        fontSize: '1rem',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: isSubmitting 
                        ? '#cccccc' 
                        : `linear-gradient(135deg, ${theme === 'dark' ? '#ffffff' : '#000000'}, ${theme === 'dark' ? '#cccccc' : '#666666'})`,
                      color: theme === 'dark' ? '#000000' : '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    variants={inputVariants}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>

                  {/* Success/Error Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: '#4ade80',
                        color: '#ffffff',
                        borderRadius: '10px',
                        textAlign: 'center',
                        fontWeight: '600'
                      }}
                    >
                      ✓ Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: '#ef4444',
                        color: '#ffffff',
                        borderRadius: '10px',
                        textAlign: 'center',
                        fontWeight: '600'
                      }}
                    >
                      ✗ Failed to send message. Please try again.
                    </motion.div>
                  )}
                </motion.form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Contact;