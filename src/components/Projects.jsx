import React, { useContext, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import '../Stylesheets/Projects.css';

// Import project images
import amanstarImage from '../assets/Amanstar.png';
import thinkcraftlabs from '../assets/thinkcraftlabs.png';
import blitzdutch from '../assets/blitzdutch.png';

const Projects = memo(() => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const projects = [
    {
      id: 1,
      title: "ThinkCraftLabs",
      description: "Transforming ideas into reality through innovative design and 3D printing. A comprehensive platform showcasing cutting-edge design solutions and additive manufacturing capabilities.",
      tech: "React • Node.js • 3D Printing • Design Innovation",
      image: thinkcraftlabs,
      liveUrl: "https://thinkcraftlabs.onrender.com/",
      githubUrl: "https://github.com/Adi101-coder/ThinkCraftLabs",
      status: "Live"
    },
    {
      id: 2,
      title: "AmanStar",
      description: "A completed innovative project showcasing cutting-edge features and modern web technologies.",
      tech: "React • Node.js • Modern Web Stack",
      image: amanstarImage,
      liveUrl: "https://amanstar.netlify.app/",
      githubUrl: "https://github.com/Adi101-coder/AmanStar/tree/main",
      status: "Live"
    },
    {
      id: 3,
      title: "BlitzDutch",
      description: "A modern web application featuring innovative solutions and cutting-edge technology. Built with modern web stack for optimal performance and user experience.",
      tech: "React • Modern Web Stack • Innovative Design",
      image: blitzdutch,
      liveUrl: "https://blitz-dutch.vercel.app/",
      githubUrl: "https://github.com/Adi101-coder/BlitzDutch",
      status: "Live"
    },
    {
      id: 4,
      title: "Ember",
      description: "An open source platform for all kinds of entertainment - your gateway to free movies and series streaming with seamless viewing experience.",
      tech: "React • Vite • Framer Motion • Modern CSS",
      image: "/ember.png",
      liveUrl: "https://emberv2-0.vercel.app/",
      githubUrl: "https://github.com/Adi101-coder/Emberv2.0",
      status: "Live"
    }
  ];

  const handleViewAllWorks = () => {
    navigate('/myworks');
  };

  // Memoized variants for better performance
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
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
      y: -6,
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.15,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.97
    }
  }), []);

  return (
    <LazyMotion features={domAnimation}>
      <section className={`projects-section ${theme}`}>
        <motion.div
          className="projects-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="projects-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 className="projects-title">Projects</h2>
            <p className="projects-subtitle">A showcase of my recent work</p>
          </motion.div>

          <motion.div
            className="projects-grid"
            variants={containerVariants}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="project-image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    onError={(e) => {
                      console.error(`Failed to load image for ${project.title}:`, project.image);
                      e.target.src = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&auto=format";
                    }}
                  />
                  <div className="project-status-badge">
                    {project.status}
                  </div>
                  <motion.div
                    className="project-overlay"
                    variants={overlayVariants}
                  >
                    <div className="project-links">
                      {project.liveUrl !== "#" ? (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link live-link"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          Live View
                        </motion.a>
                      ) : (
                        <motion.span
                          className="project-link live-link disabled"
                          title="Coming Soon"
                        >
                          Coming Soon
                        </motion.span>
                      )}
                      {project.githubUrl !== "#" ? (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link github-link"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          GitHub
                        </motion.a>
                      ) : (
                        <motion.span
                          className="project-link github-link disabled"
                          title="Repository not available"
                        >
                          Private
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    <span className="tech-stack">{project.tech}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="projects-footer"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="view-all-btn"
              onClick={handleViewAllWorks}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              View All Works
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </LazyMotion>
  );
});

export default Projects;