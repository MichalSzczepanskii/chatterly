export async function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', () => {
      resolve(reader.result as string);
    });
    reader.addEventListener('error', err => {
      reject(err);
    });
    if (!['Blob', 'File'].includes(file.constructor.name)) return;
    reader.readAsDataURL(file);
  });
}
