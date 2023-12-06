const nodemailer = require('nodemailer');

//3. cofigure mail and send it
const sendMail= async(req,res)=>{

    const {text} = req.body;

    //1. create an email transporter.
    //SMTP (Simple Mail Transfer Protocol)
   const transporter =  nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.USER,
            pass: process.env.PASS
        }
    })


    //2.configure email content.
    const mailOptions = {
        from:'khawsemanthan246@gmail.com',
        to: 'medhanshkhawse123@gmail.com',
        subject: 'Welcome to NodeJS App',
        text: text,
    }

    //3. send email
    try {
       const result = await transporter.sendMail(mailOptions);
       console.log('Email sent successfully')
       return res.status(201).json({message:"email sent successfully" , result})
    } catch (error) {
        console.log('Email send failed with error:', error)
    }
}

sendSMS = (req,res)=>{
    console.log("msg");
}

module.exports = {sendSMS , sendMail};


