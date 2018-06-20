import { observable, action, computed } from 'mobx';

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
}

const store = new Experience();

export default store;
