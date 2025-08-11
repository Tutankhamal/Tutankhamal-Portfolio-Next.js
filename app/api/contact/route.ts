import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    // Create transporter (configure with your email service)
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || "noreply@tutankhamal.com",
      to: "contato@tutankhamal.com",
      subject: `Contato do Site: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00ffff;">Nova mensagem do site</h2>
          <div style="background: #111; padding: 20px; border-radius: 8px; border: 1px solid #00ffff;">
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Assunto:</strong> ${subject}</p>
            <div style="margin-top: 20px;">
              <strong>Mensagem:</strong>
              <div style="background: #0a0a0a; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 3px solid #00ffff;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
          </div>
        </div>
      `,
      text: `
        Nova mensagem do site
        
        Nome: ${name}
        Email: ${email}
        Assunto: ${subject}
        
        Mensagem:
        ${message}
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Email enviado com sucesso!" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
