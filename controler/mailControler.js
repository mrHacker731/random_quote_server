const Mail = require("../model/emailSchema");
const nodemailer = require("nodemailer");
const { success, error } = require("../utils/responseRapper");
const { generateOTP } = require("../utils/getOtp");
const User = require("../model/authSchema");


const handleSendMail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.send(error(400, "email is required"));
  }

  const chechEmail = await User.findOne({ email: email});
 if(!chechEmail) {
  return res.send(error( 400,"email is not registered"))
 }
 //otp
 const otp = generateOTP();
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'eebomopa@email1.io',
        pass: '43ACF0A7CE07D5D6FC73127A71B122C7730A'
      }
    });

   

    const mailData = {
      from: 'eebomopa@email1.io', // sender address
      to: `${email}`, // list of receivers
      subject: "Your verification code", // Subject line
      // text: "Hello world?", // plain text body
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>OTP Email</title>
        </head>
        <body>
          <div style="background-color: #f5f5f5; padding: 20px; font-family: sans-serif;">
            <h1 style="color: #333; font-size: 24px;">Your OTP is:</h1>
            <p style="color: #666; font-size: 16px;">Use the following OTP to verify your account:</p>
            <div style="background-color: #fff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); padding: 20px; font-size: 24px; display: inline-block;">
              <span style="font-weight: bold; color: #333;">${otp}</span>
            </div>
          </div>
        </body>
      </html>`, // html body
    }

    const send = await transporter.sendMail(mailData);

    //send data to mongodb
    const emailDb = await Mail.create({
      email,
      otp,
      forgetpass: true
    });
    return res.send(success(201, emailDb));

  } catch (er) {
    return res.send(error(500, er.message));
  }
};


// //verify otp 
// const verifyOtp = async(req,res)=>{
//   const {otp} = req.body;

// }
module.exports = { handleSendMail };