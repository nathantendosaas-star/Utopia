const MAX_IMAGE_DIMENSION = 1400;
const MAX_DATA_URL_BYTES = 850_000;
const INITIAL_QUALITY = 0.82;
const MIN_QUALITY = 0.5;

const readImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('FAILED_TO_READ_IMAGE'));
    };
    image.src = url;
  });

const getDataUrlSize = (dataUrl: string) => Math.ceil((dataUrl.length * 3) / 4);

export async function fileToFirestoreImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('ONLY_IMAGE_UPLOADS_ARE_SUPPORTED_WITH_FIRESTORE_ONLY_MODE');
  }

  const image = await readImage(file);
  const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('IMAGE_ENCODER_UNAVAILABLE');
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  for (let quality = INITIAL_QUALITY; quality >= MIN_QUALITY; quality -= 0.08) {
    const dataUrl = canvas.toDataURL('image/jpeg', quality);

    if (getDataUrlSize(dataUrl) <= MAX_DATA_URL_BYTES) {
      return dataUrl;
    }
  }

  throw new Error('IMAGE_TOO_LARGE_FOR_FIRESTORE_DOCUMENT');
}
