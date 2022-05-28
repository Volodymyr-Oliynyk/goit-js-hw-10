import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1';
const filds = '?fields=name,capital,population,flags,languages';

export const fetchCountries = async name => {
  const res = await fetch(`${BASE_URL}/name/${name}${filds}`);
  if (!res.ok) {
    return Notiflix.Notify.failure('Oops, there is no country with that name');
  }
  return await res.json();
};

