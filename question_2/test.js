// https://docs.google.com/spreadsheets/d/16VIzcrHEFysSYx0g2HyE7XG3fcIzd_M_C1gK1p7zTNY/edit#gid=0

// test.js
const { writeData } = require('./googleSheet.js');
const { getData } = require('./googleSheet.js');
const { deleteData } = require('./googleSheet.js');


(async () => {
    const deletData = await deleteData('16VIzcrHEFysSYx0g2HyE7XG3fcIzd_M_C1gK1p7zTNY', '0');
    const writeresp = await writeData('16VIzcrHEFysSYx0g2HyE7XG3fcIzd_M_C1gK1p7zTNY', '0');
    const resp = await getData('16VIzcrHEFysSYx0g2HyE7XG3fcIzd_M_C1gK1p7zTNY', '0');
    console.log(writeresp);
    console.log(resp);
})();