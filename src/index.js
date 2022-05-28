import './css/styles.css';

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import countryCardsMarkup from './template/countryCardsMarkup.hbs';
import countryListMarkup from './template/countryListMarkup.hbs';
import { fetchCountries } from './js/fetchCountries.js';
import { refs } from './js/refs.js';

const DEBOUNCE_DELAY = 300;
const clearMarkup = () => {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
const getCountryList =  countries => (refs.countryList.innerHTML = countryListMarkup(countries)); 

const onCountriesFetch = e => {
  const name = e.target.value.trim();

  if (name === '') {
    Notiflix.Notify.failure('Oops, there is no country with that name', DEBOUNCE_DELAY);
    return clearMarkup();
  }

  fetchCountries(name).then(country => {
    clearMarkup();
  if (country.length === 1) {
    refs.countryInfo.innerHTML = countryCardsMarkup(country);
    }  else if (country.length >= 2 && country.length <= 10) {
        getCountryList(country);
    }
    else if (country.length > 10) {
      return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
  });
};

  refs.input.addEventListener('input', debounce(onCountriesFetch, DEBOUNCE_DELAY));

