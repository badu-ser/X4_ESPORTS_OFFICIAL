import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Good practice: only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  // Set up the transporter with your InfinityFree email SMTP settings
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your actual SMTP host
    port: 587,             // Or 587 if your server uses TLS
    secure: false,          // true for 465, false for 587
    auth: {
      user: 'auth@x4esports.42web.io',
      pass: 'ptsmeetpyvlaciot',
    },
  });

  try {
    // Send a test email
    await transporter.sendMail({
      from: '"X4 eSports Monitor" <auth@x4esports.42web.io>',
      to: 'badukoolu@gmail.com',
      subject: 'Monitor Test',
      text: 'This is a test email to check if SMTP is working correctly.',
    });

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
    res.status(500).send('Email sending failed');
  }
}
