const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const uuid = require('uuid');
const serviceAccount = require('./path/to/serviceAccountKey.json');

// Initialize Firebase admin SDK
admin.initializeApp({
  // Add your Firebase admin SDK configuration here
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://clapp-368121-70341.firebaseio.com/',
});

// Route for sending the password reset email
app.post('/api/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Generate a unique code/token (e.g., UUID) for password reset
    const resetCode = uuid.v4();

    // Update the user's reset code/token in the Firebase database
    await admin.database().ref('users').child(email.replace('.', '_')).update({ resetCode });

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

    await transporter.sendMail(mailOptions);

    console.log('Reset email sent');
    return res.status(200).json({ message: 'Reset email sent' });
  } catch (error) {
    console.error('Error sending reset email:', error);
    return res.status(500).json({ error: 'Failed to send reset email' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
