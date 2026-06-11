// Seed script to create the admin user
// Run with: node --import tsx/esm src/seed.ts (or via npm script)
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const seedAdmin = async () => {
  await connectDB();

  const existingAdmin = await User.findOne({ role: 'admin' });
  if (existingAdmin) {
    console.log('Admin user already exists. Exiting.');
    process.exit(0);
  }

  const admin = new User({
    username: 'admin',
    passwordHash: 'admin@123', // will be hashed by pre-save middleware
    role: 'admin',
  });

  await admin.save();
  console.log('Admin user created successfully!');
  console.log('Username: admin');
  console.log('Password: admin@123');
  console.log('IMPORTANT: Change the password after first login!');
  process.exit(0);
};

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
