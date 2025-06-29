import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Email sent successfully:", response);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error(`Failed to send verification email: ${error}`);
    }
}
export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Welcome to Passport Buddy!",
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
            category: "Welcome Email",
            attachments: [{
                filename: 'favicon.png',
                path:  '../frontend/assets/favicon.png', 
                cid: 'favicon'
            }]
        });

        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error(`Error sending welcome email`, error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};