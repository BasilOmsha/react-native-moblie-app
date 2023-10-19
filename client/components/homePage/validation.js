export const validateInputsHome = (from, to, date) => {
  if (!from || !to || !date) {
    return false;
  }
  return true;
};
