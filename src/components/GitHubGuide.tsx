
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CircleCheck, 
  Github, 
  GitBranch, 
  GitFork, 
  GitPullRequest,
  Terminal, 
  Upload
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto text-sm my-2">
      <code>{code}</code>
    </pre>
  );
};

const GitHubGuide = () => {
  const commandLineSteps = [
    {
      title: "Initialize Git Repository",
      description: "Create a new Git repository in your project folder",
      code: "git init"
    },
    {
      title: "Add Files to Staging",
      description: "Prepare your files for commit",
      code: "git add ."
    },
    {
      title: "Create First Commit",
      description: "Save your changes to the local repository",
      code: "git commit -m \"Initial commit of LIC Calculator\""
    },
    {
      title: "Connect to GitHub",
      description: "Link your local repository to GitHub",
      code: "git remote add origin https://github.com/yourusername/lic-calculator.git"
    },
    {
      title: "Push to GitHub",
      description: "Upload your code to GitHub",
      code: "git push -u origin main"
    }
  ];

  const githubDesktopSteps = [
    {
      title: "Create Repository",
      description: "Open GitHub Desktop and click on 'Create New Repository'",
      icon: <Github className="h-5 w-5" />
    },
    {
      title: "Configure Repository",
      description: "Enter repository name, select local path, and add a description",
      icon: <Terminal className="h-5 w-5" />
    },
    {
      title: "Create Commit",
      description: "Add a summary and description for your changes, then click 'Commit to main'",
      icon: <GitBranch className="h-5 w-5" />
    },
    {
      title: "Publish Repository",
      description: "Click 'Publish repository' to push your code to GitHub",
      icon: <Upload className="h-5 w-5" />
    },
    {
      title: "View on GitHub",
      description: "Open your repository on GitHub to verify your files are uploaded",
      icon: <Github className="h-5 w-5" />
    }
  ];

  const bestPractices = [
    {
      title: "Create a .gitignore File",
      description: "Exclude unnecessary files like node_modules, build folders, and environment files",
      icon: <Github className="h-5 w-5" />
    },
    {
      title: "Write a Good README",
      description: "Document your project with installation instructions, usage examples, and features",
      icon: <Terminal className="h-5 w-5" />
    },
    {
      title: "Use Descriptive Commit Messages",
      description: "Write clear, concise commits that explain what changes were made and why",
      icon: <GitFork className="h-5 w-5" />
    },
    {
      title: "Create Feature Branches",
      description: "Work on new features in separate branches before merging to main",
      icon: <GitBranch className="h-5 w-5" />
    },
    {
      title: "Review Code Before Pushing",
      description: "Double-check your changes to avoid pushing bugs or sensitive information",
      icon: <GitPullRequest className="h-5 w-5" />
    }
  ];

  return (
    <section id="github-guide" className="py-16 md:py-24 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            GitHub Upload Guide
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Learn how to share your LIC Calculator or any project on GitHub with these simple steps.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="commandline" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="commandline">Command Line</TabsTrigger>
              <TabsTrigger value="desktop">GitHub Desktop</TabsTrigger>
              <TabsTrigger value="bestpractices">Best Practices</TabsTrigger>
            </TabsList>
            
            {/* Command Line Tab */}
            <TabsContent value="commandline">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Using Git Command Line</CardTitle>
                  <CardDescription>
                    Follow these steps to upload your project using Git commands
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-6">
                    {commandLineSteps.map((step, index) => (
                      <motion.li 
                        key={index}
                        className="flex flex-col space-y-2"
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUpVariants}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            {index + 1}
                          </div>
                          <h3 className="font-medium">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground ml-8">{step.description}</p>
                        <div className="ml-8">
                          <CodeBlock code={step.code} />
                        </div>
                      </motion.li>
                    ))}
                    
                    <motion.div 
                      className="mt-6 p-4 rounded-lg bg-primary/5 flex items-start gap-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <CircleCheck className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Before you begin</h4>
                        <p className="text-sm text-muted-foreground">
                          Make sure you have <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Git installed</a> and 
                          a <a href="https://github.com/join" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub account</a>. 
                          You'll also need to create a new repository on GitHub before connecting your local repository.
                        </p>
                      </div>
                    </motion.div>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* GitHub Desktop Tab */}
            <TabsContent value="desktop">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>Using GitHub Desktop</CardTitle>
                  <CardDescription>
                    A user-friendly way to upload your project without using commands
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-6">
                    {githubDesktopSteps.map((step, index) => (
                      <motion.li 
                        key={index}
                        className="flex gap-4"
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUpVariants}
                      >
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </motion.li>
                    ))}
                    
                    <motion.div 
                      className="mt-6 p-4 rounded-lg bg-primary/5 flex items-start gap-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <CircleCheck className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Getting Started</h4>
                        <p className="text-sm text-muted-foreground">
                          Download <a href="https://desktop.github.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub Desktop</a> and 
                          sign in with your GitHub account. GitHub Desktop provides a visual interface for Git operations without requiring command line knowledge.
                        </p>
                      </div>
                    </motion.div>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Best Practices Tab */}
            <TabsContent value="bestpractices">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle>GitHub Best Practices</CardTitle>
                  <CardDescription>
                    Tips to make your GitHub repository professional and accessible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {bestPractices.map((practice, index) => (
                      <motion.div 
                        key={index}
                        className="p-4 rounded-lg bg-secondary/50 flex gap-4"
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUpVariants}
                      >
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {practice.icon}
                        </div>
                        <div>
                          <h3 className="font-medium mb-1 text-sm">{practice.title}</h3>
                          <p className="text-xs text-muted-foreground">{practice.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="mt-6 p-5 rounded-lg glass-card border border-primary/10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <h4 className="font-medium mb-3">Sample README.md Template</h4>
                    <CodeBlock code={`# LIC Calculator

A sleek, user-friendly calculator for Life Insurance Corporation premiums with different policy types.

## Features

- Calculate premiums for different policy types
- Adjust age, sum assured, and policy term
- Compare benefits across policy options
- Responsive design for all devices

## Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/lic-calculator.git

# Navigate to project directory
cd lic-calculator

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.`} />
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default GitHubGuide;
