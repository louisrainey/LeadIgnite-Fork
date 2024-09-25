// Import prisma from the correct path
import prisma from '../../lib/prisma';

// Middleware to log activities
prisma.$use(async (params, next) => {
  const result = await next(params);

  if (['create', 'update', 'delete'].includes(params.action)) {
    const userId = 'some-user-id'; // Replace with actual user ID
    const someTaskId = '123'; // Replace with actual task tracking ID or make optional

    await prisma.activityLog.create({
      data: {
        userProfileId: userId,
        action: `${params.model} - ${params.action}`,
        timestamp: new Date(),
        performedBy: userId, // Provide 'performedBy' value
        taskTrackingId: someTaskId // Provide 'taskTrackingId' value or make it optional in schema
      }
    });
  }

  return result;
});

// Rest of your code...
