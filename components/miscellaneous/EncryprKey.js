const EncryprKey = (str) => {
  encoded = Buffer.from(str).toString('base64');
  console.log(encoded);
  return encoded;
};
const getRandomString = () => {
  const length = 0;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
export default EncryprKey;
