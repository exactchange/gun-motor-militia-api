/*
 * processPayment
 */

const {
  STRIPE_KEY_LIVE,
  STRIPE_KEY_TEST
} = process.env;

exports.processPayment = async params => {
  const {
    cardExpMonth,
    cardExpYear,
    card,
    cvc,
    email,
    isTest,
    price
  } = params;

  const stripeKey = isTest ? STRIPE_KEY_TEST : STRIPE_KEY_LIVE;
  const stripe = require('stripe')(stripeKey);

  // create Stripe customer

  try {
    const customer = await stripe.customers.create({ email });
  } catch(error) {
    console.log('Failed to create a Stripe customer.');
    console.log(error);

    return false;
  }

  // create Stripe transaction source

  try {
    const source = await stripe.customers.createSource(customer.id, {
      source: {
        cvc,
        exp_month: cardExpMonth,
        exp_year: cardExpYear,
        number: card,
        object: 'card'
      }
    });
  } catch(error) {
    console.log('Failed to create a Stripe transaction source.');
    console.log(error);

    return false;
  }

  // create Stripe charge

  try {
    return await stripe.charges.create({
      amount: Math.round(price * 100),
      currency: 'usd',
      customer: source.customer
    });
  } catch(error) {
    console.log('Failed to process a Stripe purchase.');
    console.log(error);
  }
};
