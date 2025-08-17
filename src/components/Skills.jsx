import React from 'react';
import { motion } from 'framer-motion';
import '../Stylesheets/Skills.css';
import SkillsIconsBackground from './SkillsIconsBackground';

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Skills & Expertise
      </motion.h2>
      <SkillsIconsBackground />
    </section>
  );
};

export default Skills;