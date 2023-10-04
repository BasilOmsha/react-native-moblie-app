import axios from 'axios';

const API_BASE_URI = '192.168.0.13:8080';

export const fetchLocations = async (
  from,
  to,
  date,
  round = false, // Default round trip to false
  returnDate, // The return date for round trip
) => {
  try {
    let apiUrl = `http://${API_BASE_URI}/search?from=${from}&to=${to}&date=${date}`;

    // Include round trip parameters if round is true and returnDate is provided
    if (round && returnDate) {
      apiUrl += `&round=true&returnDate=${returnDate}`;
    }

    const response = await axios.get(apiUrl);

    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
};
