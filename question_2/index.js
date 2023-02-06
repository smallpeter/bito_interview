const {By,Key,Builder} = require("selenium-webdriver");
const { writeData } = require('./googleSheet.js');
const { deleteData } = require('./googleSheet.js')
require("chromedriver");
 
async function question_2(){
    let driver = await new Builder().forBrowser("chrome").build();
    
    await driver.get("https://www.bitopro.com/ns/fees");
    let title = await driver.getTitle();
    // console.log('Title is:',title);

    let leveltext = await driver.findElement(By.xpath('//h4[text()= "VIP 費用等級列表"]')).getText();
    let leveltitles = await driver.findElements(By.xpath('//h4[text()= "VIP 費用等級列表"]/..//table/thead//th'));
    let levelnumbers = await driver.findElements(By.xpath('//h4[text()= "VIP 費用等級列表"]/..//tbody//tr'));
    console.log('Level List:',leveltext);
    console.log('Title numbers:', leveltitles.length);
    console.log('row numbers:', levelnumbers.length);
    const deletData = await deleteData('16VIzcrHEFysSYx0g2HyE7XG3fcIzd_M_C1gK1p7zTNY', '0');
    console.log(deletData);
    for(let i = 1; i <= levelnumbers.length; i++){
        let arr = {};
        let row = await driver.findElements(By.xpath('//h4[text()= "VIP 費用等級列表"]/..//tbody//tr[' + i + ']/td'));
        // console.log('row:', row.length);
        for(let j = 1; j <= row.length; j++) {
            let title = await driver.findElement(By.xpath('//h4[text()= "VIP 費用等級列表"]/..//table/thead//th[' + j + ']')).getText();
            let content = await driver.findElement(By.xpath('//h4[text()= "VIP 費用等級列表"]/..//tbody//tr[' + i + ']/td[' + j + ']')).getText();
            arr[title] = content
        }
        // console.log(arr);
        //寫入google sheet URL: https://docs.google.com/spreadsheets/d/16VIzcrHEFysSYx0g2HyE7XG3fcIzd_M_C1gK1p7zTNY/edit#gid=0
        const writeresp = await writeData(arr, '16VIzcrHEFysSYx0g2HyE7XG3fcIzd_M_C1gK1p7zTNY', '0');
        console.log(writeresp);
    }
    console.log('寫入google sheet URL:\n', 'https://docs.google.com/spreadsheets/d/16VIzcrHEFysSYx0g2HyE7XG3fcIzd_M_C1gK1p7zTNY/edit#gid=0');
    await driver.quit();
}
question_2()