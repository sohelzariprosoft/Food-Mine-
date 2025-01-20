const GenerateMapLink = (lat, lng) => {
    const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
    return googleMapsLink;
}
module.exports = GenerateMapLink