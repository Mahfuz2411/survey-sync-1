import dotenv from 'dotenv';
dotenv.config();

export const DB_URI = process.env.DB_URI;
export const PORT = process.env.PORT;
export const ADMIN=process.env.ADMIN;
export const USER=process.env.USER;
export const SURVEYOR=process.env.SURVEYOR;
export const SALT_ROUNDS=process.env.SALT_ROUNDS;

// console.log(DB_URI)
