
function CSVEscape(field) {
  return '"' + String(field || "").replace(/\"/g, '""') + '"';
}

var headers = [
  'Plate Number',
  'State',
  'Added By',
  'Date'
].map(CSVEscape).join(',');

function docToCSV(doc) {
  return [
    doc.number,
    doc.state,
    doc.addedBy,
    doc.createdAt
  ].map(CSVEscape).join(',');
}

module.exports = {
  headers: headers,
  docToCSV: docToCSV
};
