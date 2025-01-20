const twilio = require('twilio');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);;
const sendSMSMessage = (body, to) => {
    console.log(accountSid);
    client.messages
        .create({
            body: body,
            from: '+12184527665', // Your Twilio phone number
            to: to   // Recipient's mobile number
        })
        .then(message => console.log(`Message sent: ${message.sid} to ${to}`))
        .catch(error => console.error('Error:', error));
}
module.exports = sendSMSMessage;