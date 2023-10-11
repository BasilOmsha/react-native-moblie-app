import axios from 'axios';

const API_BASE_URI = '192.168.0.13:3001';

export const addTravInfoToDatabase = async (
  firstname,
  lastname,
  age,
  gender,
  email,
  passportnumber,
  nationality,
  flights,
) => {
  try {
    const apiUrl = `http://${API_BASE_URI}/travelerinfo`;

    const response = await axios.post(apiUrl, {
      firstname,
      lastname,
      age,
      gender,
      email,
      passportnumber,
      nationality,
      flights,
    });

    console.log(response);
    return response;
  } catch (error) {
    console.error('Error adding traveler information:', error);
  }
};
