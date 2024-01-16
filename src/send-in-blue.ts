import nodemailer from "nodemailer"

type SendMailParams = {
  to: string,
  subject: string,
  text: string
}

export async function sendEmail({to, subject, text}: SendMailParams): Promise<boolean> {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME, // generated ethereal user
      pass: process.env.SMTP_PASSWORD // generated ethereal password
    }
  })

  try {
    let info = await transporter.sendMail({
      from: "\"My Solar Edge Monitor\" noreply@mysolaredgemonitor.dev",
      to,
      subject,
      text
    })
  }
  catch (error) {
    console.log(error)
    return false;
  }

  return true;
}
