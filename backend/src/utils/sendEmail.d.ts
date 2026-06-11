declare const sendEmail: (options: {
    email: string;
    subject: string;
    message: string;
    html?: string;
    replyTo?: string;
}) => Promise<void>;
export default sendEmail;
//# sourceMappingURL=sendEmail.d.ts.map