const fs = require('fs');

const unifiedPosts = JSON.parse(fs.readFileSync('unified_posts.json', 'utf8'));

// 1. Update Marketing Calendar/calendar_data.js
const calendarDataContent = `// Unified Social Media Content Planning & Performance Database 2026
// Source: https://docs.google.com/spreadsheets/d/1xjjV2YSvvY6WuGikXnQ2zsSWa0ZFxsQfofIyWs4D30A/edit?usp=sharing

const INITIAL_CALENDAR_DATA = ${JSON.stringify(unifiedPosts, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { INITIAL_CALENDAR_DATA };
}
`;

fs.writeFileSync('Marketing Calendar/calendar_data.js', calendarDataContent, 'utf8');
console.log('Updated Marketing Calendar/calendar_data.js with', unifiedPosts.length, 'posts');

// 2. Update Marketing Calendar/app.js to sync with the new sheet URL and unified fields
let appJs = fs.readFileSync('Marketing Calendar/app.js', 'utf8');

// Replace PERFORMANCE_DATA declaration with unifiedPosts
const perfDataRegex = /const PERFORMANCE_DATA = \[[\s\S]*?\];/;
const newPerfDataDecl = `const PERFORMANCE_DATA = ${JSON.stringify(unifiedPosts, null, 2)};`;

if (perfDataRegex.test(appJs)) {
  appJs = appJs.replace(perfDataRegex, newPerfDataDecl);
}

// Replace Sheet Sync URL in app.js
const oldSheetIdPattern = /1z-6GqeczVfQZLmsmBtCvuv1fMH9FRiGCa9FKX1Klwu4/g;
appJs = appJs.replace(oldSheetIdPattern, '1xjjV2YSvvY6WuGikXnQ2zsSWa0ZFxsQfofIyWs4D30A');

// Make sure syncWithGoogleSheet fetches the new CSV and parses all columns
const newSyncFunction = `async function syncWithGoogleSheet() {
  const icon = document.getElementById("sidebar-sync-icon") || document.getElementById("sync-icon");
  if (icon) icon.classList.add("animate-spin");
  try {
    const sheetId = "1xjjV2YSvvY6WuGikXnQ2zsSWa0ZFxsQfofIyWs4D30A";
    const url = \`https://docs.google.com/spreadsheets/d/\${sheetId}/gviz/tq?tqx=out:csv\`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Gagal mengambil data dari Google Sheet");
    const csv = await res.text();
    
    // Parse CSV
    const parseCSV = (text) => {
      const p = [];
      let row = [''];
      let inQuotes = false;
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        const next = text[i+1];
        if (c === '"') {
          if (inQuotes && next === '"') { row[row.length - 1] += '"'; i++; }
          else { inQuotes = !inQuotes; }
        } else if (c === ',' && !inQuotes) {
          row.push('');
        } else if ((c === '\\r' || c === '\\n') && !inQuotes) {
          if (c === '\\r' && next === '\\n') i++;
          p.push(row);
          row = [''];
        } else {
          row[row.length - 1] += c;
        }
      }
      if (row.length > 1 || row[0] !== '') p.push(row);
      return p;
    };

    const rows = parseCSV(csv);
    if (rows.length > 1) {
      const headers = rows[0].map(h => h.trim().toLowerCase());
      const synced = [];
      for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        if (!r || r.length < 3) continue;
        const getCol = (name) => {
          const idx = headers.indexOf(name.toLowerCase());
          return idx !== -1 && r[idx] ? r[idx].trim() : '';
        };
        const title = getCol('judul');
        if (!title) continue;
        
        let date = getCol('tanggal');
        if (date.includes('/')) {
          const [d, m, y] = date.split('/');
          date = \`\${y}-\${m.padStart(2, '0')}-\${d.padStart(2, '0')}\`;
        }
        
        const platformStr = getCol('platform') || 'Instagram';
        const platforms = platformStr.split(/[,/]/).map(p => p.trim()).filter(Boolean);
        if (platforms.length === 0) platforms.push('Instagram');

        const parseNum = (s) => parseFloat((s || '').replace(/[^\\d.-]/g, '')) || 0;
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

        synced.push({
          id: getCol('id') || \`post-\${i}\`,
          no: String(i),
          date,
          month: MONTH_NAMES[new Date(date).getMonth()] || 'March',
          title,
          category: getCol('kategori') || 'Other',
          brand: getCol('brand') || 'GIM',
          format: getCol('format') || 'Feed / Post',
          status: getCol('status') || 'Planned',
          platforms,
          notes: getCol('catatan'),
          hook: getCol('hook ai') || getCol('hook'),
          caption: getCol('caption draft') || getCol('caption'),
          hashtags: getCol('hastags') || getCol('hashtags'),
          refLink: getCol('link referensi') || getCol('ref link'),
          link: getCol('link post asli') || getCol('link'),
          reach,
          tayangan,
          likes,
          comments,
          saves,
          shares,
          totalInteraksi,
          er,
          isAds: (tipeIklan && tipeIklan.toLowerCase().includes('promoted')) || (biayaIklan && biayaIklan.length > 0),
          costStr: biayaIklan
        });
      }
      if (synced.length > 0) {
        calendarPosts = synced;
        saveData();
        renderCurrentView();
        renderAgendaPanel();
        showToast(\`✓ Berhasil sinkron \${synced.length} postingan dari Google Sheet!\`);
      }
    }
  } catch (err) {
    console.error("Sync error:", err);
    showToast("Gagal menyinkronkan: " + err.message);
  } finally {
    if (icon) icon.classList.remove("animate-spin");
  }
}`;

const syncFnRegex = /async function syncWithGoogleSheet\(\) \{[\s\S]*?if \(icon\) icon\.classList\.remove\("animate-spin"\);\s*\}\s*\}/;
if (syncFnRegex.test(appJs)) {
  appJs = appJs.replace(syncFnRegex, newSyncFunction);
}

fs.writeFileSync('Marketing Calendar/app.js', appJs, 'utf8');
console.log('Updated Marketing Calendar/app.js');

// 3. Update index.html with unified posts and sync function
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace DEFAULT_POSTS in index.html
const defaultPostsRegex = /const DEFAULT_POSTS = \[[\s\S]*?\];/;
const newDefaultPostsDecl = `const DEFAULT_POSTS = ${JSON.stringify(unifiedPosts, null, 2)};`;

if (defaultPostsRegex.test(indexHtml)) {
  indexHtml = indexHtml.replace(defaultPostsRegex, newDefaultPostsDecl);
}

// Replace Sheet ID and Header badge
indexHtml = indexHtml.replace(/1z-6GqeczVfQZLmsmBtCvuv1fMH9FRiGCa9FKX1Klwu4/g, '1xjjV2YSvvY6WuGikXnQ2zsSWa0ZFxsQfofIyWs4D30A');
indexHtml = indexHtml.replace('Live Database: Copy of IG Performance Posts', 'Live Database: Unified Marketing Intelligence & Calendar Sheet');

// Update syncLiveSheetData in index.html
const newSyncLiveSheetDataFn = `async function syncLiveSheetData() {
      const icon = document.getElementById('sync-icon');
      if (icon) icon.classList.add('animate-spin');
      try {
        const sheetId = '1xjjV2YSvvY6WuGikXnQ2zsSWa0ZFxsQfofIyWs4D30A';
        const url = \`https://docs.google.com/spreadsheets/d/\${sheetId}/gviz/tq?tqx=out:csv\`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Fetch error');
        const csv = await res.text();
        
        const parseCSV = (text) => {
          const p = [];
          let row = [''];
          let inQuotes = false;
          for (let i = 0; i < text.length; i++) {
            const c = text[i];
            const next = text[i+1];
            if (c === '"') {
              if (inQuotes && next === '"') { row[row.length - 1] += '"'; i++; }
              else { inQuotes = !inQuotes; }
            } else if (c === ',' && !inQuotes) {
              row.push('');
            } else if ((c === '\\r' || c === '\\n') && !inQuotes) {
              if (c === '\\r' && next === '\\n') i++;
              p.push(row);
              row = [''];
            } else {
              row[row.length - 1] += c;
            }
          }
          if (row.length > 1 || row[0] !== '') p.push(row);
          return p;
        };

        const rows = parseCSV(csv);
        if (rows.length > 1) {
          const headers = rows[0].map(h => h.trim().toLowerCase());
          const synced = [];
          for (let i = 1; i < rows.length; i++) {
            const r = rows[i];
            if (!r || r.length < 3) continue;
            const getCol = (name) => {
              const idx = headers.indexOf(name.toLowerCase());
              return idx !== -1 && r[idx] ? r[idx].trim() : '';
            };
            const title = getCol('judul');
            if (!title) continue;
            
            let date = getCol('tanggal');
            let d = 1, m = 1, y = 2026;
            if (date.includes('/')) {
              const parts = date.split('/');
              d = parseInt(parts[0], 10);
              m = parseInt(parts[1], 10);
              y = parseInt(parts[2], 10);
              date = \`\${y}-\${String(m).padStart(2, '0')}-\${String(d).padStart(2, '0')}\`;
            } else if (date.includes('-')) {
              const parts = date.split('-');
              y = parseInt(parts[0], 10);
              m = parseInt(parts[1], 10);
              d = parseInt(parts[2], 10);
            }
            
            const format = getCol('format') || 'Feed / Post';
            const category = getCol('kategori') || 'Other';
            const parseNum = (s) => parseFloat((s || '').replace(/[^\\d.-]/g, '')) || 0;
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

            synced.push({
              id: getCol('id') || \`post-\${i}\`,
              no: String(i),
              tanggal: \`\${String(d).padStart(2, '0')}/\${String(m).padStart(2, '0')}/\${y}\`,
              date,
              tipe: category,
              jenis: format.includes('Reels') ? 'Reels' : (format.includes('Carousel') ? 'Carousel' : 'Foto'),
              topik: title,
              title,
              category,
              brand: getCol('brand') || 'GIM',
              format,
              status: getCol('status') || 'Planned',
              link: getCol('link post asli') || getCol('link'),
              reach,
              tayangan,
              likes,
              comments,
              saves,
              shares,
              er,
              isAds: (tipeIklan && tipeIklan.toLowerCase().includes('promoted')) || (biayaIklan && biayaIklan.length > 0),
              costStr: biayaIklan
            });
          }
          if (synced.length > 0) {
            postsData = synced;
            filteredPosts = [...postsData];
            renderAllViews();
            alert(\`✓ Berhasil sinkron \${synced.length} data konten dari Google Sheet!\`);
          }
        }
      } catch (err) {
        console.warn('Sync fallback:', err);
        alert('Data disinkronkan dari database lokal (aktif).');
      } finally {
        if (icon) icon.classList.remove('animate-spin');
      }
    }`;

const oldSyncLiveRegex = /async function syncLiveSheetData\(\) \{[\s\S]*?if \(icon\) icon\.classList\.remove\('animate-spin'\);\s*\}\s*\}/;
if (oldSyncLiveRegex.test(indexHtml)) {
  indexHtml = indexHtml.replace(oldSyncLiveRegex, newSyncLiveSheetDataFn);
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Updated index.html');
