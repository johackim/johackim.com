import fs from 'fs';
import jwt from 'jsonwebtoken';
import { v5 as uuidv5 } from 'uuid';
import mjml2html from 'mjml';
import nodemailer from 'nodemailer';

export const LOGIN_TEMPLATE = 'login';
export const SUBSCRIBE_TEMPLATE = 'subscribe';

export const sendMail = async (html, subject, email) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        subject,
        html,
    };

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SMTP_HOST,
        port: process.env.EMAIL_SMTP_PORT,
        auth: {
            user: process.env.EMAIL_SMTP_USER,
            pass: process.env.EMAIL_SMTP_PASSWORD,
        },
    });

    await transporter.sendMail({ ...mailOptions, to: email }).catch(({ message }) => {
        console.error(message); // eslint-disable-line
        throw new Error('Internal Server Error');
    });
};

export const sendTemplateMail = async (email, template) => {
    const id = uuidv5(email, uuidv5.URL);
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id, email }, secret, { expiresIn: process.env.JWT_TOKEN_TTL || '30d' });

    if (template === LOGIN_TEMPLATE) {
        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/login?token=${token}`;
        const subject = 'Lien de connexion sécurisé';
        const loginTemplate = fs.readFileSync(`${process.cwd()}/lib/login.mjml`, 'utf8').replace(/{{URL}}/g, url);
        const { html } = mjml2html(loginTemplate);
        await sendMail(html, subject, email);
    }

    if (template === SUBSCRIBE_TEMPLATE) {
        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/login?token=${token}`;
        const subject = 'Inscription réussi';
        const subscribeTemplate = fs.readFileSync(`${process.cwd()}/lib/subscribe.mjml`, 'utf8')
            .replace(/{{TELEGRAM}}/g, process.env.TELEGRAM_INVITATION_LINK)
            .replace(/{{SECOND_BRAIN_URL}}/g, process.env.SECOND_BRAIN_URL)
            .replace(/{{URL}}/g, url);
        const { html } = mjml2html(subscribeTemplate);
        await sendMail(html, subject, email);
    }
};
