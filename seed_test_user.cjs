/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  console.log('Generated hash:', hashedPassword);
  
  const user = await prisma.user.upsert({
    where: { email: 'doctor@example.com' },
    update: { password: hashedPassword },
    create: {
      email: 'doctor@example.com',
      password: hashedPassword,
      name: 'Dr. Harsha Vardhana',
    },
  });

  console.log('User upserted:', user.email);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
