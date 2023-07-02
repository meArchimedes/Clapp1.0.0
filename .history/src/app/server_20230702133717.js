const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const uuid = require('uuid');

// Route for sending the password reset email
router.post('/reset-password', (req, res) => {
  const { email } = req.body;

  // Generate a unique code/token (e.g., UUID) for password reset
  const resetCode = uuid.v4();

  // Store the code/token in your database associated with the user's email
  // Here, you would typically save the code/token to a user document in MongoDB

  // Send the password reset email
  const transporter = nodemailer.createTransport({
    // Configure your email provider details here
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: http://example.com/reset-password/${resetCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending reset email:', error);
      // Handle error, such as sending an error response
      return res.status(500).json({ error: 'Failed to send reset email' });
    }
    console.log('Reset email sent:', info.response);
    // Handle success, such as sending a success response
    return res.status(200).json({ message: 'Reset email sent' });
  });
});

module.exports = router;
