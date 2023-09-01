// import nodemailer from "nodemailer";
// import User from "@/models/userModel";
// import bcryptjs from "bcryptjs";

// export const sendEmail = async ({ email, emailType, userId }: any) => {
//   try {
//     //created a Hashed token
//     const hashedToken = await bcryptjs.hash(userId.toString(), 10);

//     if (emailType === "VERIFY") {
//       await User.findByIdAndUpdate(
//         //if we find these id
//         userId,

//         //then upade these values
//         {
//           verifyToken: hashedToken,
//           verifyTokenExpiry: Date.now() + 3600000,
//         }
//       );
//     } else if (emailType === "RESET") {
//       await User.findByIdAndUpdate(
//         //if we find these id
//         userId,

//         //then upade these values
//         {
//           forgotPasswordToken: hashedToken,
//           forgotPasswordTokenExpiry: Date.now() + 3600000,
//         }
//       );
//     }

//     const transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "233310b4714588",
//         pass: "7b5d1e91ab7f42",
//       },
//     });

//     const mailOption = {
//       from: "akshatjangid1310@gmail.com",
//       to: email,
//       subject:
//         emailType === "VERIFY"
//           ? "Verify Your email , password"
//           : "Reset your password",
//       html: `<p>Click <a href="${
//         process.env.DOMAIN
//       }/verifyemail?token=${hashedToken}">here</a> to ${
//         emailType === "VERIFY" ? "verify your email" : "reset your password"
//       }
//       or copy and paste the link below in your browser. <br>
//       ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
//       </p>`,
//     };

//     const mailresponse = await transport.sendMail(mailOption);
//     return mailresponse;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "233310b4714588",
        pass: "7b5d1e91ab7f42",
      },
    });

    const mailOptions = {
      from: "hitesh@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
