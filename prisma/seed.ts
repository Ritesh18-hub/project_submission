import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: 'Abentika Sadhukhan',
      email: 'abentika1@example.com',
      phone: '1234567890',
      address: 'Kolkata, India',
      designation: 'UI/UX Designer',
      role: 'Admin',
      status: 'Active',
      avatar: '/avatars/abentika1.png',
    },
    {
      name: 'Abentika Sadhukhan',
      email: 'abentika2@example.com',
      phone: '1234567891',
      address: 'Kolkata, India',
      designation: 'UI/UX Designer',
      role: 'Admin',
      status: 'Active',
      avatar: '/avatars/abentika2.png',
    },
    {
      name: 'Abentika Sadhukhan',
      email: 'abentika3@example.com',
      phone: '1234567892',
      address: 'Kolkata, India',
      designation: 'UI/UX Designer',
      role: 'Admin',
      status: 'Active',
      avatar: '/avatars/abentika3.png',
    },
    {
      name: 'Abentika Sadhukhan',
      email: 'abentika4@example.com',
      phone: '1234567893',
      address: 'Kolkata, India',
      designation: 'UI/UX Designer',
      role: 'Admin',
      status: 'Active',
      avatar: '/avatars/abentika4.png',
    },
    {
      name: 'Abentika Sadhukhan',
      email: 'abentika5@example.com',
      phone: '1234567894',
      address: 'Kolkata, India',
      designation: 'UI/UX Designer',
      role: 'Admin',
      status: 'Active',
      avatar: '/avatars/abentika5.png',
    },
    {
      name: 'Abentika Sadhukhan',
      email: 'abentika6@example.com',
      phone: '1234567895',
      address: 'Kolkata, India',
      designation: 'UI/UX Designer',
      role: 'Admin',
      status: 'Active',
      avatar: '/avatars/abentika6.png',
    },
    {
      name: 'Abentika Sadhukhan',
      email: 'abentika7@example.com',
      phone: '1234567896',
      address: 'Kolkata, India',
      designation: 'UI/UX Designer',
      role: 'Admin',
      status: 'Active',
      avatar: '/avatars/abentika7.png',
    },
    {
      name: 'Abentika Sadhukhan',
      email: 'abentika8@example.com',
      phone: '1234567897',
      address: 'Kolkata, India',
      designation: 'UI/UX Designer',
      role: 'Admin',
      status: 'Active',
      avatar: '/avatars/abentika8.png',
    },
  ];
  for (const user of users) {
    try {
      await prisma.user.create({ data: user });
    } catch (e) {
      // Ignore duplicate errors
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
