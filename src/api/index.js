import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = url;

  // If country is specified, only want to fetch data form
  // the country's directory.
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }
  // Try fethcing the data. If the country is invalid, an error
  // is returned.
  try {
    const { data: { confirmed, 
        recovered, 
        deaths, 
        lastUpdate } } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    return data.map(({ confirmed, deaths, reportDate: date }) => ({
       confirmed: confirmed.total, deaths: deaths.total, date 
      }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};