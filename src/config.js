import dotenv from 'dotenv';

dotenv.config({path:"./src/.env"});

export default { 
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD
}