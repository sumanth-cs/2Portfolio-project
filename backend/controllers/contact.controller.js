import nodemailer from 'nodemailer';
import { getBioByUserId } from '../models/bio.model.js';

// Create a transporter for sending emails (configure with your email service)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required',
      });
    }

    const adminBio = await getBioByUserId(); 
    
    if (!adminBio || !adminBio.email) {
      return res.status(400).json({
        success: false,
        message: 'Admin email not configured',
      });
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: adminBio.email, // Send to admin's email from bio
      subject: `New Contact Message from ${name}`,
      text: `
        You have received a new message from your portfolio contact form:
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h1>New Contact Message</h1>
        <p>You have received a new message from your portfolio contact form:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Message:</strong> ${message}</li>
        </ul>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message,
    });
  }
};