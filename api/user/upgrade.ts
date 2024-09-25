import Stripe from 'stripe';
const prisma = require('../../lib/prisma'); // Adjust the path as needed
const stripe = new Stripe('your-stripe-secret-key', {
  apiVersion: '2022-11-15'
});

async function upgradeSubscription(userProfileId: string, newPlanId: string) {
  const userProfile = await prisma.userProfile.findUnique({
    where: { id: userProfileId },
    include: { subscription: true }
  });

  if (!userProfile || !userProfile.subscription) {
    throw new Error('User or subscription not found');
  }

  const subscription = await stripe.subscriptions.update(
    userProfile.subscription.stripeSubscriptionId,
    {
      items: [{ plan: newPlanId }]
    }
  );

  await prisma.userProfileSubscription.update({
    where: { userProfileId },
    data: {
      stripeSubscriptionId: subscription.id,
      name: subscription.items.data[0].plan.nickname || 'Updated Plan'
    }
  });

  console.log('Subscription upgraded:', subscription);
}
