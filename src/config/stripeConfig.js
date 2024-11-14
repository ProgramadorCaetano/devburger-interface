import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
    'pk_test_51QF1UPRrOxaqQzNymfRHV5S2YGrPLla9EtdQLqJ1mjjRE6MjRHFyPY47CNDAkDd3WL5lm9dswuIhSZ28lrzx1ckb004FQLTmAg'
);

export default stripePromise;
