const fs = require('fs');

const perfData = JSON.parse(fs.readFileSync('parsed_data.json', 'utf8'));
let appJs = fs.readFileSync('Marketing Calendar/app.js', 'utf8');

if (!appJs.includes('const PERFORMANCE_DATA')) {
  const perfHeader = 'const PERFORMANCE_DATA = ' + JSON.stringify(perfData, null, 2) + ';\n\n';
  appJs = perfHeader + appJs;
}

const oldFooterCode = '    const footer = document.createElement("div");';
const newFooterCode = `
    // Performance Inspector for Spreadsheets Data
    const pMatch = PERFORMANCE_DATA.find(p => p.tanggal === post.date || (post.title && p.topik && (post.title.toLowerCase().includes(p.topik.toLowerCase()) || p.topik.toLowerCase().includes(post.title.toLowerCase()))));
    if (pMatch) {
      const perfBox = document.createElement("div");
      perfBox.className = "mt-2 p-2 rounded-xl bg-slate-900/90 border border-blue-500/30 text-[11px] space-y-1 font-mono shadow-xs";
      perfBox.innerHTML = \`
        <div class="flex items-center justify-between text-[10px] text-blue-400 font-extrabold uppercase">
          <span class="flex items-center gap-1">📊 Spreadsheets Performance</span>
          <span class="text-purple-400 font-mono">ER: \${pMatch.er}%</span>
        </div>
        <div class="grid grid-cols-2 gap-1 text-[10px]">
          <div class="text-emerald-400 font-bold">Reach: \${pMatch.reach.toLocaleString('id-ID')}</div>
          <div class="text-slate-300">Tayangan: \${pMatch.tayangan.toLocaleString('id-ID')}</div>
          <div class="text-slate-300">Likes: \${pMatch.likes}</div>
          <div class="text-slate-300">Saves: \${pMatch.saves} | Shares: \${pMatch.shares}</div>
        </div>
        \${pMatch.link ? \`<a href="\${pMatch.link}" target="_blank" onclick="event.stopPropagation()" class="block text-center text-[10px] text-purple-300 hover:text-white font-bold underline mt-1">Buka Post Live ↗</a>\` : ''}
      \`;
      card.appendChild(perfBox);
    }

    const footer = document.createElement("div");`;

if (appJs.includes(oldFooterCode) && !appJs.includes('Spreadsheets Performance')) {
  appJs = appJs.replace(oldFooterCode, newFooterCode);
}

fs.writeFileSync('Marketing Calendar/app.js', appJs, 'utf8');
console.log('Successfully updated Marketing Calendar/app.js with spreadsheet performance inspection!');
