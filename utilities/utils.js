var MEDIUM_WAIT = browser.params.waits.MEDIUM_WAIT;
var LONG_WAIT = browser.params.waits.LONG_WAIT;
var SHORT_WAIT = browser.params.waits.SHORT_WAIT;
let EC = protractor.ExpectedConditions;

class utils {
    constructor() {

    }

    waitForElement(ele, waitTimeout = MEDIUM_WAIT) {
        return browser.wait(function () {

            return ele.isPresent().then(function (present) {
                if (!present) {
                    return false;
                }
                return ele.isDisplayed().then(displayed => displayed, error => {
                    if(error.message.indexOf('StaleElementReferenceError')>-1){
                        return false;
                    }
                    throw error;
                });
            }).catch(err => {
                if(err.message.indexOf('StaleElementReferenceError')>-1){
                    return false;
                }
                throw err;
            })
            /////////////
            if (highlightWebElement) {
                self.highlightElement(oElement);
            }
            //////////////////////////
        }, waitTimeout);
    }

    waitForNotElement(ele, waitTimeout = MEDIUM_WAIT) {
        return browser.wait(function () {

            return ele.isPresent().then(function (present) {
                if (!present) {
                    return true;
                } else {
                    return ele.isDisplayed().then(function (displayed) {
                        return !displayed;
                    }, function (error) {
                        if (error.message.indexOf('NoSuchElement')) {
                            return true;
                        }
                        throw error;
                    });
                }
            })
             /////////////
             if (highlightWebElement) {
                self.highlightElement(oElement);
            }
            //////////////////////////
        }, waitTimeout);
    }
    //////////////////////////
    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', style);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 200);
            return "highlighted";
        }
        return browser.executeScript(setStyle, byObject.getWebElement(), 'color: red; background-color: yellow;');
    }
    //////////////////////////

    scrollToElement(){


        let determinationBtn = element(by.id('countryCodeSelectBoxItText'));
        browser.executeScript("arguments[0].scrollIntoView();", determinationBtn.getWebElement());
        browser.wait(EC.elementToBeClickable(determinationBtn), 5000);
        determinationBtn.click();


        // return browser.executeScript("arguments[0].scrollIntoView();",ele.getWebElement());
    }

    waitForElementByLocator(locator, waitTimeout = MEDIUM_WAIT) {
        return this.waitForElement(element(locator), waitTimeout);
    }

    waitForNotElementByLocator(locator, waitTimeout = MEDIUM_WAIT) {
        return this.waitForNotElement(element(locator), waitTimeout);
    }

    getCookie(cookieName, waitTimeout = MEDIUM_WAIT) {
        return browser.manage().getCookie(cookieName);
    }

    closeAllWindowsExceptParent(){
        return browser.getAllWindowHandles().then(function(handles){
            return Promise.all(handles.map(function(handle,index){
                if(index>0){
                    return browser.switchTo().window(handle).then(function(){
                        return browser.close();
                    })
                }else{
                    return Promise.resolve();
                }
            })).then(function(){
                return browser.switchTo().window(handles[0]);
            });
        })
    }

    getNumberOfWindows(){
        return browser.getAllWindowHandles();
    }

    getWindowTitle(windowIndex,isAngular){
        return browser.wait(function(){
            return browser.getAllWindowHandles().then(function(handles){
                return handles.length > windowIndex;
            })
        }).then(function(){
        return browser.getAllWindowHandles().then(function (handles) {
            if (!isAngular) {
                browser.ignoreSynchronization = true;
            }
            return browser.switchTo().window(handles[windowIndex]).then(function () {
                return browser.getTitle().then(function (title) {
                    browser.ignoreSynchronization = false;
                    return title;
                });
            })
        })
    });
    }

    getWordForNumber(number){
        let digitArray = [];
        let word = '';
        while(number>0){
            digitArray.push(number%10);
            console.log(number);
            number=Math.floor(number/10);
        }
        console.log(digitArray);
        for(let i=0;i<digitArray.length;i++){
            word+=String.fromCharCode(97 + digitArray[i]);
        }
        console.log(word);
        return word;
    }

}


module.exports = utils;