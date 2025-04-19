import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use TLS
    auth: {
      user: 'badukoolu@gmail.com',
      pass: 'ptsmeetpyvlaciot', // App Password
    },
  });

  try {
    await transporter.verify(); // check SMTP connection
    console.log('SMTP verified');

    await transporter.sendMail({
      from: '"X4 eSports Monitor" <badukoolu@gmail.com>', // must match Gmail
      to: 'badukoolu@gmail.com',
      subject: 'Monitor Test',
      text: 'This is a test email to verify Gmail SMTP is working.',
    });

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(500).send('Email failed to send');
  }
}
