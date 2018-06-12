import { observable, action } from 'mobx';

class Experience {
  @observable
  dataSource = [];

  @action.bound
  setData(data) {
    this.dataSource = data;
  }
}

const store = new Experience();

export default store;
