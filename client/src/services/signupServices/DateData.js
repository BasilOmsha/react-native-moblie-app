// Creates a list of days of the month (1 to 31)
const daysOfMonth = Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }));

// Creates a list of months in numbers (1 to 12)
const monthsInNumbers = Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }));

// Creates a list of years from 1919 to 2025
const years = Array.from({ length: 2025 - 1919 + 1 }, (_, i) => ({ label: `${2025 - i}`, value: `${2025 - i}` }));

const genders = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
];

export { daysOfMonth, monthsInNumbers, years, genders };