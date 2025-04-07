/**
 * 取得 base64 字串
 * @param {File} file - 圖片檔
 * @returns {Promise}
 */
const getBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror;
  });

/**
 * 取得壓縮過的 base64 字串
 * @param {File} file - 圖片檔
 * @param {string} type - 圖片檔type，預設：image/jpeg
 * @param {number} whCompress - 圖片寬高壓縮率(0-1)，預設：1(無壓縮)
 * @param {number} maxSizeInBytes - 圖片壓縮至幾Bytes，預設：1MB
 * @returns {Promise}
 */
const getBase64Compressed = async (
  file: File,
  type = 'image/jpeg',
  whCompress = 1,
  maxSizeInBytes = 1024 * 1024
) => {
  let quality = 1;
  let compressedBase64 = (await _compressWithQuality(file, type, whCompress, quality)) as string;

  while (compressedBase64.length > maxSizeInBytes && quality > 0.1) {
    quality -= 0.05;
    compressedBase64 = (await _compressWithQuality(file, type, whCompress, quality)) as string;
  }

  return compressedBase64;
};
const _compressWithQuality = (file: File, type: string, whCompress: number, quality: number) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const img = new Image();
      if (e.target?.result) {
        img.src = e.target.result as string;
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (ctx) {
            // 設置 canvas 尺寸
            canvas.width = img.width * whCompress;
            canvas.height = img.height * whCompress;
            // 將圖片繪製到 canvas 中
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // 將 canvas 壓縮並轉為 base64 格式
            const base64 = canvas.toDataURL(type, quality);
            resolve(base64);
          }
        };
      }
    };
  });
};

export { getBase64, getBase64Compressed };
