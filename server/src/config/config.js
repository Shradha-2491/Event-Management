import dotenv from "dotenv";
dotenv.config();

const config = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
console.log("-----------------------", process.env.DATABASE_URL)

export default config;

