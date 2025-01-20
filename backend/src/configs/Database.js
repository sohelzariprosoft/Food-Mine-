const { default: mongoose } = require('mongoose');

const DbCon = () => {
    mongoose.connect(process.env.MONGO_URI).then((data) => {
        console.log('Connected to DB');
    }).catch(err => {
        console.log(err);
        process.exit(1);
    })
}

module.exports = DbCon;