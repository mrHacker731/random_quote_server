const generateOTP =()=> {
    // Declare a variable to store the OTP
    let otp = "";
  
    // Loop 6 times to generate a 6-digit OTP
    for (let i = 0; i < 6; i++) {
      // Generate a random number between 0 and 9
      const digit = Math.floor(Math.random() * 10);
  
      // Append the digit to the OTP
      otp += digit.toString();
    }
  
    // Return the OTP
    return otp;
  }

  module.exports = {generateOTP};