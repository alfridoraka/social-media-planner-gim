const fs = require('fs');

const raw = fs.readFileSync('sheet_data.csv', 'utf8');
const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const header = parseCSVLine(lines[0]);
console.log('Headers:', header.slice(0, 20));

const posts = [];
for (let i = 1; i < lines.length; i++) {
  const row = parseCSVLine(lines[i]);
  if (!row[0] && !row[1] && !row[4]) continue; // skip empty rows
  
  // Column mapping based on IG Performance Posts sheet:
  // 0: No, 1: Tanggal Post, 2: Tipe, 3: Jenis Konten, 4: Tema/Topik, 5: Link
  // 6: Account reach, 7: Interaksi, 8: Interaksi Tayangan, 9: Likes, 10: Komentar
  // 11: Saves, 12: Shares, 13: Profile Views, 14: Follow, 15: Clicks link, 16: Click alamat
  // 17: Engagement Rate (%), 18: Cost (Ads), 20: Ads Tanggal, 21: Cost Ads, 22: Tayangan Ads
  
  const no = row[0] || i;
  const tanggal = row[1] || '';
  const tipe = row[2] || 'Organic';
  const jenis = row[3] || 'Foto';
  const topik = row[4] || 'Untitled Post';
  const link = row[5] || '';
  const reach = parseInt((row[6] || '0').replace(/,/g, '')) || 0;
  const tayangan = parseInt((row[8] || '0').replace(/,/g, '')) || 0;
  const likes = parseInt((row[9] || '0').replace(/,/g, '')) || 0;
  const comments = parseInt((row[10] || '0').replace(/,/g, '')) || 0;
  const saves = parseInt((row[11] || '0').replace(/,/g, '')) || 0;
  const shares = parseInt((row[12] || '0').replace(/,/g, '')) || 0;
  const profileViews = parseInt((row[13] || '0').replace(/,/g, '')) || 0;
  const follows = parseInt((row[14] || '0').replace(/,/g, '')) || 0;
  const linkClicks = parseInt((row[15] || '0').replace(/,/g, '')) || 0;
  const er = parseFloat((row[17] || '0').replace(',', '.')) || 0;
  const costStr = row[18] || row[21] || '';
  const isAds = costStr.length > 0 || row[20] ? true : false;
  
  if (topik || tanggal || link) {
    posts.push({
      id: 'post-' + i,
      no,
      tanggal,
      tipe: tipe.trim(),
      jenis: jenis.trim(),
      topik: topik.trim(),
      link: link.trim(),
      reach,
      tayangan,
      likes,
      comments,
      saves,
      shares,
      profileViews,
      follows,
      linkClicks,
      er,
      isAds,
      costStr,
      status: tanggal ? 'Published' : 'Draft'
    });
  }
}

console.log('Parsed Posts Count:', posts.length);
console.log('Sample parsed post:', posts[0]);
fs.writeFileSync('parsed_data.json', JSON.stringify(posts, null, 2), 'utf8');
