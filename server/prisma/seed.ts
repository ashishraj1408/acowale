import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const feedbackCount = await prisma.feedback.count();

  if (feedbackCount === 0) {
    await prisma.feedback.create({
      data: {
        category: 'GENERAL',
        comment: 'This is a seeded feedback entry to verify database setup.',
      },
    });
    console.log('Seeded initial feedback entry.');
  } else {
    console.log('Seed data already present. No changes made.');
  }
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
