const {By,Key,Builder} = require("selenium-webdriver");
require("chromedriver");
 
async function question_1(){
    let searchString = "BitoPro";
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://www.google.com/");
        
    await driver.findElement(By.name("q")).sendKeys(searchString,Key.RETURN);
        
    let title = await driver.getTitle();
    console.log('Title is:',title);
        
    let resulttext = await driver.findElement(By.xpath('//*[text()="BitoPro 台灣幣託交易所"]')).isDisplayed();
    let resulturl = await driver.findElement(By.xpath('//*[text()="https://www.bitopro.com"]')).isDisplayed();
    //驗證文字是否顯示在畫面上
    console.assert(resulttext,{resulttext: resulttext, errorMsg: 'BitoPro 台灣幣託交易所 文字無顯示在搜尋頁面上'});
    //驗證URL是否顯示在畫面上
    console.assert(resulturl,{resulttext: resulturl, errorMsg: 'https://www.bitopro.com 文字無顯示在搜尋頁面上'});
    await driver.quit();
}

question_1()