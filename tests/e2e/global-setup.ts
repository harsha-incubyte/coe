import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

async function globalSetup() {
  const prisma = new PrismaClient();
  const hashedPassword = await bcrypt.hash('password123', 10);

  console.log('--- Global Setup: Seeding Test Database ---');

  try {
    // Ensure the default test user exists
    await prisma.user.upsert({
      where: { email: 'doctor@example.com' },
      update: {
        password: hashedPassword,
        name: 'Dr. Harsha Vardhana',
      },
      create: {
        email: 'doctor@example.com',
        password: hashedPassword,
        name: 'Dr. Harsha Vardhana',
      },
    });

    console.log('--- Global Setup: Database Seeded Successfully ---');
  } catch (error) {
    console.error('Error during global setup seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default globalSetup;
