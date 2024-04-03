async function getInSync() {
  return await new Promise(resolve =>
    resolve(chrome.storage.local.get(["mail", "key", "aes"]))
  );
}

//https://chakkari.org/blog/2020/05/03/aes-encrypt-with-javascript/
async function decryption() {
  const get = await getInSync();
  return CryptoJS.AES.decrypt(get.aes, get.key).toString(CryptoJS.enc.Utf8);
}
async function smail() {
  const mail3 = await getInSync();
  return mail3.mail.substr(0, mail3.mail.indexOf('@')).toLowerCase();
}
async function mail() {
  const get = await getInSync();
  return get.mail;
}
