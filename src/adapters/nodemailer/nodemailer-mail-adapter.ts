import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e4acdf2927cd62",
    pass: "b8ba0311260469"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Matheus Eufrásio <matheuseufrasio2@gmail.com>',
      subject,
      html: body,
    })
  };
}