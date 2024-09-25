import { authenticator } from 'otplib';
import prisma from '../../lib/prisma'; // Adjust the path as needed

async function enable2FA(userId: string) {
  const secret = authenticator.generateSecret();

  await prisma.twoFactorAuth.update({
    where: { userProfileId: userId },
    data: {
      isEnabled: true,
      methods: 'authenticatorApp',
      lastEnabledAt: new Date()
    }
  });

  console.log('2FA enabled, secret:', secret);
}
