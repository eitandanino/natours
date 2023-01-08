/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51MMUMnIykDyvAtFGwAsPNuoW0MbS0Id0s2ZmitRHVqckdN78ZqFoqAAC09IIyknhAGY5iefAH2ZICq93Cp1IdBkk00aJPxKqGO'
);

export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);
    // 2. Create checkout form and charge the user
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
