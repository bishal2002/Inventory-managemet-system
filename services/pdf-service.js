PDFDocument   = require('pdfkit');
const request = require('request');


//     function buildPDF(dataCallback,endCallback){
//     const doc = new PDFDocument();
//     doc.on('data',dataCallback);
//     doc.on('end',endCallback);
//     doc.fontSize(25).text("some heading",json);
//     doc.end();
// }



function buildPDF(dataCallback,endCallback){
  const doc = new PDFDocument();
  request.get('http://localhost:5000/api/v3/gethistory', (err, response, body) => {
    if (err) {
      console.error(err);
      return;
    }
  const data = JSON.parse(body);
  doc.on('data',dataCallback);
  doc.on('end',endCallback);
  doc.font('Helvetica-Bold');
  //doc.fillColor('#007bff');
  doc.underline(0, 25, doc.page.width, 0);
  doc.fontSize(12).text(`Data from the API: ${JSON.stringify(data)}`);
  doc.end();
}
)}


module.exports = { buildPDF };