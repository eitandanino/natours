/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const forgotPassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: {
        email,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Email was send successfully');
      window.setTimeout(() => {
        location.assign('/login'); // redirect to the login page
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const resetPassword = async (password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: window.location.href,
      data: {
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Your password has been reset successfully');
      window.setTimeout(() => {
        location.assign('/'); // redirect to the home page
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
