import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface MailOptions {
    to: string
    subject: string
    text: string
}

@Injectable()
export default class MailService {

    static sendMessage(options: MailOptions): void {
        const transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            }
        })

        const mailOptions = {
            from: process.env.MAIL_USER,
            ...options
        }

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                //TODO::добавить логи
                console.log('Ошибка', err)
            } else {
                console.log('Письмо отправлено')
            }
        })
    }
}
