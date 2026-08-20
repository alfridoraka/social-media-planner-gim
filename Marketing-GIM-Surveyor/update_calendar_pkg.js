const fs = require('fs');

// 1. Update Marketing Calendar/index.html
let indexHtml = fs.readFileSync('Marketing Calendar/index.html', 'utf8');

// Add id to sidebar
indexHtml = indexHtml.replace(
  '<aside class="w-full md:w-20 bg-app-lightSurfaceLight dark:bg-[#0E131D]',
  '<aside id="main-sidebar" class="w-full md:w-20 bg-app-lightSurfaceLight dark:bg-[#0E131D] transition-all duration-300'
);

// Add toggle sidebar button in header
if (!indexHtml.includes('id="btn-toggle-sidebar"')) {
  indexHtml = indexHtml.replace(
    '<h1 class="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">\n                Content Planner 2026\n              </h1>',
    `<div class="flex items-center gap-2">
                <button type="button" onclick="toggleSidebarCollapse()" id="btn-toggle-sidebar" title="Sembunyikan / Tampilkan Menu Kiri" class="p-1.5 rounded-xl bg-slate-100 dark:bg-app-darkSurfaceLight border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-brand-500 transition cursor-pointer">
                  <i data-lucide="panel-left-close" id="sidebar-icon" class="w-4 h-4"></i>
                </button>
                <h1 class="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Content Planner 2026
                </h1>
              </div>`
  );
}

// Add extra modal fields (Hook, RefLink, Hashtags, Notes) before Status in post-form
const oldStatusBlock = '        <!-- Status -->';
const newExtraFieldsBlock = `        <!-- Hook AI & Reference Link -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Hook Kalimat Pembuka (AI)</label>
            <input type="text" id="form-hook" placeholder="Hook kalimat pertama..." class="w-full bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-brand-500">
          </div>
          <div>
            <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Link Referensi (Drive/IG/Web)</label>
            <input type="url" id="form-reflink" placeholder="https://drive.google.com/..." class="w-full bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-brand-500">
          </div>
        </div>

        <!-- Hashtags & Notes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Rekomendasi Hashtags</label>
            <input type="text" id="form-hashtags" placeholder="#GIMSurveyor #GPSRTK..." class="w-full bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-brand-500">
          </div>
          <div>
            <label class="block text-slate-700 dark:text-slate-300 font-bold mb-1">Catatan / Brief Tambahan</label>
            <input type="text" id="form-notes" placeholder="Catatan sudut pandang konten..." class="w-full bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-brand-500">
          </div>
        </div>

        <!-- Status -->`;

if (!indexHtml.includes('id="form-hook"')) {
  indexHtml = indexHtml.replace(oldStatusBlock, newExtraFieldsBlock);
}

fs.writeFileSync('Marketing Calendar/index.html', indexHtml, 'utf8');
console.log('Updated Marketing Calendar/index.html');

// 2. Update Marketing Calendar/app.js
let appJs = fs.readFileSync('Marketing Calendar/app.js', 'utf8');

// Add toggleSidebarCollapse function and auto-collapse detection
const toggleSidebarFn = `
function toggleSidebarCollapse() {
  const sidebar = document.getElementById("main-sidebar");
  const icon = document.getElementById("sidebar-icon");
  if (!sidebar) return;
  
  if (sidebar.style.display === "none" || sidebar.classList.contains("hidden")) {
    sidebar.classList.remove("hidden");
    sidebar.style.display = "";
    if (icon) icon.setAttribute("data-lucide", "panel-left-close");
  } else {
    sidebar.classList.add("hidden");
    sidebar.style.display = "none";
    if (icon) icon.setAttribute("data-lucide", "panel-left-open");
  }
  if (window.lucide) lucide.createIcons();
}

// Auto collapse if embedded in iframe or compact parameter
window.addEventListener("DOMContentLoaded", () => {
  if (window.self !== window.top || window.location.search.includes("compact=true")) {
    const sidebar = document.getElementById("main-sidebar");
    const icon = document.getElementById("sidebar-icon");
    if (sidebar) {
      sidebar.classList.add("hidden");
      sidebar.style.display = "none";
      if (icon) icon.setAttribute("data-lucide", "panel-left-open");
    }
  }
});
`;

if (!appJs.includes('function toggleSidebarCollapse')) {
  appJs += '\n' + toggleSidebarFn;
}

// Add addNewPostFromHub method to window
const hubReceiverFn = `
window.addNewPostFromHub = function(postData) {
  const targetDate = postData.date || postData.targetDate || TODAY_DATE_STR;
  const [y, m] = targetDate.split("-").map(Number);
  
  const newPost = {
    id: "post-" + Date.now(),
    title: postData.title || postData.topic || "Untitled Post",
    date: targetDate,
    month: MONTH_NAMES[m - 1],
    category: postData.category || "Education",
    format: postData.format || "Video / Reels",
    brand: postData.brand || "GIM",
    status: postData.status || "Planned",
    platforms: postData.platforms || ["Instagram"],
    hook: postData.hook || "",
    caption: postData.caption || "",
    hashtags: postData.hashtags || "",
    refLink: postData.refLink || "",
    notes: postData.notes || ""
  };

  calendarPosts.unshift(newPost);
  saveData();

  selectedDateStr = targetDate;
  currentYear = y;
  currentMonth = m - 1;
  const monthSelect = document.getElementById("month-select");
  if (monthSelect) monthSelect.value = currentMonth;

  renderCurrentView();
  renderAgendaPanel();
  if (typeof showToast === "function") {
    showToast(\`✓ Berhasil menjadwalkan "\${newPost.title}" pada \${newPost.date}!\`);
  }
};
`;

if (!appJs.includes('window.addNewPostFromHub')) {
  appJs += '\n' + hubReceiverFn;
}

// Update openNewPostModal to reset hook, reflink, hashtags, notes
appJs = appJs.replace(
  'document.getElementById("form-status").value = "Planned";',
  `document.getElementById("form-status").value = "Planned";
  if (document.getElementById("form-hook")) document.getElementById("form-hook").value = "";
  if (document.getElementById("form-reflink")) document.getElementById("form-reflink").value = "";
  if (document.getElementById("form-hashtags")) document.getElementById("form-hashtags").value = "";
  if (document.getElementById("form-notes")) document.getElementById("form-notes").value = "";`
);

// Update openEditPostModal to populate hook, reflink, hashtags, notes
appJs = appJs.replace(
  'document.getElementById("form-status").value = post.status || "Planned";',
  `document.getElementById("form-status").value = post.status || "Planned";
  if (document.getElementById("form-hook")) document.getElementById("form-hook").value = post.hook || "";
  if (document.getElementById("form-reflink")) document.getElementById("form-reflink").value = post.refLink || "";
  if (document.getElementById("form-hashtags")) document.getElementById("form-hashtags").value = post.hashtags || "";
  if (document.getElementById("form-notes")) document.getElementById("form-notes").value = post.notes || "";`
);

// Update savePost to save hook, reflink, hashtags, notes
appJs = appJs.replace(
  'const status = document.getElementById("form-status").value;',
  `const status = document.getElementById("form-status").value;
  const hook = document.getElementById("form-hook") ? document.getElementById("form-hook").value.trim() : "";
  const refLink = document.getElementById("form-reflink") ? document.getElementById("form-reflink").value.trim() : "";
  const hashtags = document.getElementById("form-hashtags") ? document.getElementById("form-hashtags").value.trim() : "";
  const notes = document.getElementById("form-notes") ? document.getElementById("form-notes").value.trim() : "";`
);

appJs = appJs.replace(
  'platforms: [...selectedPlatforms]',
  'platforms: [...selectedPlatforms], hook, refLink, hashtags, notes'
);

// Enhance agenda card in renderAgendaPanel to show hook & refLink
const oldHeaderInner = '<h3 class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-brand-500 transition line-clamp-2">${post.title}</h3>';
const newHeaderInner = `<h3 class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-brand-500 transition line-clamp-2">\${post.title}</h3>
        \${post.hook ? \`<div class="text-[10px] text-amber-500 dark:text-amber-300 italic bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/20">💡 <strong>Hook:</strong> \${post.hook}</div>\` : ''}
        \${post.refLink ? \`<div class="text-[10px] text-blue-400 truncate"><a href="\${post.refLink}" target="_blank" onclick="event.stopPropagation()" class="underline flex items-center gap-1 hover:text-white"><i data-lucide="link" class="w-3 h-3 shrink-0"></i> \${post.refLink}</a></div>\` : ''}`;

if (!appJs.includes('post.hook ?')) {
  appJs = appJs.replace(oldHeaderInner, newHeaderInner);
}

fs.writeFileSync('Marketing Calendar/app.js', appJs, 'utf8');
console.log('Updated Marketing Calendar/app.js');
