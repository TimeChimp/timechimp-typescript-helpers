export const imageFileToBase64 = (file: File): Promise<string> => {
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.onloadend = function () {
      resolve(`${reader.result}`);
    };
    reader.readAsDataURL(file);
  });
};
