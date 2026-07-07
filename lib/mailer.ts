import "server-only";
import nodemailer from "nodemailer";

let transport: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST) return null;

  if (!transport) {
    transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT ? Number(SMTP_PORT) : 587,
      secure: Number(SMTP_PORT) === 465,
      auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    });
  }
  return transport;
}

export async function sendOtpEmail(to: string, code: string) {
  const smtp = getTransport();

  if (!smtp) {
    console.log(`[dev] SMTP not configured — verification code for ${to}: ${code}`);
    return;
  }

  const from = process.env.SMTP_FROM || "Admin <admin@localhost>";

  await smtp.sendMail({
    from,
    to,
    subject: "Your admin verification code",
    text: `Your verification code is ${code}. It expires in 5 minutes. If you did not request this, ignore this email.`,
    html: `<p>Your verification code is <strong style="font-size:1.25em; letter-spacing:0.1em;">${code}</strong>.</p><p>It expires in 5 minutes. If you did not request this, ignore this email.</p>`,
  });
}
