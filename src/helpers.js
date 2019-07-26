export function getHeaders() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user
    ? {
        'access-token': user.accessToken,
        uid: user.uid,
        client: user.client,
      }
    : {};
};

export function isIOS() {
  return navigator.userAgent.match(/ipad|iphone/i);
}
