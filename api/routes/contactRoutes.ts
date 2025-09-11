import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// POST /api/contact - Send contact form email
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Visi obligātie lauki ir jāaizpilda (vārds, e-pasts, tēma, ziņojums)'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Nederīga e-pasta adrese'
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Jauns ziņojums no mājaslapas: ${subject}`,
      html: `
        <h2>Jauns kontakta forma ziņojums</h2>
        <p><strong>Vārds, uzvārds:</strong> ${name}</p>
        <p><strong>E-pasts:</strong> ${email}</p>
        ${phone ? `<p><strong>Tālrunis:</strong> ${phone}</p>` : ''}
        <p><strong>Tēma:</strong> ${subject}</p>
        <p><strong>Ziņojums:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Šis ziņojums ir nosūtīts no KNN mājaslapas kontakta formas.</em></p>
      `,
      text: `
        Jauns kontakta forma ziņojums

        Vārds, uzvārds: ${name}
        E-pasts: ${email}
        ${phone ? `Tālrunis: ${phone}\n` : ''}
        Tēma: ${subject}

        Ziņojums:
        ${message}

        ---
        Šis ziņojums ir nosūtīts no KNN mājaslapas kontakta formas.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Ziņojums ir veiksmīgi nosūtīts! Mēs sazināsimies ar jums drīzumā.'
    });

  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({
      success: false,
      error: 'Neizdevās nosūtīt ziņojumu. Lūdzu, mēģiniet vēlāk vai sazinieties ar mums tieši pa e-pastu.'
    });
  }
});

export default router;
