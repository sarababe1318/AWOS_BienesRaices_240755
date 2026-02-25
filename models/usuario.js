import { DataTypes } from "sequelize";
import db from "../config/db.js"
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const Usuario = db.define('Usuario',{
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:
        {
            notEmpty:{
                msg: 'El nombre es obligatorio'}
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
            msg: 'El email ya está registrado'
        },
        validate:{
            isEmail:{
                msg:'Debe proporcionar un email valido'
            },
            notEmpty:{
                msg: 'El email no puede estar vacio'
            }
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'La contraseña es obligatoria'
            },  
            len:{
                args: [8, 100],
                msg: 'La contraseña debe tener al menos 6 caracteres'
            }
        }
    },
    confirmed:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
       
    },
    tokenRecovery:{
        type: DataTypes.STRING(255),
        allowNull: true,   
        field: 'token_recovery' 

    },
    tokenExpiration:{
        type: DataTypes.DATE,
        allowNull: true,
        field: 'token_expiration'
    },
    regStatus:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'reg_status'
    },
    lastLogin:{
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_login'
    }
},
    {
        tableName: 'tb_users',
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at' ,


        hooks: {
            //hash de contraseña antes de crear
            beforeCreate:async (Usuario) =>{
                if(Usuario.password){
                    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
                    Usuario.password = await bcrypt.hash(Usuario.password, salt );
                }
            },
            //antes de actualizar 
            beforeUpdate: async (Usuario) =>{
                if (Usuario.changed('password')){
                    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
                    Usuario.password = await bcrypt.hash(Usuario.password, salt );
                }
            }
    }
}
)
    


export default Usuario;