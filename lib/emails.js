import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
    try {
        var transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const { email, nombre, token } = datos;

        await transport.sendMail({
            from: 'BienesRaices-240755.com',
            to: email,
            subject: 'Bienvenid@ a la Plataforma de Bienes Raíces - Confirma tu cuenta',
            html: `
                <p>Hola! ${nombre}, comprueba tu cuenta en bienesraices_240755.com</p>
                <hr>
                <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:</p>
                <a href="http://localhost:${process.env.PORT}/auth/confirma/${token}">
                    Confirmar Cuenta
                </a>
                <p>En caso de que no seas tú quien creó la cuenta, ignora este correo.</p>
            `
        });

        console.log("✅ Correo enviado a:", email);

    } catch (error) {
        console.error("❌ Error al enviar correo:", error);
    }
}

export { emailRegistro }