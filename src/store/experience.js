import { observable, action, computed } from 'mobx';

import simpleFetch from '../utils/simpleFetch';

class Experience {
  @observable
  dataSource = [];

  @action.bound
  setData(data) {
    this.dataSource = data;
  }

  @observable
  countryList = {};

  @action.bound
  setCountry(country) {
    this.countryList = country;
  }

  @observable
  countryOption = [];

  @action.bound
  setCountryOption(country) {
    this.countryOption = country;
  }

  @observable
  token = '';

  @action.bound
  async getToken() {
    try {
      let { data } = await simpleFetch('/token/get/');
      console.log(data);
      this.token = data.token;
    } catch (err) {
      console.log("eerr", err);
    }
  }

  @observable
  coverImageUrl = '';

  @action.bound
  setCoverImageUrl(url) {
    this.coverImageUrl = url;
  }

  @observable
  cardImageUrl = '';
  @action.bound
  setCardImageUrl(url) {
    this.cardImageUrl = url;
  }
}

const store = new Experience();

export default store;
