// googleSheet.js

const { GoogleSpreadsheet } = require('google-spreadsheet');

/**
 * @param  {String} docID the document ID
 * @param  {String} sheetID the google sheet table ID
 * @param  {String} credentialsPath the credentials path defalt is './credentials.json'
 */
async function getData(docID, sheetID, credentialsPath = './silken-waters-376815-a57df5672f56.json') {
  const result = [];
  const doc = new GoogleSpreadsheet(docID);
  const creds = require(credentialsPath);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];
  const rows = await sheet.getRows();
  for (row of rows) {
    result.push(row._rawData);
  }
  return result;
};

module.exports = {
  getData, writeData, deleteData
};

async function writeData(arr, docID, sheetID, credentialsPath = './silken-waters-376815-a57df5672f56.json') {
  const doc = new GoogleSpreadsheet(docID);
  const creds = require(credentialsPath);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];
  await sheet.addRow(arr);
  return 'google sheet row 寫入成功';
}

async function deleteData(docID, sheetID, credentialsPath = './silken-waters-376815-a57df5672f56.json') {
  const doc = new GoogleSpreadsheet(docID);
  const creds = require(credentialsPath);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[sheetID];
  const rows = await sheet.getRows();
  // console.log('rows is:', rows.length);
  for(let i = rows.length-1; i >= 0; i--){
    // console.log('rows' + i + 'is:', rows[i]);
    await rows[i].delete();
  }
  return 'google sheet row 刪除成功';
}