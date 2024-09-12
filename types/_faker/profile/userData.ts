import { APP_TESTING_MODE } from '@/constants/data';
import { faker } from '@faker-js/faker';

// Mock Data Generation Using Faker.js
const billingHistory = Array.from({ length: 5 }, () => ({
  invoice: faker.commerce.productName(), // Random product name for invoice
  amount: `USD $${faker.commerce.price({ min: 10, max: 500, dec: 2 })}`, // Corrected usage for random price between $10 to $500
  date: faker.date.future().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }), // Future date in format (e.g., Sep 09, 2024)
  status: faker.helpers.arrayElement(['Paid', 'Unpaid']) // Randomly select "Paid" or "Unpaid"
}));

const paymentDetails = {
  cardType: faker.finance.creditCardIssuer(), // Random credit card type (e.g., Visa, MasterCard)
  cardLastFour: faker.finance.creditCardNumber('####').slice(-4), // Generate a credit card number and take last 4 digits
  expiry: faker.date
    .future({ years: 5 }) // Corrected: Pass an object with "years"
    .toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }) // Generate a future expiry date (e.g., 08/2028)
};

export const mockBillingHistory = APP_TESTING_MODE && billingHistory;

export const mockPaymentDetails = APP_TESTING_MODE && paymentDetails;
