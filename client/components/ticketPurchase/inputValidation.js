// InputValidation.js

export const validateInputs = (
  firstName,
  lastName,
  age,
  gender,
  passportNumber,
  nationality,
  email,
  from,
  to,
  date,
) => {
  if (
    !firstName ||
    !lastName ||
    !age ||
    !gender ||
    !passportNumber ||
    !nationality ||
    !email ||
    from ||
    to ||
    date
  ) {
    return false;
  }
  return true;
};
