import bcrypt from 'bcrypt';
const prisma = require('../../lib/prisma'); // Adjust the path as needed
async function updatePassword(userId: string, newPassword: string) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.userProfile.update({
    where: { id: userId },
    data: { securitySettings: { update: { password: hashedPassword } } }
  });

  console.log('Password updated successfully');
}
