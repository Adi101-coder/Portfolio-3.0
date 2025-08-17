import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaVuejs, FaBootstrap, FaNodeJs, FaGitAlt, FaGithub, FaFigma, FaPython, FaJava } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiMysql, SiHeroku, SiNetlify, SiVercel, SiRender, SiKeras, SiNumpy, SiPandas, SiScikitlearn, SiCplusplus, SiC, SiAdobe, SiDocker } from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

const SkillsIconsBackground = () => {
  const { theme } = useTheme();
  const expressColor = theme === 'dark' ? '#fff' : '#000';
  const vercelColor = theme === 'dark' ? '#fff' : '#000';

  // Custom Matplotlib SVG component
  const MatplotlibIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#11557c"/>
      <g>
        <ellipse cx="16" cy="16" rx="10" ry="4" fill="#ffffff" fillOpacity="0.8"/>
        <ellipse cx="16" cy="16" rx="7" ry="2.5" fill="#2196f3" fillOpacity="0.7"/>
        <ellipse cx="16" cy="16" rx="4" ry="1.5" fill="#ff9800" fillOpacity="0.7"/>
        <ellipse cx="16" cy="16" rx="1.5" ry="0.5" fill="#43a047" fillOpacity="0.7"/>
      </g>
    </svg>
  );

  const icons = [
    { name: 'React', icon: <FaReact color="#61DAFB" /> },
    { name: 'JavaScript', icon: <FaJs color="#F7DF1E" /> },
    { name: 'HTML5', icon: <FaHtml5 color="#E34F26" /> },
    { name: 'CSS3/SCSS', icon: <FaCss3Alt color="#1572B6" /> },
    { name: 'Vue.js', icon: <FaVuejs color="#42b883" /> },
    { name: 'Bootstrap', icon: <FaBootstrap color="#7952B3" /> },
    { name: 'Node.js', icon: <FaNodeJs color="#339933" /> },
    { name: 'Express.js', icon: <SiExpress color={expressColor} /> },
    { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
    { name: 'SQL', icon: <SiMysql color="#4479A1" /> },
    { name: 'Git', icon: <FaGitAlt color="#F05032" /> },
    { name: 'GitHub', icon: <FaGithub color="#181717" /> },
    { name: 'Figma', icon: <FaFigma color="#F24E1E" /> },
    { name: 'Adobe', icon: <SiAdobe color="#FF0000" /> },
    { name: 'Heroku', icon: <SiHeroku color="#430098" /> },
    { name: 'Netlify', icon: <SiNetlify color="#00C7B7" /> },
    { name: 'Vercel', icon: <SiVercel color={vercelColor} /> },
    { name: 'Render', icon: <SiRender color="#46E3B7" /> },
    { name: 'Keras', icon: <SiKeras color="#D00000" /> },
    { name: 'NumPy', icon: <SiNumpy color="#013243" /> },
    { name: 'Pandas', icon: <SiPandas color="#150458" /> },
    { name: 'Matplotlib', icon: <MatplotlibIcon /> },
    { name: 'Scikit-Learn', icon: <SiScikitlearn color="#F7931E" /> },
    { name: 'C', icon: <SiC color="#A8B9CC" /> },
    { name: 'C++', icon: <SiCplusplus color="#00599C" /> },
    { name: 'Java', icon: <FaJava color="#007396" /> },
    { name: 'Python', icon: <FaPython color="#3776AB" /> },
    { name: 'Docker', icon: <SiDocker color="#2496ED" /> },
  ];

  const floatVariants = {
    animate: i => ({
      y: [0, -10, 0, 10, 0],
      transition: {
        repeat: Infinity,
        duration: 4 + (i % 3),
        ease: 'easeInOut',
        delay: i * 0.1
      }
    })
  };

  return (
    <div className="skills-icons-bg-grid">
      {icons.map((item, i) => (
        <motion.div
          className="skills-icon-item"
          key={item.name}
          custom={i}
          variants={floatVariants}
          animate="animate"
          whileHover={{ scale: 1.3, zIndex: 2 }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsIconsBackground; 