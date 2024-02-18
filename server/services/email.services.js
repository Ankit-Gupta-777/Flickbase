const nodeMailer = require('nodemailer');
const MailGen = require('mailgen');
require('dotenv').config();

let transporter = nodeMailer.createTransport({
    service:"Gmail",
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    } 
});

const registerEmail = async(userEmail,user)=>{
    try{
        const emailToken = user.generateRegisterToken();
        let mailGenerator = new MailGen({ //used to make theme of the EMAIL
            theme:'default',
            product:{
                name:'Flickbase',
                link:`${process.env.EMAIL_MAIN_URL}`
            }
        });
        const email = {
            body:{
                name:userEmail,//NAME OF THE USER
                intro:'Welcome to Flickbase!We\'r very excited to have you on board',//INTRO OF THE BODY
                action:{//CALL TO ACTION
                    instructions:'To Validate your account please CLICK the Button',
                    button:{
                        color:'#00f',
                        text:'Verify Your Account',
                        link:`${process.env.SITE_DOMAIN}verification?t=${emailToken}` 
                    }
                },
                outro:'Need help or have Questions?Verify your Account to get the Solutions'
            }
        }

        let emailBody = mailGenerator.generate(email);
        let message = {
            from:process.env.EMAIL,
            to:userEmail,
            subject:'Welcome to Flickbase',
            html:emailBody
        }

        await transporter.sendMail(message);
        return true;

    }catch(error){
        throw error;
    }


}

module.exports = {registerEmail};