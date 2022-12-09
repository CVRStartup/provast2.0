import User from "../../../models/User";
import OTP from "../../../models/Otp";
import connectDB from "../../../src/lib/connectDB.js";
import otpGenerator from "otp-generator";
import crypto from "crypto";
import SibApiV3Sdk from "sib-api-v3-sdk";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getUserDetails(req, res);
      break;
    case "POST":
      await verifyUser(req, res);
      break;
    case "PUT":
      await updatePassword(req, res);
      break;
  }
}

var hashPwd = function hashPwd(pwd) {
  var hmac = crypto.createHmac("sha256", process.env.SALT);
  return hmac.update(pwd).digest("hex");
};

const updatePassword = async (req, res) => {
  try {
    await connectDB();
    const { email, password } = req.query;

    console.log(email);

    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

    const details = await User.findOneAndUpdate(
      { email },
      {
        salt,
        hash,
      },
      { new: true }
    );
    if (details) {
      return res.status(200).json({ message: "Password Updated", details });
    } else {
      return res.status(200).json({ message: "Something went wrong" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    await connectDB();
    const { otp, email } = req.query;

    const details = await OTP.findOne({ email }).sort({ _id: -1 }).limit(1);

    if (details) {
      if (details.otp == hashPwd(otp)) {
        return res.status(200).json({ message: "You have entered correct OTP" });
      } else {
        return res.status(200).json({ message: "Please enter correct OTP" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    await connectDB();
    const { email } = req.query;

    const details = await User.find({ email });

    if (details.length > 0) {
      const generatedOTP = otpGenerator.generate(8, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: true,
        specialChars: false,
      });

      let hashedOTP = hashPwd(generatedOTP);
      console.log(generatedOTP);
      const otp = new OTP({ email, otp: hashedOTP });
      await otp.save();

      var defaultClient = SibApiV3Sdk.ApiClient.instance;

      // Configure API key authorization: api-key
      var apiKey = defaultClient.authentications["api-key"];
      apiKey.apiKey =
        "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";

      // Uncomment below two lines to configure authorization using: partner-key
      // var partnerKey = defaultClient.authentications['partner-key'];
      // partnerKey.apiKey = 'YOUR API KEY';

      var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

      var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

      sendSmtpEmail = {
        to: [
          {
            email: email,
            name: `User`,
          },
        ],
        templateId: 1,
        params: {
          name: `User`,
          otp: generatedOTP,
        },
        headers: {
          "X-Mailin-custom": "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
          contentType: "application/json",
          accept: "application/json",
        },
      };

      apiInstance.sendTransacEmail(sendSmtpEmail).then(
        function (data) {
          console.log("API called successfully. Returned data: " + data);
        },
        function (error) {
          console.error(error);
        }
      );

      return res.status(200).json({ message: "OTP has sent to your email" });
    } else {
      return res.status(200).json({ message: "Details not found", details: undefined });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
