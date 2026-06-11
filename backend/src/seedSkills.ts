import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Skill from './models/Skill.js';
import connectDB from './config/db.js';

dotenv.config();

const staticSkills = [
  {
    category: 'Frontend',
    icon: 'Code2',
    color: 'bg-blue-500/10 text-blue-500',
    items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    category: 'UI/UX Design',
    icon: 'Palette',
    color: 'bg-pink-500/10 text-pink-500',
    items: ['Figma', 'Wireframing', 'Prototyping', 'Design Systems', 'Responsive Design', 'User Research', 'Accessibility'],
  },
  {
    category: 'Backend',
    icon: 'Server',
    color: 'bg-green-500/10 text-green-500',
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Nodemailer'],
  },
  {
    category: 'Database',
    icon: 'Database',
    color: 'bg-purple-500/10 text-purple-500',
    items: ['MongoDB', 'Mongoose', 'DBMS', 'Data Modeling'],
  },
  {
    category: 'CS Fundamentals',
    icon: 'GitBranch',
    color: 'bg-orange-500/10 text-orange-500',
    items: ['DSA', 'OOP', 'OS', 'Computer Networks', 'Software Engineering'],
  },
  {
    category: 'Tools & Collaboration',
    icon: 'Wrench',
    color: 'bg-yellow-500/10 text-yellow-500',
    items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Notion', 'Agile', 'Jira'],
  },
  {
    category: 'System Design',
    icon: 'Network',
    color: 'bg-purple-500/10 text-purple-500',
    items: ['Scalability', 'Caching', 'Load Balancing', 'Microservices', 'API Design', 'Database Sharding', 'Message Queues'],
  },
  {
    category: 'Mobile Development',
    icon: 'Smartphone',
    color: 'bg-indigo-500/10 text-indigo-500',
    items: ['React Native', 'Expo', 'TypeScript', 'NativeWind', 'React Navigation', 'Firebase', 'App Store Deployment'],
  }
];

const seedSkills = async () => {
  try {
    await connectDB();
    
    // Clear existing skills
    await Skill.deleteMany();
    
    // Insert static skills
    await Skill.insertMany(staticSkills);
    
    console.log('Skills seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding skills:', error);
    process.exit(1);
  }
};

seedSkills();
