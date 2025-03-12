
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Nav from '@/components/Nav';
import Calculator from '@/components/Calculator';
import GitHubGuide from '@/components/GitHubGuide';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Calculate Your LIC Premium with Precision
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              A beautiful, intuitive calculator for Life Insurance Corporation premiums with step-by-step GitHub upload guide.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <a 
                href="#calculator" 
                className="btn-primary py-3 px-8 rounded-lg w-full sm:w-auto text-center shadow-md"
              >
                Try Calculator
              </a>
              <a 
                href="#github-guide" 
                className="btn-ghost py-3 px-8 rounded-lg w-full sm:w-auto text-center border border-border"
              >
                GitHub Guide
              </a>
            </motion.div>
            
            <motion.a 
              href="#calculator"
              className="mt-16 inline-flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ChevronDown className="h-8 w-8 text-muted-foreground" />
              </motion.div>
            </motion.a>
          </div>
        </div>
      </section>
      
      {/* Calculator Section */}
      <Calculator />
      
      {/* GitHub Guide Section */}
      <GitHubGuide />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
