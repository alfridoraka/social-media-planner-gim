const fs = require('fs');

// 1. Update Marketing Calendar/app.js
let appJs = fs.readFileSync('Marketing Calendar/app.js', 'utf8');

// Replace the performance box in renderAgendaPanel
const oldPerfRegex = /\/\/ Performance Inspector for Spreadsheets Data[\s\S]*?card\.appendChild\(perfBox\);\s*\}/;

const newPerfBlock = `// Performance Inspector for Spreadsheets Data
    const normalizeD = (str) => {
      if (!str) return '';
      if (str.includes('/')) {
        const [d, m, y] = str.split('/');
        return \`\${y}-\${m.padStart(2, '0')}-\${d.padStart(2, '0')}\`;
      }
      return str;
    };

    const postNormDate = normalizeD(post.date);
    const pMatch = PERFORMANCE_DATA.find(p => {
      const pDateNorm = normalizeD(p.tanggal);
      const dateMatch = (pDateNorm && postNormDate && pDateNorm === postNormDate);
      const titleMatch = (post.title && p.topik && (post.title.toLowerCase().includes(p.topik.toLowerCase()) || p.topik.toLowerCase().includes(post.title.toLowerCase())));
      return dateMatch || titleMatch;
    });

    if (pMatch) {
      const avgReach = 2000;
      const isViral = (pMatch.reach || 0) > 4000;
      const isGood = (pMatch.reach || 0) > 1000;
      const ratingText = isViral ? '🔥 Viral / Performa Tinggi' : (isGood ? '🟢 Performa Bagus' : '🟡 Standar');

      const perfBox = document.createElement("div");
      perfBox.className = "mt-2.5 p-3 rounded-2xl bg-slate-900/95 border border-blue-500/40 text-xs space-y-2 shadow-md";
      perfBox.innerHTML = \`
        <div class="flex items-center justify-between pb-1.5 border-b border-slate-800">
          <span class="flex items-center gap-1.5 text-blue-400 font-extrabold uppercase text-[10px] tracking-wider">
            📊 Performance Database
          </span>
          <span class="px-2 py-0.5 rounded-md text-[10px] font-black \${isViral ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}">
            \${ratingText}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
          <div class="bg-[#151D2A] p-2 rounded-xl border border-slate-800">
            <div class="text-[9px] text-slate-400 font-sans font-bold">👥 Account Reach</div>
            <div class="text-sm font-black text-emerald-400">\${(pMatch.reach || 0).toLocaleString('id-ID')}</div>
          </div>
          <div class="bg-[#151D2A] p-2 rounded-xl border border-slate-800">
            <div class="text-[9px] text-slate-400 font-sans font-bold">👁️ Total Tayangan</div>
            <div class="text-sm font-black text-white">\${(pMatch.tayangan || 0).toLocaleString('id-ID')}</div>
          </div>
          <div class="bg-[#151D2A] p-2 rounded-xl border border-slate-800">
            <div class="text-[9px] text-slate-400 font-sans font-bold">⚡ Engagement Rate</div>
            <div class="text-sm font-black text-purple-400">\${pMatch.er || 0}%</div>
          </div>
          <div class="bg-[#151D2A] p-2 rounded-xl border border-slate-800">
            <div class="text-[9px] text-slate-400 font-sans font-bold">❤️ Total Likes</div>
            <div class="text-sm font-black text-slate-200">\${pMatch.likes || 0}</div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-1 text-[10px] text-center text-slate-300 bg-[#151D2A]/60 p-1.5 rounded-xl border border-slate-800 font-mono">
          <div>💬 Komentar: <strong class="text-white">\${pMatch.comments || 0}</strong></div>
          <div>🔖 Saves: <strong class="text-white">\${pMatch.saves || 0}</strong></div>
          <div>↗️ Shares: <strong class="text-white">\${pMatch.shares || 0}</strong></div>
        </div>

        \${pMatch.isAds ? \`
          <div class="flex items-center justify-between text-[10px] bg-purple-950/50 p-1.5 rounded-lg border border-purple-800 text-purple-200 font-mono">
            <span>💰 Paid Ads Cost:</span>
            <strong class="text-amber-400 font-bold">\${pMatch.costStr || 'Iklan Aktif'}</strong>
          </div>
        \` : ''}

        \${(pMatch.link || post.link) ? \`
          <a href="\${pMatch.link || post.link}" target="_blank" onclick="event.stopPropagation()" class="mt-1 w-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-extrabold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition">
            <span>Lihat Post Asli di Instagram</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
        \` : ''}
      \`;
      card.appendChild(perfBox);
    }`;

if (oldPerfRegex.test(appJs)) {
  appJs = appJs.replace(oldPerfRegex, newPerfBlock);
}

// Add window.navigateToDate
const navigateFn = `
window.navigateToDate = function(dateStr) {
  if (!dateStr) return;
  let y, m, d;
  if (dateStr.includes('/')) {
    const parts = dateStr.split('/');
    d = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10);
    y = parseInt(parts[2], 10);
  } else if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    y = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10);
    d = parseInt(parts[2], 10);
  }
  if (!y || !m || !d) return;

  currentYear = y;
  currentMonth = m - 1;
  selectedDateStr = \`\${y}-\${String(m).padStart(2, '0')}-\${String(d).padStart(2, '0')}\`;

  const monthSelect = document.getElementById("month-select");
  if (monthSelect) monthSelect.value = currentMonth;

  renderCurrentView();
  renderAgendaPanel();
  if (window.lucide) lucide.createIcons();
};
`;

if (!appJs.includes('window.navigateToDate')) {
  appJs += '\n' + navigateFn;
}

fs.writeFileSync('Marketing Calendar/app.js', appJs, 'utf8');
console.log('Successfully updated Marketing Calendar/app.js with full performance breakdown and navigateToDate handler!');
