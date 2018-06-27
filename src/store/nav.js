import { action, observable } from 'mobx';


class navStore {
    @observable currentTab = ['1'];
    @action.bound
    changeTab(id)
    {
        this.currentTab[0] = String(id);
    }
}

const store = new navStore();

export default store;


