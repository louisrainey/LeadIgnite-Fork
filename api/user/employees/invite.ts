async function inviteEmployee(
  userProfileId: string,
  email: string,
  role: string
) {
  const newEmployee = await prisma.teamMember.create({
    data: {
      firstName: '',
      lastName: '',
      email,
      role,
      userProfile: {
        connect: { id: userProfileId }
      }
    }
  });

  console.log('Employee invited:', newEmployee);
}
