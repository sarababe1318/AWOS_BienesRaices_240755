import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// 1. Corregido: .config() en lugar de .congif()
dotenv.config();

const {
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_DIALECT,
    NODE_ENV
} = process.env;

const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD, // 2. Corregido: Agregada la coma que faltaba aquí
    {
        host: DB_HOST,
        port: Number(DB_PORT) || 3306, // 3. Recomendado: Convertir a número
        dialect: DB_DIALECT || "mysql",

        logging: NODE_ENV === "development" ? console.log : false,

        define: {
            timestamps: true,
            underscored: false,
            freezeTableName: true
        },

        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

        dialectOptions: {
            charset: "utf8mb4"
        },
        timezone: "-06:00" 
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✔️ Conexión a MySQL establecida correctamente");
    } catch (error) {
        console.error("✖️ Error conectando a la BD:", error);
        process.exit(1);
    }
};

export default sequelize;