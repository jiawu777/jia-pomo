import FingerprintJS from '@fingerprintjs/fingerprintjs';
import UAParse from 'ua-parser-js';

const getUA = () => {
  const UNKNOWN = 'unknown';
  const parser = new UAParse();
  const device = parser.getDevice();
  const os = parser.getOS();
  const browser = parser.getBrowser();

  return {
    browser: browser.name ?? UNKNOWN,
    device: device.model ?? UNKNOWN,
    os: os.name ?? UNKNOWN,
  };
};

const getFingerprint = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
};

export { getUA, getFingerprint };
