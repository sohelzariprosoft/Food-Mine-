const { parsePhoneNumberFromString } = require('libphonenumber-js');

const PhoneNumberValidate = (phoneNumber) => {
    // Parse the phone number with the country code for India ('IN')
    const parsedNumber = parsePhoneNumberFromString(phoneNumber, 'IN');

    // Check if the number is valid and belongs to India
    if (parsedNumber && parsedNumber.isValid() && parsedNumber.country === 'IN') {
        return {
            valid: true,
            formattedNumber: parsedNumber.formatInternational() // International format
        };
    } else {
        return { valid: false, error: 'Invalid Indian phone number' };
    }
}
module.exports = PhoneNumberValidate;