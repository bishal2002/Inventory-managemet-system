const nodemailer = require('nodemailer');

/*
name        : name of the user who will get the mail,
email       : recievers email through wich user is registerd to the system,
passsword   : password of the user if required to share with user
mailFor     : this field is mendatory to address why this funtion is going to be used
                value allowd : 'create' || 'reset'
*/

const styles = {
    "main"        : "padding : 1.4rem; background-color: ghostwhite;",
    "flex-center" : "display: flex; align-items: center; justify-content:center;",
    "box"         : "padding : 1.2rem; flex-direction:column; background-color:",
    "pre"         : "font-size: 1rem; font-family: `'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`;",
    "heading"     : "color :rgb(77, 76, 76); font-size: 1.4rem; font-weight: 600; font-family : 'Arial, Helvetica, sans-serif';",
}

const subjectFormat = {
    create : 'Welcome to Inventory Management App',
    reset  : 'Inventory Management App : reset password'
}

const sendMail = ( name, email, password, mailFor ) =>{
    const messageFormat = {
        create : `Hi ${name}, your account has been created for the Inventory Management app, your credential for the app is,<br>
                    email - <b>${email}</b><br>
                    password - <b>${password}</b><br>
                    Activate your account using the given credential.<br><br>
                    thanks,<br>
                    Antino Bussiness solution`,

        reset  : `Hi ${name}! we heard that you lost your Inventory App password.<br>
                    Sorry about that! But don't worry you can use this following credential to reset your password.<br>
                    id - ${email}<br>
                    password - ${password}<br>
                    we are looking forward, hope you will join us soon.<br><br>
                    thanks,<br>
                    The Antino Bussiness Solution`
    }

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    const mailoption = {
        from    : 'padhanbishal261@gmail.com',
        to      : email,
        subject : subjectFormat[mailFor],
        html    :`  <div style="${styles['flex-center']} ${styles['main']}">
                        <div style = "${styles['box']}">
                            <img src="https://antino-web.s3.ap-south-1.amazonaws.com/images/images/Antinologo2021darkfinal.png" width="200">
                            <h2 style="${styles['heading']}">
                                ${subjectFormat[mailFor]}
                            </h2>
                            <p style="${styles['pre']}">
                                ${messageFormat[mailFor]}
                            </p>
                        </div>
                    </div> `
    };

    transporter.sendMail(mailoption,(err,info)=>{
        if(err)
            return err;
        else
            return info;
    });
}
module.exports = sendMail;

