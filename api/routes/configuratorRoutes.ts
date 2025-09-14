import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// POST /api/configurator - Send configurator results email
router.post('/', async (req, res) => {
  try {
    const { 
      userAnswers, 
      recommendations, 
      totalPrice, 
      userEmail, 
      userName, 
      userPhone 
    } = req.body;

    // Validate required fields
    if (!recommendations || !Array.isArray(recommendations)) {
      return res.status(400).json({
        success: false,
        error: 'Konfigurācijas rezultāti ir nepieciešami'
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Process recommendations for email
    const netstationLicenses = recommendations.filter((r: any) => 
      ['netstation_4', 'netstation_enterprise_4'].includes(r.product.id)
    );
    
    const addons = recommendations.filter((r: any) => 
      r.product.category === 'license' && 
      !['netstation_4', 'netstation_enterprise_4'].includes(r.product.id)
    );

    const totalNetstationLicenses = netstationLicenses.reduce((sum: number, license: any) => sum + license.quantity, 0);

    // Format user answers for email
    const answersText = userAnswers ? Object.entries(userAnswers)
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
      .join('\n') : 'Nav pieejami';

    // Format recommendations for email
    let recommendationsHtml = '';
    let recommendationsText = '';

    // Base licenses
    if (netstationLicenses.length > 0) {
      const primaryNetstation = netstationLicenses[0];
      const licensePrice = netstationLicenses.reduce((sum: number, license: any) => sum + license.totalPrice, 0);
      
      recommendationsHtml += `
        <h4 style="color: #92400e; margin-top: 15px; margin-bottom: 10px;">Pamata licence${totalNetstationLicenses > 1 ? 's' : ''}</h4>
        <div style="background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #fed7aa; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong style="color: #451a03;">${totalNetstationLicenses > 1 ? `${totalNetstationLicenses}x ` : ''}${primaryNetstation.product.name}</strong><br>
            <span style="color: #78716c;">${primaryNetstation.product.description}</span><br>
            <span style="color: #92400e; font-size: 14px;">
              ${totalNetstationLicenses > 1 
                ? `${totalNetstationLicenses} licences nepieciešamas lielajam kameru skaitam`
                : primaryNetstation.reason
              }
            </span>
          </div>
          <div style="text-align: right;">
            <strong style="color: #451a03;">€${licensePrice}</strong>
          </div>
        </div>
      `;

      recommendationsText += `\nPamata licence${totalNetstationLicenses > 1 ? 's' : ''}:\n`;
      recommendationsText += `- ${totalNetstationLicenses > 1 ? `${totalNetstationLicenses}x ` : ''}${primaryNetstation.product.name}\n`;
      recommendationsText += `  ${primaryNetstation.product.description}\n`;
      recommendationsText += `  €${licensePrice}\n`;
    }

    // Add-on licenses
    if (addons.length > 0) {
      recommendationsHtml += `<h4 style="color: #92400e; margin-top: 15px; margin-bottom: 10px;">Papildu licences (${addons.length})</h4>`;
      recommendationsText += `\nPapildu licences (${addons.length}):\n`;

      addons.forEach((addon: any) => {
        recommendationsHtml += `
          <div style="background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #fed7aa; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="color: #451a03;">${addon.product.name}</strong><br>
              <span style="color: #78716c;">${addon.product.description}</span><br>
              <span style="color: #92400e; font-size: 14px;">${addon.reason}</span>
            </div>
            <div style="text-align: right;">
              <strong style="color: #451a03;">€${addon.totalPrice}</strong>
            </div>
          </div>
        `;

        recommendationsText += `- ${addon.product.name}\n`;
        recommendationsText += `  ${addon.product.description}\n`;
        recommendationsText += `  €${addon.totalPrice}\n`;
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'knn.lv - Jauns konfiguracijas pieprasījums',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: #ffffff;">
          <h2 style="color: #1f2937; margin-bottom: 30px; border-bottom: 3px solid #dc2626; padding-bottom: 10px;">
            Jauns videonovērošanas konfigurācijas pieprasījums
          </h2>
          
          ${userName || userEmail || userPhone ? `
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
              <h3 style="color: #374151; margin-top: 0; margin-bottom: 15px;">Klienta informācija:</h3>
              ${userName ? `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                  <div>
                    <strong style="color: #1f2937;">Vārds:</strong><br>
                    <span style="color: #4b5563; font-size: 16px;">${userName}</span>
                  </div>
                </div>
              ` : ''}
              ${userEmail ? `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                  <div>
                    <strong style="color: #1f2937;">E-pasts:</strong><br>
                    <span style="color: #4b5563; font-size: 16px;">${userEmail}</span>
                  </div>
                </div>
              ` : ''}
              ${userPhone ? `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                  <div>
                    <strong style="color: #1f2937;">Tālrunis:</strong><br>
                    <span style="color: #4b5563; font-size: 16px;">${userPhone}</span>
                  </div>
                </div>
              ` : ''}
            </div>
          ` : ''}

          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0; margin-bottom: 15px;">Konfigurācijas rezultāti:</h3>
            ${recommendationsHtml}
          </div>

          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
            <h3 style="color: #059669; margin-top: 0; margin-bottom: 15px;">Orientējošā cena (licences): €${totalPrice || 0}</h3>
            <p style="color: #065f46; font-size: 14px; margin: 5px 0 0 0;">
              *Cena attiecas tikai uz licencēm. Kameras un serveri tiks piedāvāti pēc detalizētas specifikācijas.
            </p>
          </div>

          <div style="background: #ede9fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6;">
            <h3 style="color: #6b21a8; margin-top: 0; margin-bottom: 15px;">Klienta atbildes uz jautājumiem:</h3>
            <div style="background: #ffffff; padding: 15px; border-radius: 6px; border: 1px solid #c4b5fd;">
              <pre style="white-space: pre-wrap; font-family: monospace; font-size: 12px; color: #581c87; margin: 0;">${answersText}</pre>
            </div>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-style: italic; text-align: center; margin: 20px 0;">
            Šis pieprasījums ir nosūtīts no KNN mājaslapas Alnet konfigurātora.
          </p>
        </div>
      `,
      text: `
        Jauns videonovērošanas konfigurācijas pieprasījums

        ${userName || userEmail || userPhone ? `
Klienta informācija:
${userName ? `Vārds: ${userName}\n` : ''}${userEmail ? `E-pasts: ${userEmail}\n` : ''}${userPhone ? `Tālrunis: ${userPhone}\n` : ''}
        ` : ''}

Konfigurācijas rezultāti:
${recommendationsText}

Orientējošā cena (licences): €${totalPrice || 0}
*Cena attiecas tikai uz licencēm. Kameras un serveri tiks piedāvāti pēc detalizētas specifikācijas.

Klienta atbildes uz jautājumiem:
${answersText}

---
Šis pieprasījums ir nosūtīts no KNN mājaslapas Alnet konfigurātora.
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Konfigurācijas rezultāti ir veiksmīgi nosūtīti! Mēs sazināsimies ar jums drīzumā ar detalizētu piedāvājumu.'
    });

  } catch (error) {
    console.error('Error sending configurator email:', error);
    res.status(500).json({
      success: false,
      error: 'Neizdevās nosūtīt konfigurācijas rezultātus. Lūdzu, mēģiniet vēlāk vai sazinieties ar mums tieši pa e-pastu.'
    });
  }
});

export default router;
