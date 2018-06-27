import { action, observable } from 'mobx';
import sPost from '../utils/simpleFetch';
import { message } from 'antd';

class locationStore {
    @observable isCountryIniting = false;
    @observable countrylist = [];
    @observable countrysum = 0;
    @observable currentPage = 1;
    
    @action.bound
    updateCurrentPage(){
        this.currentPage = this.currentPage + 1;
        this.loadCountryList();
    }

    @action.bound
    initCurrentPage(){
        this.currentPage = 1;
        this.countrylist = [];
    }

    @action.bound
    async loadCountryList() {
        if (this.currentPage === 1)
        {
            this.isCountryIniting = true;
        }
        try{
            const { data } = await sPost('/data/list/country/', {
                page: this.currentPage
            });
            console.log(data);
            const { page_sum } = data;
            const { items } = data;
            this.countrylist = this.countrylist.concat(data.items);
            console.log(this.countrylist);
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


