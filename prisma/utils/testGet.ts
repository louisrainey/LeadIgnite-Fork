// // testGet.ts
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// async function getUsers() {
//   try {
//     const users = await prisma.userProfile.findMany();
//     return users;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// getUsers()
//   .then((users) => {
//     console.log('Users:', users);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
