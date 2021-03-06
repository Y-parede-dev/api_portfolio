const nodemailer = require('nodemailer');  
const dotenv = require('dotenv');
const {google} = require('googleapis');
dotenv.config();
exports.sendMailInside = (req, res, next) => {
    const data = req.body;
    const oAuth2Client = new google.auth.OAuth2(process.env.MAIL_CLIENT_ID, process.env.MAIL_CLIENT_SECRET, process.env.REDIRECT_URI)
    oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});
    async function sendMail() {
        try{
            const accesToken = await oAuth2Client.getAccessToken();
            const transport = nodemailer.createTransport({
                service:'gmail',
                auth: {
                    type:'OAuth2',
                    user:'magin.code@gmail.com',
                    clientId: process.env.MAIL_CLIENT_ID,
                    clientSecret: process.env.MAIL_CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: accesToken
                }
            })
            const mailOptions = {
                from:`MAGIN CODE ✔️🌐 <${data.email}>`,
                to:'magin.code@gmail.com',
                subject: data.objet,
                text: data.contenu,
                html: `<b>Contact Nom</b>:      🙋‍♂️ ${data.nom} 
                    <br/><b>Contact Email</b>:  📧 ${data.email}
                    <br/><b>Contact Sujet</b>:  🧭 ${data.objet} 
                    <br/><br/> <p style="color:#2271DF;font-size:1.3rem">${data.contenu}</p>` // html body  
            };
            const result = await transport.sendMail(mailOptions);
            return result;
        } catch(error){
            return error;
        }
    }
    sendMail()
        .then(result=>{console.log('email send ... ', result);res.status(200).json({message:" mail send"})})
        .catch(error=>{console.log('email dont send ... ', error.message);res.status(400).json({message:" mail dont send", ERROR: error.message})})
}
 