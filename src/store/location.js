import { action, observable } from 'mobx';
import sPost from '../utils/simpleFetch';
import { message } from 'antd';

class locationStore {
    @observable isCountryIniting = false;
    @observable countrylist = null;
    @observable countrynum = 0;
    @observable shownum = 3;
    
    @action.bound
    addShownum(){
        this.shownum = this.shownum + 4;
    }

    @action.bound
    async loadCountryList() {
        this.isCountryIniting = true;
        try{
            const { data } = await sPost('https://dsn.apizza.net/mock/d219e15359947f0ce7411b7b91fd5668/data/list/country');
            console.log(data);
            const { page_sum } = data;
            const { items } = data;
            this.countrylist = data.items;
            this.countrysum = data.page_sum;
        }catch(err){
            message.error(err.message);
        }finally {
            this.isCountryIniting = false;
        }
        
    }
}

const store = new locationStore();

export default store;


