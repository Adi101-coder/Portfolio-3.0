import React, { useState, useEffect, useMemo, memo } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { ExternalLink, Eye, Star, GitBranch, Calendar } from 'lucide-react';
import { useTheme } from './context/ThemeContext'; // Import from your existing context

// Import project images
import hireIndexImage from './assets/HireIndex.png';
import amanstarImage from './assets/Amanstar.png';
import vrikshaImage from './assets/Vriksha.png';

const MyWorks = memo(() => {
  const { theme } = useTheme(); // Use your existing theme context
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());

  const isDark = theme === 'dark';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-index]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: "HireIndex",
      description: "AI-powered resume parser that analyzes resumes against ATS requirements and returns comprehensive ATS scores with detailed feedback for improvement. Features include PDF/Word document parsing, Google Gemini AI integration, and detailed scoring breakdown.",
      image: hireIndexImage,
      tags: ["React", "TypeScript", "Express.js", "Google Gemini AI", "PDF/Word Parsing"],
      link: "https://hire-index-v1-5e4w.vercel.app/",
      githubUrl: "https://github.com/AxAbhishek0309/HireIndex-v1",
      status: "Live",
      stars: 15,
      commits: 89,
      date: "2025"
    },
    {
      id: 2,
      title: "AmanStar",
      description: "A completed innovative project showcasing cutting-edge features and modern web technologies. This project demonstrates advanced development practices and innovative solutions.",
      image: amanstarImage,
      tags: ["React", "Node.js", "Modern Web Stack", "Innovation"],
      link: "https://amanstar.netlify.app/",
      githubUrl: "https://github.com/Adi101-coder/AmanStar/tree/main",
      status: "Live",
      stars: 0,
      commits: 0,
      date: "2025"
    },
    {
      id: 3,
      title: "Vriksha",
      description: "E-commerce platform for premium plants with 3D visualizations, AI chatbot, and comprehensive plant care features. Features include NextAuth.js authentication, Three.js 3D models, and AI-powered customer support.",
      image: vrikshaImage,
      tags: ["Next.js 15", "TypeScript", "TailwindCSS", "Three.js", "NextAuth.js"],
      link: "https://vrikshaby-gradians.vercel.app/",
      githubUrl: "https://github.com/AxAbhishek0309/VrikshabyGradians",
      status: "Live",
      stars: 8,
      commits: 67,
      date: "2025"
    },
    {
      id: 4,
      title: "Ember",
      description: "An open source platform for all kinds of entertainment - your gateway to free movies and series streaming with seamless viewing experience. Features modern UI/UX design, responsive layout, and optimized streaming capabilities for movie enthusiasts.",
      image: "/ember.png",
      tags: ["React", "Vite", "Framer Motion", "Modern CSS", "Entertainment"],
      link: "https://emberv2-0.vercel.app/",
      githubUrl: "https://github.com/Adi101-coder/Emberv2.0",
      status: "Live",
      stars: 12,
      commits: 45,
      date: "2025"
    },
    {
      id: 5,
      title: "Orvyn",
      description: "A landing page for the DAO gaming system featuring blockchain integration and decentralized gaming mechanics. Built with modern web technologies to showcase the future of player-owned gaming ecosystems.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop&auto=format",
      tags: ["Next.js", "TypeScript", "TailwindCSS", "DAO", "Gaming"],
      link: "https://orvyn-kappa.vercel.app/",
      githubUrl: "https://github.com/Adi101-coder/Orvyn",
      status: "Beta",
      stars: 8,
      commits: 34,
      date: "2025"
    },
    {
      id: 6,
      title: "DUV DAO",
      description: "A comprehensive landing page for DAO gaming setup integrated with proper blockchain tech stack. Features decentralized governance, voting mechanisms, and community-driven decision making for gaming ecosystems.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop&auto=format",
      tags: ["Next.js", "TypeScript", "TailwindCSS", "Blockchain", "DAO"],
      link: "https://gaming-voting-dao.vercel.app/",
      githubUrl: "https://github.com/Adi101-coder/Gaming-voting-DAO",
      status: "Beta",
      stars: 11,
      commits: 28,
      date: "2025"
    }
  ];

  const themeColors = {
    light: {
      bg: '#ffffff',
      cardBg: '#f8f9fa',
      text: '#000000',
      textSecondary: '#333333',
      textMuted: '#666666',
      border: '#e0e0e0',
      hover: '#f0f0f0',
      accent: '#000000',
      accentHover: '#333333',
      shadow: 'rgba(0, 0, 0, 0.1)',
      shadowHover: 'rgba(0, 0, 0, 0.2)'
    },
    dark: {
      bg: '#0a0a0a',
      cardBg: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#cccccc',
      textMuted: '#999999',
      border: '#333333',
      hover: '#2a2a2a',
      accent: '#ffffff',
      accentHover: '#cccccc',
      shadow: 'rgba(0, 0, 0, 0.3)',
      shadowHover: 'rgba(0, 0, 0, 0.5)'
    }
  };

  const currentTheme = isDark ? themeColors.dark : themeColors.light;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live': return '#22c55e';
      case 'Beta': return '#f59e0b';
      case 'Development': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  // Memoized Framer Motion variants for better performance
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08
      }
    }
  }), []);

  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.01,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }), []);

  const overlayVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }), []);

  const buttonVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 5 },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    }
  }), []);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: currentTheme.bg,
      color: currentTheme.text,
      transition: 'all 0.3s ease',
      padding: '2rem',
      paddingTop: '6rem',
      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
      position: 'relative'
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem',
      maxWidth: '800px',
      margin: '0 auto 4rem auto'
    },
    title: {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: '900',
      backgroundImage: `linear-gradient(135deg, ${currentTheme.text}, ${currentTheme.textMuted})`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      marginBottom: '1rem',
      letterSpacing: '-0.02em',
      position: 'relative'
    },
    titleAccent: {
      position: 'absolute',
      bottom: '-20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100px',
      height: '4px',
      background: `linear-gradient(90deg, ${currentTheme.accent}, ${currentTheme.textMuted})`,
      borderRadius: '2px'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: currentTheme.textMuted,
      fontWeight: '400',
      lineHeight: '1.6',
      marginTop: '2rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    card: {
      background: currentTheme.cardBg,
      border: `1px solid ${currentTheme.border}`,
      borderRadius: '20px',
      overflow: 'hidden',
      cursor: 'pointer',
      position: 'relative',
      boxShadow: `0 4px 20px ${currentTheme.shadow}`
    },
    imageContainer: {
      position: 'relative',
      height: '240px',
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${currentTheme.textMuted}20, ${currentTheme.accent}10)`
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'none'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(135deg, ${currentTheme.accent}90, ${currentTheme.textMuted}60)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      backdropFilter: 'blur(10px)'
    },
    actionBtn: {
      background: currentTheme.bg,
      color: currentTheme.text,
      border: 'none',
      borderRadius: '12px',
      padding: '0.75rem 1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: `0 4px 15px ${currentTheme.shadow}`
    },
    content: {
      padding: '2rem'
    },
    statusBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      color: '#ffffff',
      padding: '0.4rem 0.8rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    projectTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: currentTheme.text,
      marginBottom: '0.75rem',
      lineHeight: '1.3'
    },
    description: {
      color: currentTheme.textMuted,
      lineHeight: '1.6',
      marginBottom: '1.5rem',
      fontSize: '0.95rem'
    },
    stats: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '1.5rem',
      fontSize: '0.85rem',
      color: currentTheme.textMuted
    },
    stat: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem'
    },
    tags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    tag: {
      background: `${currentTheme.accent}15`,
      color: currentTheme.text,
      padding: '0.4rem 0.8rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '500',
      border: `1px solid ${currentTheme.border}`,
      transition: 'all 0.2s ease'
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <style>{`
        @media (max-width: 900px) {
          .myworks-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
            gap: 1.5rem !important;
            padding: 0 1rem !important;
          }
          .myworks-card {
            border-radius: 16px !important;
          }
        }
        @media (max-width: 600px) {
          .myworks-container {
            padding: 1rem !important;
            padding-top: 5rem !important;
            min-height: 100vh !important;
          }
          .myworks-header {
            margin-bottom: 2.5rem !important;
            max-width: 100% !important;
            padding: 0 0.5rem !important;
          }
          .myworks-title {
            font-size: 2.5rem !important;
            line-height: 1.1 !important;
            margin-bottom: 1.5rem !important;
          }
          .myworks-subtitle {
            font-size: 1.1rem !important;
            margin-top: 1.5rem !important;
            line-height: 1.5 !important;
            padding: 0 0.5rem !important;
          }
          .myworks-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            padding: 0 0.5rem !important;
            max-width: 100% !important;
          }
          .myworks-card {
            border-radius: 12px !important;
            margin: 0 !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
          }
          .myworks-image-container {
            height: 180px !important;
          }
          .myworks-content {
            padding: 1.25rem !important;
          }
          .myworks-project-title {
            font-size: 1.3rem !important;
            margin-bottom: 0.75rem !important;
            line-height: 1.3 !important;
          }
          .myworks-description {
            font-size: 0.95rem !important;
            margin-bottom: 1.25rem !important;
            line-height: 1.5 !important;
          }
          .myworks-stats {
            gap: 1rem !important;
            font-size: 0.8rem !important;
            margin-bottom: 1.25rem !important;
            justify-content: flex-start !important;
          }
          .myworks-tags {
            gap: 0.5rem !important;
          }
          .myworks-tag {
            font-size: 0.75rem !important;
            padding: 0.4rem 0.7rem !important;
            border-radius: 6px !important;
          }
          .myworks-action-btn {
            padding: 0.6rem 1rem !important;
            font-size: 0.85rem !important;
            border-radius: 8px !important;
          }
          .myworks-overlay {
            gap: 0.75rem !important;
          }
        }
        @media (max-width: 480px) {
          .myworks-container {
            padding: 0.75rem !important;
            padding-top: 4.5rem !important;
          }
          .myworks-header {
            padding: 0 0.25rem !important;
            margin-bottom: 2rem !important;
          }
          .myworks-title {
            font-size: 2.2rem !important;
          }
          .myworks-subtitle {
            font-size: 1rem !important;
            padding: 0 0.25rem !important;
          }
          .myworks-grid {
            padding: 0 0.25rem !important;
            gap: 1.25rem !important;
          }
          .myworks-card {
            border-radius: 10px !important;
          }
          .myworks-image-container {
            height: 160px !important;
          }
          .myworks-content {
            padding: 1rem !important;
          }
          .myworks-project-title {
            font-size: 1.2rem !important;
          }
          .myworks-description {
            font-size: 0.9rem !important;
          }
          .myworks-stats {
            gap: 0.75rem !important;
            font-size: 0.75rem !important;
          }
          .myworks-tag {
            font-size: 0.7rem !important;
            padding: 0.35rem 0.6rem !important;
          }
          .myworks-action-btn {
            padding: 0.55rem 0.85rem !important;
            font-size: 0.8rem !important;
          }
        }
      `}</style>
      <motion.div 
        style={styles.container}
        className="myworks-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          style={styles.header}
          className="myworks-header"
          variants={headerVariants}
        >
          <motion.h1 
            style={styles.title}
            className="myworks-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            My Works
            <motion.div 
              style={styles.titleAccent}
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />
          </motion.h1>
          <motion.p 
            style={styles.subtitle}
            className="myworks-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A curated collection of innovative projects showcasing modern web development,
            creative problem-solving, and cutting-edge technologies
          </motion.p>
        </motion.div>

        <motion.div 
          style={styles.grid}
          className="myworks-grid"
          variants={containerVariants}
        >
          {projects.map((project, index) => {
            const isVisible = visibleCards.has(index.toString());
            const isHovered = hoveredCard === project.id;
            
            return (
              <motion.div
                key={project.id}
                style={styles.card}
                className="myworks-card"
                variants={cardVariants}
                whileHover="hover"
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.imageContainer} className="myworks-image-container">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    style={{
                      ...styles.image,
                      ...(isHovered ? { filter: 'brightness(1.05)' } : {})
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    onError={(e) => {
                      console.error(`Failed to load image for ${project.title}:`, project.image);
                      e.target.src = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop";
                    }}
                  />
                  <motion.div 
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(project.status)
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {project.status}
                  </motion.div>
                  <motion.div 
                    style={styles.overlay}
                    className="myworks-overlay"
                    variants={overlayVariants}
                  >
                    {project.githubUrl && project.githubUrl !== "#" ? (
                      <motion.a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.actionBtn}
                        className="myworks-action-btn"
                        variants={buttonVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye size={16} />
                        View Code
                      </motion.a>
                    ) : (
                      <motion.span 
                        style={{...styles.actionBtn, opacity: 0.6, cursor: 'not-allowed'}} 
                        className="myworks-action-btn"
                        variants={buttonVariants}
                      >
                        <Eye size={16} />
                        Private
                      </motion.span>
                    )}
                    {project.link && project.link !== "#" ? (
                      <motion.a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.actionBtn}
                        className="myworks-action-btn"
                        variants={buttonVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </motion.a>
                    ) : (
                      <motion.span 
                        style={{...styles.actionBtn, opacity: 0.6, cursor: 'not-allowed'}} 
                        className="myworks-action-btn"
                        variants={buttonVariants}
                      >
                        <ExternalLink size={16} />
                        Coming Soon
                      </motion.span>
                    )}
                  </motion.div>
                </div>
                <div style={styles.content} className="myworks-content">
                  <h3 style={styles.projectTitle} className="myworks-project-title">{project.title}</h3>
                  <p style={styles.description} className="myworks-description">{project.description}</p>
                  <div style={styles.stats} className="myworks-stats">
                    <div style={styles.stat} className="myworks-stat">
                      <Star size={14} />
                      {project.stars}
                    </div>
                    <div style={styles.stat} className="myworks-stat">
                      <GitBranch size={14} />
                      {project.commits}
                    </div>
                    <div style={styles.stat} className="myworks-stat">
                      <Calendar size={14} />
                      {project.date}
                    </div>
                  </div>
                  <div style={styles.tags} className="myworks-tags">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span 
                        key={tagIndex} 
                        style={styles.tag}
                        className="myworks-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.05 * tagIndex }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </LazyMotion>
  );
});

export default MyWorks;