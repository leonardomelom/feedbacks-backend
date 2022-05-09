import { MailAdapter, SendMailData } from "../mail-sender";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d0ad51d33aca87",
    pass: "6391f115c271c6"
  }
});

export class NodeMailerMailSender implements MailAdapter {
 async sendMail({subject, body}: SendMailData){
  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to : 'Leonardo Melo <leonardomelom@outlook.com>',
    subject: subject,
    html:body
  })
  }
}