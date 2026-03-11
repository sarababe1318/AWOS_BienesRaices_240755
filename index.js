import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js';
import { connectDB } from './config/db.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import csurf from '@dr.pogodin/csurf';

const app = express();
const PORT = process.env.PORT ?? 40497;

// 1️⃣ Primero el template engine y archivos estáticos
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('Public'));

// 2️⃣ Luego los parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// 3️⃣ Luego la sesión
app.use(session({
    secret: process.env.SESSION_SECRET || "PC-BienesRaices_240755_csrf_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    }
}));

// 4️⃣ Luego CSRF
app.use(csurf());
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

// 5️⃣ Al final las rutas (solo una vez con /auth)
app.use("/auth", usuarioRoutes);

// 6️⃣ Manejo de error CSRF
app.use((err, req, res, next) => {
    if (err.code === "EBADCSRFTOKEN") {
        return res.status(403).render("templates/mensaje", {
            pagina: "Error de Seguridad",
            title: "Error CSRF",
            msg: "El formulario expiró o fue manipulado. Recarga la página"
        });
    }
    next(err);
});

// 7️⃣ Conectar BD e iniciar servidor
await connectDB();
app.listen(PORT, () => {
    console.log(`El servidor está iniciado en el puerto ${PORT}`);
});