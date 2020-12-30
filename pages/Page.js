let Utils = require('./../utilities/utils');
let utils = new Utils();
let EC = protractor.ExpectedConditions;
class Page {
    constructor(options) {
        browser.ignoreSynchronization = options && !options.isAngular ? true : false;
        this.SPINNERLOCATOR = by.className('fa-spinner');
        this.ACCOUNTDROPDOWN = by.id('dd-acount');
        this.ACCOUNTDROPDOWN_MENU = by.className('dropdown-menu');
        this.ACCOUNTDROPDOWN_OPTION = by.tagName('a');
        this.APPLICATION_LINK = by.css('main-nav .application-link');
        if (options && options.pageReadyToBePresent) {
            this.pageReadyToBePresent = options.pageReadyToBePresent;
        } else {
            this.pageReadyToBePresent = true;
        }
    }

    clickApplicationLink(){
        return element(this.APPLICATION_LINK).click();
    }

    waitForPage() {
        if (!this.PAGEREADY) {
            throw new Error('PAGEREADY ELEMENT LOCTOR IS NECCESSARY...');
        }
        if (this.pageReadyToBePresent) {
            console.log('Wait For element');
            return utils.waitForElementByLocator(this.PAGEREADY);
        } else {
            console.log('Wait For not element');
            return utils.waitForNotElementByLocator(this.PAGEREADY);
        }
    }

    waitForNotPage() {
        if (!this.PAGEREADY) {
            throw new Error('PAGEREADY ELEMENT LOCTOR IS NECCESSARY...');
        }
        return utils.waitForNotElementByLocator(this.PAGEREADY);
    }

    waitForNotSpinner() {
        return utils.waitForNotElementByLocator(this.SPINNERLOCATOR);
    }

    signOut() {
        let self = this;
        this.clickOnAccountDropDown();
        utils.waitForElement(element(this.ACCOUNTDROPDOWN_MENU));
        return this.getAccountDropDownOptions().last().click().then(function () {
            return self.waitForNotSpinner();
        });
    }

    getAccountDropDownText() {
        let accountDropDown = element(this.ACCOUNTDROPDOWN);
        return utils.waitForElement(accountDropDown).then(function () {
            return accountDropDown.getText();
        });
    }

    waitForAccountName(accountName) {
        let self = this;
        return browser.wait(function () {
            return self.getAccountDropDownText().then(function (name) {
                return name === accountName;
            })
        })
    }

    waitForAccountDropDown() {
        return utils.waitForElement(element(this.ACCOUNTDROPDOWN));
    }

    clickOnAccountDropDown() {
        let accountDropDown = element(this.ACCOUNTDROPDOWN);
        browser.wait(EC.elementToBeClickable(accountDropDown));
        browser.executeScript('arguments[0].scrollIntoView();', accountDropDown);
        return browser.executeScript('arguments[0].click();', accountDropDown);
    }

    getAccountDropDownOptions() {
        utils.waitForElementByLocator(this.ACCOUNTDROPDOWN_MENU);
        return element(this.ACCOUNTDROPDOWN_MENU).all(this.ACCOUNTDROPDOWN_OPTION);
    }

    clickOptionInAccountDropDown(optionName) {
        let self = this;
        return this.getAccountDropDownOptions().filter(function (option, index) {
            return option.getText().then(function (text) {
                return text === optionName;
            })
        }).first().click().then(function () {
            return self.waitForNotSpinner();
        })
    }

}
module.exports = Page;