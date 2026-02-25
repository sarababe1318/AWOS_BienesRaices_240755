import Usuario from "../models/usuario.js";

const formularioLogin = (req, res) => {
     res.render("auth/login");
}

const formularioRegistro = (req,res) =>
{
    res.render("auth/registro", {pagina:"Registrate con nosotros:)"});

}
const registrarUsuario =async (req,res)=>
{
    console.log("Intentando registrar a un usuario Nuevo con los datos del formulario:");
    console.log(req.body);
    const data=
    {
        name:req.body.nombreUsuario,
        email: req.body.emailUsuario,
        password: req.body.passwordUsuario
    }
    const usuario=await Usuario.create(data);
    res.json(usuario)
}

const formularioRecuperacion = (req, res) => {
    res.render("auth/recuperarPassword", {pagina: "Te ayudamos a recuperar tu contraseña"});
}



export { formularioLogin, formularioRegistro,registrarUsuario,formularioRecuperacion}