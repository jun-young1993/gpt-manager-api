import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default () => ({
    db: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
    },
    mailer: {
        host: process.env.NODEMAILER_HOST,
        port: Number(process.env.NODEMAILER_PORT),
        service: process.env.NODEMAILER_SERVICE,
        secure: process.env.NODEMAILER_SECURE,
        requireTLS: process.env.NODEMAILER_REQUIRE_TLS,
        debug: Boolean(process.env.NODEMAILER_DEBUG),
        logger: Boolean(process.env.NODEMAILER_LOGGER),
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        }
    }
} as unknown as {
    db : TypeOrmModuleOptions,
    mailer ?: string | SMTPTransport | SMTPTransport.Options
})