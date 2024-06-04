const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");

// Send Mail
router.post("/register", async (req, res) => {
  const { email, firstName, lastName, mobile, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "sunny@techtweekinfotech.com",
        pass: "Sunny@7493",
      },
    });

    const mailOptions = {
      from: "sunny@techtweekinfotech.com",
      to: "sunny@techtweekinfotech.com",
      subject: "Email From SkyDream Solutions",
      html: `
        <h1>Message Received</h1>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone Number:</b> ${mobile}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
        res.status(500).json({ status: 500, error: "Internal Server Error" });
      } else {
        console.log("Email sent:", info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});

module.exports = router;
