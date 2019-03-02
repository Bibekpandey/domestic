
const redirectUri = 'http://localhost:4000/login';
const state = 'abcd';

const gClientId = '743587407842-db3vflqng9hf6j3nqq78781s0stkc4ih.apps.googleusercontent.com';

export const googleLoginUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${gClientId}&redirect_uri=${redirectUri}&access_type=offline&response_type=code&scope=openid+email+profile&state=${state}`;

export const facebookLoginUrl = '';
