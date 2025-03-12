
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-border">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center">
          <motion.div 
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-sm">
              <span className="font-semibold text-white text-xs">L</span>
            </div>
            <span className="font-medium text-sm">LIC Calculator</span>
          </motion.div>
          
          <motion.div
            className="flex items-center justify-center gap-6 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <a href="#calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Calculator
            </a>
            <a href="#github-guide" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GitHub Guide
            </a>
            <a 
              href="https://github.com/join" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </motion.div>
          
          <motion.div
            className="text-xs text-center text-muted-foreground flex items-center gap-1.5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <span>Built with</span>
            <Heart className="h-3 w-3 text-destructive" />
            <span>&copy; {currentYear} LIC Calculator</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
