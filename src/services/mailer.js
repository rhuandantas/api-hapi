const nodemailer = require("nodemailer");
const { props } = require("./../config/index");

const transporter = nodemailer.createTransport(props.mail.transporter);

const sendMail = async (to, token) => {
    try {
        const info = await transporter.sendMail({
            from: props.mail.from,
            to,
            subject: `Recuperação de senha`,
            text: `This is code to reset your password: ${token}`,
        });
        console.log(`Mail sent sucessfully! \n ${JSON.stringify(info)}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    sendMail
}