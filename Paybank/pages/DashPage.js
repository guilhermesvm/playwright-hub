export class DashPage{
    constructor(page){
        this.page = page
    }

    async checkAccountBalance(){
        return this.page.locator('#account-balance');
    }
}