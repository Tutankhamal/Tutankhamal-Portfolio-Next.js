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
    const port = Number.parseInt(process.env.SMTP_PORT || "587")
        const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || "tutankhamal@zohomail.com",
      to: "tutankhamal@zohomail.com",
      subject: `Contato do Site: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; background: #0a0a0a; color: #f0f0f0; border: 1px solid #00ffff; border-radius: 8px; overflow: hidden;">
          <h2 style="background: #111; color: #00ffff; margin: 0; padding: 20px; text-align: center;">Nova Mensagem do Site</h2>
          <div style="padding: 20px;">
            <p style="margin: 10px 0;"><strong>Nome:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #00ffff; text-decoration: none;">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Assunto:</strong> ${subject}</p>
            <p style="margin: 10px 0;"><strong>Mensagem:</strong></p>
            <pre style="background: #000; padding: 15px; border-radius: 4px; border: 1px solid #333; color: #f0f0f0; white-space: pre-wrap; word-wrap: break-word; font-family: monospace;">${message}</pre>
          </div>
          <p style="background: #111; text-align: center; color: #888; font-size: 12px; margin: 0; padding: 15px;">Este é um e-mail automático enviado pelo formulário de contato.</p>
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
