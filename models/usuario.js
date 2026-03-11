import { DataTypes, Op } from "sequelize";
import db from "../config/db.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const Usuario = db.define("Usuario", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El nombre no puede ser vacío"
            }
        }
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
            msg: "El email ya está registrado"
        },
        validate: {
            isEmail: {
                msg: "Debe proporcionar un email válido"
            },
            notEmpty: {
                msg: "El email no puede estar vacío"
            }
        }
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "La contraseña no puede estar vacía"
            },
            len: {
                args: [8, 100],
                msg: "La contraseña debe tener al menos 8 caracteres"
            }
        }
    },

    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    token: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "token"
    },

    tokenExpiration: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "token_expiration"
    },

    regStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: "reg_status"
    },

    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "last_login"
    }

}, {
    tableName: "tb_users",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",

    hooks: {
        beforeCreate: async (usuario) => {
            if (usuario.password) {
                const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            }
        },

        beforeUpdate: async (usuario) => {
            if (usuario.changed("password")) {
                const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            }
        }
    }
});

// =======================
// MÉTODOS DE INSTANCIA
// =======================

Usuario.prototype.validarPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

Usuario.prototype.generarTokenRecuperacion = function () {
    const token = crypto.randomBytes(20).toString("hex");
    this.token = token;
    this.tokenExpiration = new Date(Date.now() + 3600000);
    return token;
};

Usuario.prototype.validarTokenRecuperacion = function (token) {
    return this.token === token && this.tokenExpiration > new Date();
};

Usuario.prototype.limpiarTokenRecuperacion = function () {
    this.token = null;
    this.tokenExpiration = null;
};

// =======================
// MÉTODOS ESTÁTICOS
// =======================

Usuario.findByEmail = function (email) {
    return this.findOne({
        where: { email }
    });
};

Usuario.findByTokenRecuperacion = function (token) {
    return this.findOne({
        where: {
            token,
            tokenExpiration: {
                [Op.gt]: new Date()
            }
        }
    });
};

export default Usuario;