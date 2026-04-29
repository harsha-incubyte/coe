import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Messages must be deleted before conversations due to FK constraint
  const { count: messages } = await prisma.message.deleteMany();
  const { count: conversations } = await prisma.conversation.deleteMany();
  console.log(`Deleted ${messages} messages across ${conversations} conversations.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
