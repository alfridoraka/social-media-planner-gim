const fs = require('fs');

function parseCSV(text) {
  const p = [];
  let row = [''];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i+1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push('');
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      p.push(row);
      row = [''];
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== '') {
    p.push(row);
  }
  return p;
}

const raw = fs.readFileSync('new_sheet_data.csv', 'utf8');
const rows = parseCSV(raw);
console.log('Total raw rows:', rows.length);

const headers = rows[0].map(h => h.trim().toLowerCase());
console.log('Detected Headers:', headers);

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const unifiedPosts = [];

for (let i = 1; i < rows.length; i++) {
  const r = rows[i];
  if (!r || r.length < 3) continue;

  const getCol = (name) => {
    const idx = headers.indexOf(name.toLowerCase());
    return idx !== -1 && r[idx] ? r[idx].trim() : '';
  };

  const id = getCol('id') || `post-${i}`;
  let date = getCol('tanggal');
  const title = getCol('judul');
  if (!title) continue;

  // Normalize date to YYYY-MM-DD
  let y = 2026, m = 1, d = 1;
  if (date.includes('/')) {
    const parts = date.split('/');
    if (parts.length === 3) {
      d = parseInt(parts[0], 10);
      m = parseInt(parts[1], 10);
      y = parseInt(parts[2], 10);
      date = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    }
  } else if (date.includes('-')) {
    const parts = date.split('-');
    if (parts.length === 3) {
      y = parseInt(parts[0], 10);
      m = parseInt(parts[1], 10);
      d = parseInt(parts[2], 10);
      date = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    }
  }

  const category = getCol('kategori') || 'Other';
  const brand = getCol('brand') || 'GIM';
  const format = getCol('format') || 'Feed / Post';
  const status = getCol('status') || 'Planned';
  const platformStr = getCol('platform') || 'Instagram';
  const platforms = platformStr.split(/[,/]/).map(p => p.trim()).filter(Boolean);
  if (platforms.length === 0) platforms.push('Instagram');

  const notes = getCol('catatan');
  const hook = getCol('hook ai') || getCol('hook');
  const caption = getCol('caption draft') || getCol('caption');
  const hashtags = getCol('hastags') || getCol('hashtags');
  const refLink = getCol('link referensi') || getCol('ref link');
  const link = getCol('link post asli') || getCol('link');

  const parseNum = (str) => {
    if (!str) return 0;
    const clean = str.replace(/[^\d.-]/g, '');
    return parseFloat(clean) || 0;
  };

  const reach = parseNum(getCol('reach'));
  const tayangan = parseNum(getCol('tayangan'));
  const likes = parseNum(getCol('likes'));
  const comments = parseNum(getCol('comments'));
  const saves = parseNum(getCol('saves'));
  const shares = parseNum(getCol('shares'));
  const totalInteraksi = parseNum(getCol('total interaks')) || (likes + comments + saves + shares);
  
  let er = parseNum(getCol('er %')) || parseNum(getCol('er'));
  if (er === 0 && reach > 0 && totalInteraksi > 0) {
    er = parseFloat(((totalInteraksi / reach) * 100).toFixed(2));
  }

  const tipeIklan = getCol('tipe iklan');
  const biayaIklan = getCol('biaya iklan');
  const isAds = (tipeIklan && tipeIklan.toLowerCase().includes('promoted')) || (biayaIklan && biayaIklan.length > 0) || false;

  unifiedPosts.push({
    id,
    no: String(i),
    date,
    tanggal: `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`,
    month: MONTH_NAMES[m - 1] || 'March',
    title,
    topik: title,
    category,
    brand,
    format,
    jenis: format.includes('Reels') ? 'Reels' : (format.includes('Carousel') ? 'Carousel' : 'Foto'),
    tipe: category,
    status,
    platforms,
    platformStr,
    notes,
    hook,
    caption,
    hashtags,
    refLink,
    link,
    reach,
    tayangan,
    likes,
    comments,
    saves,
    shares,
    totalInteraksi,
    er,
    isAds,
    costStr: biayaIklan,
    goal: getCol('goal'),
    goalDesc: getCol('goal desc')
  });
}

console.log(`Generated ${unifiedPosts.length} unified posts!`);
fs.writeFileSync('unified_posts.json', JSON.stringify(unifiedPosts, null, 2), 'utf8');
console.log('Saved to unified_posts.json');
