export const generateOtpCode = (length: number = 4): string => {
    let randomCode = Math.floor(Math.random() * Math.pow(10, length)).toString();
  
    if (randomCode.length < length) {
      randomCode = randomCode.padStart(length, "0");
    }
    return randomCode;
  };