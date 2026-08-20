const fs = require('fs');
const https = require('https');

const sheetId = '1z-6GqeczVfQZLmsmBtCvuv1fMH9FRiGCa9FKX1Klwu4';
const tabName = encodeURIComponent('Copy of IG Performance Posts');
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${tabName}`;

https.get(url, (res) => {
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    https.get(res.headers.location, handleResponse);
  } else {
    handleResponse(res);
  }
}).on('error', (e) => {
  console.error('Error fetching sheet:', e);
});

function handleResponse(res) {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('sheet_data.csv', data, 'utf8');
    console.log('Successfully saved sheet_data.csv. Length:', data.length);
    
    // Simple CSV line parser
    const lines = data.split(/\r?\n/).filter(l => l.trim().length > 0);
    console.log('Total non-empty lines:', lines.length);
    if (lines.length > 0) {
      console.log('Header line:', lines[0]);
      console.log('Sample Row 1:', lines[1]);
      console.log('Sample Row 2:', lines[2]);
    }
  });
}
