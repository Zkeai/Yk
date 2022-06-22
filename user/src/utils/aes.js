import CryptoJS from 'crypto-js'

const key = 'f4k9f5w7f8g4er26'
// 偏移量 16位（不可随意修改，否则前后端加密解密可能失败）
const iv = '0000000000000000'

export function encrypt(data) {
  return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
    .toString()
}
export function decrypt(data) {
  const decrypted = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8).toString()
}

