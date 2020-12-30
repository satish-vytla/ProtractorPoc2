let Page = require('./Page');
class Login extends Page{
    constructor(options){
        super(options);
        this.USERNAME = by.id('mat-input-0');
        this.PASSWORD = by.id('mat-input-1');
        this.SIGNIN_BTN= by.xpath("//div[@id='login-buttons']/button[@type='submit']");
        this.SINGOUT_BTN= by.xpath("//span[contains(text(),'Admin')]");
        this.LOGOUT_BTN= by.xpath("//div[@role='menu']/div/button[4]");
        this.PAGEREADY = this.USERNAME;
    }
    enterUserName(userName){
        if(userName){
        return element(this.USERNAME).sendKeys(userName);
        }else{
            return element(this.USERNAME).clear();
        }
    }

    enterPassword(password){
        if(password){
        return element(this.PASSWORD).sendKeys(password);
        }else{
            return element(this.PASSWORD).clear()
        }
    }

    clickSignInButton(){
        return element(this.SIGNIN_BTN).click();
    }
    clickSingOutButton(){
        return element(this.SINGOUT_BTN).click();
    }
    clickLogOutButton(){
        return element(this.LOGOUT_BTN).click();
    }


}

module.exports = Login;