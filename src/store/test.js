import { action, observable } from 'mobx';
import { message } from 'antd';

import sFetch from '../utils/simpleFetch';


class TestStore {
    @observable date = new Date();
    @observable name = 'michael';

    @action.bound
    async getCity() {
      try {
        const { data } = await sFetch('/data/list/country/');
        console.log(data);
      } catch (err) {
        message.error(err.message);
      }
    }
}

const store = new TestStore();

export default store;
