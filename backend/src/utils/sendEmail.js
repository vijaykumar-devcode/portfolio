import nodemailer from 'nodemailer';
const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOptions = {
        from: `"Portfolio Platform" <${process.env.EMAIL_USER}>`,
        to: options.email,
        replyTo: options.replyTo,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };
    await transporter.sendMail(mailOptions);
};
export default sendEmail;
//# sourceMappingURL=sendEmail.js.map