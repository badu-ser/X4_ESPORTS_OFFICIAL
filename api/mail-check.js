import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'badukoolu@gmail.com',
      pass: 'ptsmeetpyvlaciot',
    },
  });

  try {
    await transporter.sendMail({
      from: '"X4 eSports - Authentication" <auth@x4esports.42web.io>',
      to: 'badukoolu@gmail.com',
      subject: 'Monitor Test',
      text: 'Email is working!',
    });

    res.status(200).send('Email sent');
  } catch (error) {
    console.error('Email failed:', error);
    res.status(500).send('Email failed');
  }
}
