import * as Crypto from 'expo-crypto';

// Simplified RFC 6238 TOTP Generator for Offline Biometric Masterclass Validation
export async function generateOfflineTOTP(secretKey) {
  const step = 30;
  const epoch = Math.floor(Date.now() / 1000);
  const timeCounter = Math.floor(epoch / step);
  
  // Convert counter to hex buffer
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setUint32(4, timeCounter, false);

  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    secretKey + timeCounter.toString()
  );
  
  // Extract 6-digit numeric token from hash
  const numericToken = parseInt(digest.substring(0, 6), 16) % 1000000;
  return String(numericToken).padStart(6, '0');
}

