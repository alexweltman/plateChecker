
const CSVEscape = (field) => {
  return '"' + String(field || "").replace(/\"/g, '""') + '"';
};

const headers = [
  'Plate Number',
  'State',
  'Added By',
  'Date'
].map(CSVEscape).join(',');

const docToCSV = (doc) => {
  return [
    doc.number,
    doc.state,
    doc.addedBy,
    doc.createdAt
  ].map(CSVEscape).join(',');
};

module.exports = { headers, docToCSV };
