const formularioLogin = (req, res) => {
     res.render("auth/login");
}

const formularioRegistro = (req,res) =>
{
    res.render("auth/registro");
}
const formularioRecuperacion = (req, res) => {
    res.render("auth/recuperarPassword", {pagina: "Te ayudamos a recuperar tu contraseña"});
}


export { formularioLogin, formularioRegistro,formularioRecuperacion}