const getAge = require('get-age');

const calcAge = async (month, day, year) => {
    const minAge = 13;
    const today = new Date();
    const stringDate = today.toLocaleDateString();
    const calculatedAge= getAge(`${year}-${month}-${day}`)
    console.log("value from ageFromString", calculatedAge);

    const intCalcualtedAge = Number(calculatedAge);

    if (intCalcualtedAge >= minAge) {
        console.log("Date of birth entered " + intCalcualtedAge + " is valid.");
        // return "Date of birth entered (" + intCalcualtedAge + ") is valid.";
    } else {
        console.log("You must be older than thirteen to use our service!");
        return "You must be older than 13 to use our service!";
    }
}
// // Un-comment for test with Code Runner extension
// calcAge('02','14','2012')

module.exports = {
    calcAge
};