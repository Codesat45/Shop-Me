import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config(); // Load environment variables

const transporter = nodemailer.createTransport({
    service: "gmail",
    
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,


    },
});

// Quick connectivity/auth check on startup (logs errors if any)
transporter.verify((error) => {
    if (error) {
        console.error("SMTP verification failed:", error.message);
    } else {
        console.log("SMTP verification succeeded");
    }
});

export default transporter;
