const { validationResult, body } = require('express-validator');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

exports.validateContact = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
];

exports.submitContact = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, subject, message } = req.body;

        // Save to database
        const contact = new Contact({ name, email, subject, message });
        await contact.save();

        // Respond immediately — don't wait for email
        res.status(201).json({ message: 'Message sent successfully! I will get back to you soon.' });

        // Send email in background (fire-and-forget)
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS &&
            process.env.EMAIL_USER !== 'your_gmail@gmail.com') {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_TO || process.env.EMAIL_USER,
                replyTo: email,
                subject: `Portfolio Contact: ${subject}`,
                html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #6c63ff; border-bottom: 2px solid #6c63ff; padding-bottom: 10px;">New Portfolio Contact</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px; font-weight: bold; color: #333;">Name:</td><td style="padding: 10px;">${name}</td></tr>
                <tr style="background: #f8f9fa;"><td style="padding: 10px; font-weight: bold; color: #333;">Email:</td><td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 10px; font-weight: bold; color: #333;">Subject:</td><td style="padding: 10px;">${subject}</td></tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <p style="font-weight: bold; color: #333; margin-bottom: 8px;">Message:</p>
                <p style="color: #555; line-height: 1.6;">${message}</p>
              </div>
              <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #999; text-align: center;">Sent from your Portfolio Website contact form</p>
            </div>
          `
            }).then(result => {
                console.log('Email sent:', result.messageId);
            }).catch(err => {
                console.log('Email failed:', err.message);
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
