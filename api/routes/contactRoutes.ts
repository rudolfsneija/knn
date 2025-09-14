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
        error: 'Visi obligātie lauki ir jāaizpilda (vārds, e-pasts, tēma, ziņojums)',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Nederīga e-pasta adrese',
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
      subject: `knn.lv - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #ffffff;">
          <h2 style="color: #1f2937; margin-bottom: 30px; border-bottom: 3px solid #dc2626; padding-bottom: 10px;">
            Jauns kontakta ziņojums no mājaslapas
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <h3 style="color: #374151; margin-top: 0; margin-bottom: 15px;">Klienta informācija:</h3>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
              <div>
                <strong style="color: #1f2937;">Vārds, uzvārds:</strong><br>
                <span style="color: #4b5563; font-size: 16px;">${name}</span>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
              <div>
                <strong style="color: #1f2937;">E-pasts:</strong><br>
                <span style="color: #4b5563; font-size: 16px;">${email}</span>
              </div>
            </div>
            ${
              phone
                ? `
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                <div>
                  <strong style="color: #1f2937;">Tālrunis:</strong><br>
                  <span style="color: #4b5563; font-size: 16px;">${phone}</span>
                </div>
              </div>
            `
                : ''
            }
          </div>

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0; margin-bottom: 15px;">Ziņojums:</h3>
            <div style="margin-bottom: 15px;">
              <strong style="color: #92400e;">Tēma:</strong>
              <span style="color: #451a03; font-size: 16px; margin-left: 10px;">${subject}</span>
            </div>
            <div style="background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #fed7aa;">
              <div style="color: #451a03; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-style: italic; text-align: center; margin: 20px 0;">
            Šis ziņojums ir nosūtīts no KNN mājaslapas kontakta formas.
          </p>
        </div>
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
      message: 'Ziņojums ir veiksmīgi nosūtīts! Mēs sazināsimies ar jums drīzumā.',
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({
      success: false,
      error:
        'Neizdevās nosūtīt ziņojumu. Lūdzu, mēģiniet vēlāk vai sazinieties ar mums tieši pa e-pastu.',
    });
  }
});

export default router;
