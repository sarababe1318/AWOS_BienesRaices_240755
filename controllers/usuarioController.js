import {check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'
import {generarToken} from '../lib/tokens.js'
import {emailRegistro} from '../lib/emails.js'

const formularioLogin = (req, res) => {
     res.render("auth/login", {
        pagina: "Inicia sesión",
        csrfToken: req.csrfToken()
    });
}

const formularioRegistro = (req, res) => {
    res.render("auth/registro", {
        pagina: "Registrate con nosotros :)",
        csrfToken: req.csrfToken()
    });
}

const registrarUsuario = async(req, res) => {
    console.log("Intentando registrar a un Usuario Nuevo con los datos del formulario:");
    console.log(req.body);

    const {nombreUsuario: name, emailUsuario: email, passwordUsuario: password} = req.body;

    // Validación de los datos del formulario
    await check('nombreUsuario').notEmpty().withMessage("El nombre no puede ser vacío").run(req);
    await check('emailUsuario').notEmpty().withMessage("El correo no puede ser vacío").isEmail().withMessage("El correo no tiene un formato adecuado").run(req);
    await check('passwordUsuario').notEmpty().withMessage("La contraseña no puede estar vacía").isLength({ min: 8, max: 30 }).withMessage("La contraseña debe tener entre 8 y 30 caracteres").run(req);
    await check('confirmacionUsuario').equals(password).withMessage("Ambas contraseñas deben ser iguales").run(req);

    // Aplicar las reglas definidas
    let resultadoValidacion = validationResult(req);

    // Si hay errores de validación, regresar al formulario
    if(!resultadoValidacion.isEmpty()) {
        return res.render("auth/registro", {
            pagina: "Error al intentar crear una cuenta.",
            csrfToken: req.csrfToken(),
            errores: resultadoValidacion.array(),
            usuario: {
                nombreUsuario: name,
                emailUsuario: email
            }
        });
    }

    // Verificar si el usuario ya está registrado
    const existeUsuario = await Usuario.findOne({ where: { email } });

    if(existeUsuario) {
        return res.render("auth/registro", {
            pagina: "Registrate con nosotros :)",
            csrfToken: req.csrfToken(),
            errores: [{ msg: `Ya existe un usuario asociado al correo: ${email}` }],
            usuario: {
                nombreUsuario: name,
                emailUsuario: email
            }
        });
    }

    // Crear el usuario en la BD
    const data = {
        name,
        email,
        password,
        token: generarToken()
    };

    const usuario = await Usuario.create(data);

    // Enviar correo de confirmación
    emailRegistro({
        nombre: usuario.name,
        email: usuario.email,
        token: usuario.token
    });

    return res.render("templates/mensaje", {
        title: "¡Bienvenid@ a BienesRaíces!",
        msg: `La cuenta asociada al correo: ${email} se ha creado exitosamente. Por favor confirma tu cuenta a través del correo que te hemos enviado.`
    });
}

const paginaConfirmacion = async(req, res) => {
    const {token: tokenCuenta} = req.params;
    console.log("Confirmando la cuenta con token:", tokenCuenta);

    const usuarioToken = await Usuario.findOne({ where: { token: tokenCuenta } });

    if(!usuarioToken) {
        return res.render("templates/mensaje", {
            title: "Error al confirmar la cuenta",
            msg: `El código de verificación no es válido, por favor inténtalo de nuevo.`
        });
    }

    // Actualizar el usuario como confirmado
    usuarioToken.token = null;
    usuarioToken.confirmed = true;
    await usuarioToken.save();

    return res.render("templates/mensaje", {
        title: "Confirmación exitosa",
        msg: `La cuenta de: ${usuarioToken.name}, asociada al correo: ${usuarioToken.email} ha sido confirmada. Ya puedes ingresar a la plataforma.`
    });
}

const formularioRecuperacion = (req, res) => {
    res.render("auth/recuperarPassword", {
        pagina: "Te ayudamos a restaurar tu contraseña",
        csrfToken: req.csrfToken()
    });
}

export { formularioLogin, formularioRegistro, registrarUsuario, formularioRecuperacion, paginaConfirmacion }