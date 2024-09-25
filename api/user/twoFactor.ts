// var secret = speakeasy.generateSecret();

// import prisma from '../../lib/prisma'; // Import the singleton PrismaClient
// async function enable2FA(userId: string) {
//   const secret = speakeasy.generateSecret();

//   await prisma.twoFactorAuth.update({
//     where: { userProfileId: userId },
//     data: {
//       isEnabled: true,
//       methods: 'authenticatorApp',
//       lastEnabledAt: new Date()
//     }
//   });

//   console.log('2FA enabled, secret:', secret.base32);
// }
