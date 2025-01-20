const cron = require('node-cron');

const scheduleEmail = () => cron.schedule('* * * * *', () => {
    console.log('Task is running every minute');
});

module.exports = scheduleEmail;