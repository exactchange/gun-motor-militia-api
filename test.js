/*
 * PlayBlacklisted
 * Test
 */

const smoke = require('fire-backend-test');
const { it } = smoke;

const skipTests = false;

const runTests = async () => {
  try {
    await it('creates a transaction for user "test@example.com"',
      {
        url: 'http://localhost:1337/transaction/test@example.com',
        data: {
          cardExpMonth: 12,
          cardExpYear: 2020,
          card: 4242424242424242,
          cvc: 123,
          isTest: true
        },
        method: 'put'
      },
      {
        status: 200,
        message: 'Thank you for your purchase. Your screen name is test@example.com. See you in game!'
      }
    );
  } catch(error) {
    console.log(error.message);
    console.log('<< ERROR >>', error);
  }
};

(async() => {
  if (!skipTests) {

    await runTests();

    console.log('Tests completed.');
  }
})();
