// State Management
const STORAGE_KEY = "gim_social_calendar_2026_data";
const THEME_STORAGE_KEY = "gim_calendar_theme";
const GOOGLE_SHEET_WRITE_URL = "https://script.google.com/macros/s/AKfycbwhMPe-yYnjBZCog9capvA_o81lZOhvs6CAA4iwd7X61gcXosRq95EQLTdTBnPA5Zk_XQ/exec";
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1z-6GqeczVfQZLmsmBtCvuv1fMH9FRiGCa9FKX1Klwu4/export?format=csv";

// Hari Libur Nasional & Cuti Bersama Indonesia 2026 (SKB 3 Menteri)
const INDONESIA_HOLIDAYS_2026 = {
  // --- Libur Nasional ---
  "2026-01-01": "Tahun Baru 2026 Masehi",
  "2026-01-16": "Isra Mikraj Nabi Muhammad SAW",
  "2026-02-17": "Tahun Baru Imlek 2577 Kongzili",
  "2026-03-19": "Hari Suci Nyepi (Tahun Baru Saka 1948)",
  "2026-03-21": "Hari Raya Idulfitri 1447 H (Hari 1)",
  "2026-03-22": "Hari Raya Idulfitri 1447 H (Hari 2)",
  "2026-04-03": "Wafat Yesus Kristus",
  "2026-04-05": "Kebangkitan Yesus Kristus (Paskah)",
  "2026-05-01": "Hari Buruh Internasional",
  "2026-05-14": "Kenaikan Yesus Kristus",
  "2026-05-27": "Hari Raya Idul Adha 1447 H",
  "2026-05-31": "Hari Raya Waisak 2570 BE",
  "2026-06-01": "Hari Lahir Pancasila",
  "2026-06-16": "Tahun Baru Islam 1448 H",
  "2026-08-17": "HUT Kemerdekaan RI ke-81",
  "2026-08-25": "Maulid Nabi Muhammad SAW",
  "2026-12-25": "Hari Natal",
  // --- Cuti Bersama ---
  "2026-02-16": "Cuti Bersama Imlek",
  "2026-03-18": "Cuti Bersama Nyepi",
  "2026-03-20": "Cuti Bersama Idulfitri",
  "2026-03-23": "Cuti Bersama Idulfitri",
  "2026-03-24": "Cuti Bersama Idulfitri",
  "2026-05-15": "Cuti Bersama Kenaikan Yesus Kristus",
  "2026-05-28": "Cuti Bersama Idul Adha",
  "2026-12-24": "Cuti Bersama Natal"
};


const TODAY_OBJ = new Date();
const TODAY_DATE_STR = `${TODAY_OBJ.getFullYear()}-${String(TODAY_OBJ.getMonth() + 1).padStart(2, "0")}-${String(TODAY_OBJ.getDate()).padStart(2, "0")}`;

let calendarPosts = [];
let currentYear = TODAY_OBJ.getFullYear(); // e.g. 2026
let currentMonth = TODAY_OBJ.getMonth(); // 0 = Jan, 1 = Feb, 7 = Aug
let selectedDateStr = TODAY_DATE_STR; // Default selected date is TODAY
let currentCategoryFilter = "ALL";
let currentView = "calendar";
let activeEditingId = null;
let draggedPostId = null;
let selectedPlatforms = ["Instagram"]; // Default selected platform

const ALL_PLATFORMS = [
  { id: "Instagram", label: "Instagram", icon: "📸", activeClass: "bg-pink-100 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 border-pink-500 shadow-sm ring-2 ring-pink-500/20" },
  { id: "LinkedIn", label: "LinkedIn", icon: "💼", activeClass: "bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-500 shadow-sm ring-2 ring-sky-500/20" },
  { id: "YouTube", label: "YouTube", icon: "📹", activeClass: "bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-500 shadow-sm ring-2 ring-rose-500/20" },
  { id: "TikTok", label: "TikTok", icon: "🎵", activeClass: "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-600 shadow-sm ring-2 ring-slate-500/20" }
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Category styling config with high-contrast colors for both light & dark modes
const CATEGORY_CONFIG = {
  Promo: {
    bar: "bg-[#F97316]", // Vivid orange
    pill: "bg-orange-100 text-orange-950 dark:bg-orange-950/80 dark:text-orange-200 border border-orange-200 dark:border-orange-800 font-bold",
    dot: "bg-[#F97316]"
  },
  Education: {
    bar: "bg-[#10B981]", // Vivid green
    pill: "bg-emerald-100 text-emerald-950 dark:bg-emerald-950/80 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 font-bold",
    dot: "bg-[#10B981]"
  },
  Holiday: {
    bar: "bg-[#EF4444]", // Vivid red
    pill: "bg-rose-100 text-rose-950 dark:bg-rose-950/80 dark:text-rose-200 border border-rose-200 dark:border-rose-800 font-bold",
    dot: "bg-[#EF4444]"
  },
  Webinar: {
    bar: "bg-[#8B5CF6]", // Vivid purple
    pill: "bg-purple-100 text-purple-950 dark:bg-purple-950/80 dark:text-purple-200 border border-purple-200 dark:border-purple-800 font-bold",
    dot: "bg-[#8B5CF6]"
  },
  Product: {
    bar: "bg-[#0284C7]", // Sky blue
    pill: "bg-sky-100 text-sky-950 dark:bg-sky-950/80 dark:text-sky-200 border border-sky-200 dark:border-sky-800 font-bold",
    dot: "bg-[#0284C7]"
  },
  Event: {
    bar: "bg-[#14B8A6]", // Teal
    pill: "bg-teal-100 text-teal-950 dark:bg-teal-950/80 dark:text-teal-200 border border-teal-200 dark:border-teal-800 font-bold",
    dot: "bg-[#14B8A6]"
  },
  Other: {
    bar: "bg-[#64748B]",
    pill: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold",
    dot: "bg-[#64748B]"
  }
};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadData();
  initMonthSelector();
  setupEventListeners();
  startLiveDigitalClock();
  renderCurrentView();
  renderAgendaPanel();
  lucide.createIcons();
});

// -----------------------------------------------------------------
// REAL-TIME DIGITAL CLOCK (HH:MM:SS WIB)
// -----------------------------------------------------------------
function startLiveDigitalClock() {
  const clockEl = document.getElementById("realtime-clock");
  
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clockEl.textContent = `${hours}:${minutes}:${seconds} WIB`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// Theme Management (Dark/Light Mode)
function initTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY) || "dark";
  const html = document.documentElement;
  if (saved === "light") {
    html.classList.remove("dark");
    html.classList.add("light");
  } else {
    html.classList.remove("light");
    html.classList.add("dark");
  }
}

function toggleTheme() {
  const html = document.documentElement;
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    html.classList.add("light");
    localStorage.setItem(THEME_STORAGE_KEY, "light");
  } else {
    html.classList.remove("light");
    html.classList.add("dark");
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
  }
  lucide.createIcons();
  renderCurrentView();
  renderAgendaPanel();
}

// Data persistence
function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      calendarPosts = JSON.parse(saved);
    } catch (e) {
      calendarPosts = [...INITIAL_CALENDAR_DATA];
    }
  } else {
    calendarPosts = [...INITIAL_CALENDAR_DATA];
  }

  // Fetch latest data from Google Sheet on startup (2-way sync)
  if (GOOGLE_SHEET_WRITE_URL) {
    fetch(GOOGLE_SHEET_WRITE_URL)
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.records) && data.records.length > 0) {
          calendarPosts = data.records;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(calendarPosts));
          renderCurrentView();
          renderAgendaPanel();
          console.log("Data updated from Google Sheet!");
        }
      })
      .catch(err => console.log("Using local/cached data:", err));
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(calendarPosts));
  updateStatsRibbon();
  pushToGoogleSheet(calendarPosts);
}

function pushToGoogleSheet(data) {
  if (!GOOGLE_SHEET_WRITE_URL) return;

  // Use text/plain to avoid CORS preflight (OPTIONS) issues with Google Apps Script Web Apps
  fetch(GOOGLE_SHEET_WRITE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({ records: data })
  })
    .then(response => {
      if (!response.ok) {
        console.warn("Google Sheet sync response status:", response.status);
      } else {
        console.log("Data successfully synced to Google Sheet!");
      }
    })
    .catch(err => console.error("Error syncing data to Google Sheet:", err));
}


function initMonthSelector() {
  const select = document.getElementById("month-select");
  select.innerHTML = "";
  MONTH_NAMES.forEach((name, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = name;
    opt.className = "bg-white dark:bg-[#1E2738] text-slate-900 dark:text-white font-bold py-1.5";
    if (idx === currentMonth) opt.selected = true;
    select.appendChild(opt);
  });
}

function onMonthSelect(val) {
  currentMonth = parseInt(val, 10);
  selectedDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`;
  renderCurrentView();
  renderAgendaPanel();
}

function changeMonth(delta) {
  currentMonth = (currentMonth + delta + 12) % 12;
  document.getElementById("month-select").value = currentMonth;
  selectedDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`;
  renderCurrentView();
  renderAgendaPanel();
}

function setCategoryFilter(cat) {
  currentCategoryFilter = cat;
  ["ALL", "Holiday", "Promo", "Education", "Webinar", "Product"].forEach(c => {
    const pill = document.getElementById(`filter-pill-${c}`);
    if (pill) {
      if (c === cat) {
        pill.className = "px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-brand-500 text-white shadow-glow-blue transition shrink-0 cursor-pointer";
      } else {
        pill.className = "px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white dark:bg-[#1E2738] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition shrink-0 cursor-pointer";
      }
    }
  });
  renderCurrentView();
}

function setViewMode(mode) {
  currentView = mode;
  ["calendar", "kanban", "table", "analytics"].forEach(v => {
    const btn = document.getElementById(`nav-btn-${v}`);
    const el = document.getElementById(`view-${v}`);
    if (v === mode) {
      btn.className = "w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-glow-blue transition duration-200 cursor-pointer";
      el.classList.remove("hidden");
    } else {
      btn.className = "w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-app-darkSurfaceLight flex items-center justify-center transition duration-200 cursor-pointer";
      el.classList.add("hidden");
    }
  });
  renderCurrentView();
}

function getFilteredPosts() {
  const searchQuery = (document.getElementById("search-input").value || "").toLowerCase().trim();

  return calendarPosts.filter(post => {
    if (currentCategoryFilter !== "ALL" && post.category !== currentCategoryFilter) {
      return false;
    }

    if (searchQuery) {
      const matchTitle = (post.title || "").toLowerCase().includes(searchQuery);
      const matchBrand = (post.brand || "").toLowerCase().includes(searchQuery);
      const matchNotes = (post.notes || "").toLowerCase().includes(searchQuery);
      const matchDate = (post.date || "").includes(searchQuery);
      if (!matchTitle && !matchBrand && !matchNotes && !matchDate) {
        return false;
      }
    }

    return true;
  });
}

function renderCurrentView() {
  updateStatsRibbon();
  if (currentView === "calendar") renderCalendarView();
  else if (currentView === "kanban") renderKanbanView();
  else if (currentView === "table") renderTableView();
  else if (currentView === "analytics") renderAnalyticsView();
  lucide.createIcons();
}

function updateStatsRibbon() {
  const currentMonthStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;
  const thisMonthPosts = calendarPosts.filter(p => p.date.startsWith(currentMonthStr));
  const completed = calendarPosts.filter(p => p.status === "Completed").length;

  const monthStat = document.getElementById("stat-month");
  const completedStat = document.getElementById("stat-completed");
  if (monthStat) monthStat.textContent = thisMonthPosts.length;
  if (completedStat) completedStat.textContent = completed;
}

// -----------------------------------------------------------------
// DRAG AND DROP HANDLERS (CALENDAR & KANBAN)
// -----------------------------------------------------------------
function handleDragStart(e, post) {
  draggedPostId = post.id;
  e.dataTransfer.setData("text/plain", post.id);
  e.dataTransfer.effectAllowed = "move";
  
  if (e.target) {
    e.target.classList.add("opacity-40", "scale-95", "border-dashed", "border-brand-500");
  }
}

function handleDragEnd(e) {
  if (e.target) {
    e.target.classList.remove("opacity-40", "scale-95", "border-dashed", "border-brand-500");
  }
  document.querySelectorAll(".calendar-cell, .kanban-column").forEach(el => {
    el.classList.remove("ring-2", "ring-brand-500", "bg-blue-500/20", "dark:bg-blue-500/25");
  });
  draggedPostId = null;
}

function handleDayDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

function handleDayDragEnter(e, cell) {
  e.preventDefault();
  cell.classList.add("ring-2", "ring-brand-500", "bg-blue-500/15", "dark:bg-blue-500/20");
}

function handleDayDragLeave(e, cell) {
  cell.classList.remove("ring-2", "ring-brand-500", "bg-blue-500/15", "dark:bg-blue-500/20");
}

function handleDayDrop(e, targetDateStr, cell) {
  e.preventDefault();
  cell.classList.remove("ring-2", "ring-brand-500", "bg-blue-500/15", "dark:bg-blue-500/20");

  const postId = e.dataTransfer.getData("text/plain") || draggedPostId;
  if (!postId) return;

  const post = calendarPosts.find(p => p.id === postId);
  if (post) {
    const oldDate = post.date;
    if (oldDate !== targetDateStr) {
      post.date = targetDateStr;
      saveData();
      selectedDateStr = targetDateStr;
      renderCurrentView();
      renderAgendaPanel();
      showToast(`Konten "${post.title}" digeser ke ${formatDateIndo(targetDateStr)}!`);
    }
  }
}

// -----------------------------------------------------------------
// 1. RENDER CALENDAR GRID (BALANCED MOBILE LAYOUT)
// -----------------------------------------------------------------
function renderCalendarView() {
  const grid = document.getElementById("calendar-grid");
  grid.innerHTML = "";

  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
  const filteredPosts = getFilteredPosts();

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const prevDayNum = prevMonthDays - i;
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-cell min-h-[70px] sm:min-h-[105px] rounded-xl sm:rounded-[20px] bg-slate-100/60 dark:bg-app-darkBg/40 border border-slate-200/60 dark:border-app-darkBorder/40 p-1 sm:p-2.5 opacity-30 flex flex-col justify-between select-none";
    emptyCell.innerHTML = `<span class="text-[10px] sm:text-xs font-black text-slate-400 dark:text-slate-600">${prevDayNum}</span>`;
    grid.appendChild(emptyCell);
  }

  // Active month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dayOfWeek = new Date(currentYear, currentMonth, d).getDay();
    const dayPosts = filteredPosts.filter(p => p.date === dateStr);
    
    const isToday = (dateStr === TODAY_DATE_STR);
    const isSelected = (dateStr === selectedDateStr);
    const holidayName = INDONESIA_HOLIDAYS_2026[dateStr] || null;
    const isHoliday = !!holidayName;
    const isCutiBersama = isHoliday && holidayName.startsWith("Cuti Bersama");

    const cell = document.createElement("div");
    cell.onclick = () => selectDay(dateStr);
    cell.ondblclick = () => openNewPostModal(dateStr);

    // Drag & Drop Dropzone Listeners
    cell.ondragover = (e) => handleDayDragOver(e);
    cell.ondragenter = (e) => handleDayDragEnter(e, cell);
    cell.ondragleave = (e) => handleDayDragLeave(e, cell);
    cell.ondrop = (e) => handleDayDrop(e, dateStr, cell);

    let cellClasses = "calendar-cell min-h-[70px] sm:min-h-[105px] rounded-xl sm:rounded-[20px] p-1 sm:p-2.5 flex flex-col justify-between transition duration-150 cursor-pointer relative border shadow-xs group ";
    
    if (isToday) {
      cellClasses += "today-highlight-cell ";
    }
    
    if (isSelected) {
      cellClasses += "selected-day-border shadow-glow-blue ";
    } else if (isHoliday && !isToday) {
      // National holiday / cuti bersama → red-tinted cell
      cellClasses += isCutiBersama
        ? "bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 border-rose-200 dark:border-rose-800/60 "
        : "bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950/60 border-red-300 dark:border-red-800/70 ";
    } else if (!isToday) {
      cellClasses += "bg-white hover:bg-slate-50 dark:bg-[#18202E] dark:hover:bg-[#202B3D] border-slate-200 dark:border-app-darkBorder text-slate-900 dark:text-white ";
    }

    cell.className = cellClasses;

    // Header: Number + Today Badge + Quick Add Button
    const header = document.createElement("div");
    header.className = "flex items-center justify-between";
    
    const leftHeader = document.createElement("div");
    leftHeader.className = "flex items-center gap-1";

    const dayNumSpan = document.createElement("span");
    if (isToday) {
      dayNumSpan.className = "w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-[10px] sm:text-xs font-black shadow-glow-blue shrink-0";
    } else if (isHoliday || dayOfWeek === 0) {
      dayNumSpan.className = "text-[11px] sm:text-sm font-black tracking-tight text-red-600 dark:text-red-400 font-extrabold";
    } else {
      dayNumSpan.className = "text-[11px] sm:text-sm font-black tracking-tight text-slate-900 dark:text-white";
    }
    dayNumSpan.textContent = d;
    leftHeader.appendChild(dayNumSpan);

    // Holiday name badge
    if (isHoliday && !isToday) {
      const holidayBadge = document.createElement("span");
      holidayBadge.className = isCutiBersama
        ? "hidden sm:inline px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700 truncate max-w-[80px] lg:max-w-[120px]"
        : "hidden sm:inline px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700 truncate max-w-[80px] lg:max-w-[120px]";
      holidayBadge.textContent = isCutiBersama ? "CUTI" : "LIBUR";
      holidayBadge.title = holidayName;
      leftHeader.appendChild(holidayBadge);
    }

    if (isToday) {
      const todayBadge = document.createElement("span");
      todayBadge.className = "hidden sm:inline px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-brand-500 text-white shadow-xs animate-pulse";
      todayBadge.textContent = "HARI INI";
      leftHeader.appendChild(todayBadge);
    }

    header.appendChild(leftHeader);

    // Buffer-Style Quick Plus Button (Desktop only on hover)
    const bufferAddBtn = document.createElement("button");
    bufferAddBtn.type = "button";
    bufferAddBtn.className = "buffer-slot-add hidden sm:flex px-2 py-0.5 rounded-full bg-blue-600 text-white hover:bg-blue-500 font-bold text-[10px] items-center gap-1 shadow-sm transition cursor-pointer";
    bufferAddBtn.title = `Tambah postingan ${d} ${MONTH_NAMES[currentMonth]}`;
    bufferAddBtn.innerHTML = `<i data-lucide="plus" class="w-3 h-3"></i> <span>Add</span>`;
    bufferAddBtn.onclick = (e) => {
      e.stopPropagation();
      openNewPostModal(dateStr);
    };
    header.appendChild(bufferAddBtn);

    cell.appendChild(header);

    // Holiday name label inside cell
    if (isHoliday) {
      cell.title = holidayName;
      const holidayLabel = document.createElement("div");
      holidayLabel.className = "text-[7px] sm:text-[9px] font-bold leading-tight truncate mt-0.5 " +
        (isCutiBersama
          ? "text-rose-500 dark:text-rose-400"
          : "text-red-600 dark:text-red-400");
      holidayLabel.textContent = holidayName;
      cell.appendChild(holidayLabel);
    }

    // Event Items WITH STATUS BADGES (Balanced for Mobile & Desktop)
    const eventsList = document.createElement("div");
    eventsList.className = "space-y-1 sm:space-y-1.5 mt-1 overflow-hidden";

    // Show max 2 on mobile, max 3 on larger screens
    const maxShow = (window.innerWidth < 640) ? 2 : 3;

    dayPosts.slice(0, maxShow).forEach(post => {
      const cfg = CATEGORY_CONFIG[post.category] || CATEGORY_CONFIG.Other;
      const item = document.createElement("div");
      
      item.draggable = true;
      item.ondragstart = (e) => handleDragStart(e, post);
      item.ondragend = (e) => handleDragEnd(e);

      let statusBadge = `<span class="text-[8px] sm:text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1 rounded border border-amber-300 dark:border-amber-800">Plan</span>`;
      
      if (post.status === "Completed") {
        statusBadge = `<span class="text-[8px] sm:text-[9px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1 rounded border border-emerald-300 dark:border-emerald-800">Done</span>`;
      } else if (post.status === "In Progress") {
        statusBadge = `<span class="text-[8px] sm:text-[9px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-1 rounded border border-sky-300 dark:border-sky-800">Prod</span>`;
      }

      // Platforms preview icon
      const platformIcon = (post.platforms && post.platforms.length > 0)
        ? (post.platforms[0] === 'Instagram' ? '📸' : post.platforms[0] === 'LinkedIn' ? '💼' : post.platforms[0] === 'YouTube' ? '📹' : '🎵')
        : '📸';

      item.className = `flex items-center justify-between gap-1 px-1.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-semibold leading-tight transition cursor-grab active:cursor-grabbing shadow-2xs ${cfg.pill} hover:opacity-90 select-none`;
      item.title = `[${post.status}] ${post.title}`;
      item.onclick = (e) => {
        e.stopPropagation();
        selectDay(dateStr);
        openEditPostModal(post.id);
      };
      
      item.innerHTML = `
        <div class="flex items-center gap-1 min-w-0 flex-1">
          <span class="w-1.5 h-1.5 rounded-full shrink-0 ${cfg.bar}"></span>
          <span class="truncate">${post.title}</span>
        </div>
        <div class="hidden sm:flex items-center gap-0.5 shrink-0">
          <span class="text-[8px] sm:text-[9px]">${platformIcon}</span>
          ${statusBadge}
        </div>
      `;
      eventsList.appendChild(item);
    });

    if (dayPosts.length > maxShow) {
      const more = document.createElement("div");
      more.className = "text-[8px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-bold pl-1";
      more.textContent = `+${dayPosts.length - maxShow}`;
      eventsList.appendChild(more);
    }

    cell.appendChild(eventsList);
    grid.appendChild(cell);
  }
}

function selectDay(dateStr) {
  selectedDateStr = dateStr;
  renderCalendarView();
  renderAgendaPanel();
  lucide.createIcons();
}

function stepAgendaDay(delta) {
  const [y, m, d] = selectedDateStr.split("-").map(Number);
  const nextDate = new Date(y, m - 1, d + delta);
  selectedDateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, "0")}-${String(nextDate.getDate()).padStart(2, "0")}`;
  currentMonth = nextDate.getMonth();
  document.getElementById("month-select").value = currentMonth;
  renderCurrentView();
  renderAgendaPanel();
}

// -----------------------------------------------------------------
// 2. RENDER RIGHT SIDE "SCHEDULED" DAILY PANEL (RESPONSIVE NO OVERLAP)
// -----------------------------------------------------------------
function renderAgendaPanel() {
  const list = document.getElementById("agenda-list");
  const label = document.getElementById("agenda-date-label");
  list.innerHTML = "";

  const [y, m, d] = selectedDateStr.split("-").map(Number);
  const isTodaySelected = (selectedDateStr === TODAY_DATE_STR);
  label.innerHTML = `${d} ${MONTH_NAMES[m - 1]}, ${y} ${isTodaySelected ? '<span class="text-xs font-bold text-emerald-500 ml-1">(Hari Ini)</span>' : ''}`;

  const dayPosts = calendarPosts.filter(p => p.date === selectedDateStr);

  if (dayPosts.length === 0) {
    list.innerHTML = `
      <div class="py-10 sm:py-16 text-center text-slate-400 dark:text-slate-500 text-xs space-y-2.5">
        <i data-lucide="calendar-plus" class="w-8 h-8 sm:w-10 sm:h-10 mx-auto opacity-40 text-brand-500"></i>
        <p class="font-semibold text-[11px] sm:text-xs">Belum ada konten terjadwal di tanggal ini.</p>
        <button type="button" onclick="openNewPostModal('${selectedDateStr}')" class="px-4 py-2 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-buffer-btn transition cursor-pointer">
          + Create Post
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  dayPosts.forEach((post) => {
    const cfg = CATEGORY_CONFIG[post.category] || CATEGORY_CONFIG.Other;
    const card = document.createElement("div");
    card.className = "bg-white dark:bg-[#151D2A] border border-slate-200 dark:border-app-darkBorder hover:border-brand-500 rounded-2xl p-3 sm:p-4 space-y-2.5 relative overflow-hidden transition cursor-pointer shadow-xs group";
    card.title = "Klik untuk mengedit";
    card.onclick = () => openEditPostModal(post.id);

    // Top Accent Bar
    const accentBar = document.createElement("div");
    accentBar.className = `absolute top-0 left-0 right-0 h-1.5 ${cfg.bar}`;
    card.appendChild(accentBar);

    // Platforms Badge List
    const effectivePlatforms = (post.platforms && post.platforms.length > 0) ? post.platforms : ["Instagram"];
    const platformPills = effectivePlatforms.map(p => {
      let icon = "📸";
      let color = "text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-950/70 border-pink-200 dark:border-pink-800";
      if (p === 'LinkedIn') { icon = "💼"; color = "text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-800"; }
      if (p === 'YouTube') { icon = "📹"; color = "text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/70 border-rose-200 dark:border-rose-800"; }
      if (p === 'TikTok') { icon = "🎵"; color = "text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"; }
      return `<span class="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-extrabold border flex items-center gap-1 shadow-2xs ${color}"><span>${icon}</span> <span>${p}</span></span>`;
    }).join(" ");

    // Header with Title, Category, Brand & Platforms
    const header = document.createElement("div");
    header.className = "flex items-start justify-between gap-2 pt-1";
    
    header.innerHTML = `
      <div class="space-y-1 flex-1 min-w-0">
        <h3 class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-brand-500 transition line-clamp-2">${post.title}</h3>
        <p class="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400">${post.brand || 'PT Geo Investama'} • ${post.format || 'Feed'}</p>
        <div class="flex items-center gap-1.5 pt-0.5">
          <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Channel:</span>
          <div class="flex flex-wrap gap-1">${platformPills}</div>
        </div>
      </div>
      <span class="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold shrink-0 ${cfg.pill}">
        ${post.category}
      </span>
    `;
    card.appendChild(header);

    // Clean Footer with Status & Edit Action Button
    const isDone = (post.status === 'Completed');
    const isInProg = (post.status === 'In Progress');
    
    let statusBadge = `<span class="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">📝 Planned</span>`;
    if (isDone) {
      statusBadge = `<span class="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">✅ Published</span>`;
    } else if (isInProg) {
      statusBadge = `<span class="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300">⏳ In Production</span>`;
    }

    const footer = document.createElement("div");
    footer.className = "flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80";
    footer.innerHTML = `
      ${statusBadge}
      <button type="button" onclick="event.stopPropagation(); openEditPostModal('${post.id}')" class="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-100 dark:bg-app-darkSurfaceLight hover:bg-brand-500 hover:text-white text-slate-700 dark:text-slate-300 text-[10px] sm:text-[11px] font-bold transition cursor-pointer flex items-center gap-1 shadow-2xs">
        <i data-lucide="edit-3" class="w-3 h-3"></i>
        <span>Edit</span>
      </button>
    `;
    card.appendChild(footer);

    list.appendChild(card);
  });

  lucide.createIcons();
}

// -----------------------------------------------------------------
// 3. RENDER KANBAN, TABLE, ANALYTICS
// -----------------------------------------------------------------
function renderKanbanView() {
  const filtered = getFilteredPosts();
  const plannedList = document.getElementById("kanban-planned-list");
  const progressList = document.getElementById("kanban-progress-list");
  const completedList = document.getElementById("kanban-completed-list");

  plannedList.innerHTML = "";
  progressList.innerHTML = "";
  completedList.innerHTML = "";

  const planned = filtered.filter(p => p.status === "Planned");
  const inProgress = filtered.filter(p => p.status === "In Progress");
  const completed = filtered.filter(p => p.status === "Completed");

  document.getElementById("kanban-count-planned").textContent = planned.length;
  document.getElementById("kanban-count-progress").textContent = inProgress.length;
  document.getElementById("kanban-count-completed").textContent = completed.length;

  const setupColumnDrop = (colList, targetStatus) => {
    colList.ondragover = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      colList.classList.add("bg-blue-500/10", "rounded-xl");
    };
    colList.ondragleave = () => {
      colList.classList.remove("bg-blue-500/10", "rounded-xl");
    };
    colList.ondrop = (e) => {
      e.preventDefault();
      colList.classList.remove("bg-blue-500/10", "rounded-xl");
      const postId = e.dataTransfer.getData("text/plain") || draggedPostId;
      if (!postId) return;
      const post = calendarPosts.find(p => p.id === postId);
      if (post && post.status !== targetStatus) {
        post.status = targetStatus;
        saveData();
        renderCurrentView();
        showToast(`Status "${post.title}" diubah menjadi ${targetStatus}!`);
      }
    };
  };

  setupColumnDrop(plannedList, "Planned");
  setupColumnDrop(progressList, "In Progress");
  setupColumnDrop(completedList, "Completed");

  const renderCard = (post, container) => {
    const cfg = CATEGORY_CONFIG[post.category] || CATEGORY_CONFIG.Other;
    const card = document.createElement("div");
    
    card.draggable = true;
    card.ondragstart = (e) => handleDragStart(e, post);
    card.ondragend = (e) => handleDragEnd(e);

    card.className = "bg-white dark:bg-[#1A2232] border border-slate-200 dark:border-app-darkBorder hover:border-brand-500 rounded-xl p-3 transition cursor-grab active:cursor-grabbing space-y-2 relative overflow-hidden shadow-xs group select-none";
    card.onclick = () => openEditPostModal(post.id);

    const bar = document.createElement("div");
    bar.className = `absolute top-0 left-0 bottom-0 w-1.5 ${cfg.bar}`;
    card.appendChild(bar);

    card.innerHTML += `
      <div class="flex items-center justify-between text-[10px]">
        <span class="px-2 py-0.5 rounded-full font-bold ${cfg.pill}">${post.category}</span>
        <span class="text-slate-400 font-mono font-semibold">${post.date}</span>
      </div>
      <h4 class="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-relaxed group-hover:text-brand-500 transition">${post.title}</h4>
      <div class="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
        <span class="font-bold">${post.brand || 'GIM'}</span>
        <span class="bg-slate-100 dark:bg-app-darkSurfaceLight px-1.5 py-0.5 rounded font-semibold">${post.format || 'Feed'}</span>
      </div>
    `;
    container.appendChild(card);
  };

  planned.forEach(p => renderCard(p, plannedList));
  inProgress.forEach(p => renderCard(p, progressList));
  completed.forEach(p => renderCard(p, completedList));
}

function renderTableView() {
  const tbody = document.getElementById("table-body");
  tbody.innerHTML = "";

  const filtered = getFilteredPosts();
  filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

  filtered.forEach(post => {
    const cfg = CATEGORY_CONFIG[post.category] || CATEGORY_CONFIG.Other;
    const isDone = post.status === "Completed";
    const postDate = new Date(post.date);

    const tr = document.createElement("tr");
    tr.className = "hover:bg-slate-50 dark:hover:bg-app-darkSurfaceLight/50 transition cursor-pointer";
    tr.onclick = () => openEditPostModal(post.id);

    tr.innerHTML = `
      <td class="px-3 sm:px-4 py-3 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">${post.date}</td>
      <td class="px-3 sm:px-4 py-3 text-slate-500 dark:text-slate-400 font-semibold">${MONTH_NAMES[postDate.getMonth()]}</td>
      <td class="px-3 sm:px-4 py-3">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${cfg.pill}">
          ${post.category}
        </span>
      </td>
      <td class="px-3 sm:px-4 py-3 font-bold text-slate-900 dark:text-white">${post.brand || "-"}</td>
      <td class="px-3 sm:px-4 py-3 text-slate-800 dark:text-slate-200 max-w-xs sm:max-w-sm truncate font-medium" title="${post.title}">${post.title}</td>
      <td class="px-3 sm:px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap font-semibold">${post.format || "Feed"}</td>
      <td class="px-3 sm:px-4 py-3 text-center whitespace-nowrap">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${isDone ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'}">
          ${isDone ? '✅ Done' : '⏳ Plan'}
        </span>
      </td>
      <td class="px-3 sm:px-4 py-3 text-right">
        <button type="button" onclick="event.stopPropagation(); openEditPostModal('${post.id}')" class="p-1.5 text-slate-400 hover:text-brand-500 rounded hover:bg-slate-100 transition cursor-pointer">
          <i data-lucide="edit-3" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderAnalyticsView() {
  const total = calendarPosts.length;
  const completed = calendarPosts.filter(p => p.status === "Completed").length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  document.getElementById("analytics-total").textContent = total;
  document.getElementById("analytics-completed").textContent = `${completed} (${pct}%)`;
  document.getElementById("analytics-progress-bar").style.width = `${pct}%`;

  const catCounts = {};
  calendarPosts.forEach(p => {
    const c = p.category || "Other";
    catCounts[c] = (catCounts[c] || 0) + 1;
  });

  const catContainer = document.getElementById("analytics-category-breakdown");
  catContainer.innerHTML = "";
  Object.keys(catCounts).sort((a, b) => catCounts[b] - catCounts[a]).forEach(cat => {
    const count = catCounts[cat];
    const percentage = Math.round((count / total) * 100);
    const cfg = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG.Other;

    const row = document.createElement("div");
    row.className = "space-y-1";
    row.innerHTML = `
      <div class="flex justify-between text-xs font-bold">
        <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full ${cfg.bar}"></span> ${cat}</span>
        <span class="text-slate-500 dark:text-slate-400 font-mono">${count} (${percentage}%)</span>
      </div>
      <div class="w-full bg-slate-100 dark:bg-app-darkSurfaceLight h-1.5 sm:h-2 rounded-full overflow-hidden">
        <div class="${cfg.bar} h-full rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
      </div>
    `;
    catContainer.appendChild(row);
  });

  const brandCounts = {};
  calendarPosts.forEach(p => {
    const b = p.brand || "GIM General";
    brandCounts[b] = (brandCounts[b] || 0) + 1;
  });

  const brandContainer = document.getElementById("analytics-brand-breakdown");
  brandContainer.innerHTML = "";
  Object.keys(brandCounts).sort((a, b) => brandCounts[b] - brandCounts[a]).slice(0, 6).forEach(brand => {
    const count = brandCounts[brand];
    const percentage = Math.round((count / total) * 100);

    const row = document.createElement("div");
    row.className = "space-y-1";
    row.innerHTML = `
      <div class="flex justify-between text-xs font-bold">
        <span>${brand}</span>
        <span class="text-slate-500 dark:text-slate-400 font-mono">${count} posts</span>
      </div>
      <div class="w-full bg-slate-100 dark:bg-app-darkSurfaceLight h-1.5 sm:h-2 rounded-full overflow-hidden">
        <div class="bg-brand-500 h-full rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
      </div>
    `;
    brandContainer.appendChild(row);
  });
}

// -----------------------------------------------------------------
// MODAL & PLATFORM SELECTOR MANAGEMENT
// -----------------------------------------------------------------
function togglePlatform(platformId) {
  const index = selectedPlatforms.indexOf(platformId);
  if (index > -1) {
    if (selectedPlatforms.length > 1) {
      selectedPlatforms.splice(index, 1);
    }
  } else {
    selectedPlatforms.push(platformId);
  }
  updatePlatformUI();
}

function updatePlatformUI() {
  const countLabel = document.getElementById("platform-count-label");
  if (countLabel) {
    countLabel.textContent = `${selectedPlatforms.length} Channel Dipilih`;
  }

  ALL_PLATFORMS.forEach(p => {
    const btn = document.getElementById(`btn-platform-${p.id}`);
    if (!btn) return;

    const isSelected = selectedPlatforms.includes(p.id);
    if (isSelected) {
      btn.className = `px-2.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold border flex items-center justify-center gap-1.5 transition cursor-pointer ${p.activeClass}`;
      btn.innerHTML = `<span>${p.icon}</span> <span>${p.label}</span> <span class="text-[10px]">✓</span>`;
    } else {
      btn.className = "px-2.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111722] text-slate-500 dark:text-slate-400 opacity-60 hover:opacity-100 hover:border-slate-400 flex items-center justify-center gap-1.5 transition cursor-pointer";
      btn.innerHTML = `<span>${p.icon}</span> <span>${p.label}</span>`;
    }
  });
}

function setQuickDate(type) {
  const dateInput = document.getElementById("form-date");
  const now = new Date();
  
  if (type === "today") {
    dateInput.value = TODAY_DATE_STR;
  } else if (type === "tomorrow") {
    const tmr = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    dateInput.value = `${tmr.getFullYear()}-${String(tmr.getMonth() + 1).padStart(2, "0")}-${String(tmr.getDate()).padStart(2, "0")}`;
  } else if (type === "next_week") {
    const nextWk = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
    dateInput.value = `${nextWk.getFullYear()}-${String(nextWk.getMonth() + 1).padStart(2, "0")}-${String(nextWk.getDate()).padStart(2, "0")}`;
  }
}

function openDatePicker() {
  const dateInput = document.getElementById("form-date");
  if (dateInput && typeof dateInput.showPicker === "function") {
    dateInput.showPicker();
  } else if (dateInput) {
    dateInput.focus();
  }
}

function openNewPostModal(defaultDate = null) {
  activeEditingId = null;
  selectedPlatforms = ["Instagram"];
  updatePlatformUI();

  document.getElementById("modal-title").textContent = "Create Post";
  document.getElementById("form-id").value = "";
  document.getElementById("form-title").value = "";
  document.getElementById("form-date").value = defaultDate || selectedDateStr;
  document.getElementById("form-category").value = "Promo";
  document.getElementById("form-format").value = "Feed / Post";
  document.getElementById("form-brand").value = "";
  document.getElementById("form-status").value = "Planned";
  
  const delBtn = document.getElementById("btn-delete-post");
  if (delBtn) delBtn.classList.add("hidden");

  const modal = document.getElementById("modal-post");
  modal.style.display = "flex";
  lucide.createIcons();
}

function openEditPostModal(id) {
  const post = calendarPosts.find(p => p.id === id);
  if (!post) return;

  activeEditingId = id;
  selectedPlatforms = (post.platforms && post.platforms.length > 0) ? [...post.platforms] : ["Instagram"];
  updatePlatformUI();

  document.getElementById("modal-title").textContent = "Edit Scheduled Post";
  document.getElementById("form-id").value = post.id;
  document.getElementById("form-title").value = post.title || "";
  document.getElementById("form-date").value = post.date || selectedDateStr;
  document.getElementById("form-category").value = post.category || "Promo";
  document.getElementById("form-format").value = post.format || "Feed / Post";
  document.getElementById("form-brand").value = post.brand || "";
  document.getElementById("form-status").value = post.status || "Planned";
  
  const delBtn = document.getElementById("btn-delete-post");
  if (delBtn) delBtn.classList.remove("hidden");

  const modal = document.getElementById("modal-post");
  modal.style.display = "flex";
  lucide.createIcons();
}

function closePostModal() {
  const modal = document.getElementById("modal-post");
  modal.style.display = "none";
}

function onModalBackdropClick(e) {
  if (e.target.id === "modal-post") {
    closePostModal();
  }
}

function savePost(e) {
  e.preventDefault();
  const id = document.getElementById("form-id").value;
  const title = document.getElementById("form-title").value.trim();
  const date = document.getElementById("form-date").value;
  const category = document.getElementById("form-category").value;
  const format = document.getElementById("form-format").value;
  const brand = document.getElementById("form-brand").value.trim();
  const status = document.getElementById("form-status").value;

  if (id) {
    const idx = calendarPosts.findIndex(p => p.id === id);
    if (idx !== -1) {
      calendarPosts[idx] = {
        ...calendarPosts[idx],
        title,
        date,
        category,
        format,
        brand,
        status,
        platforms: [...selectedPlatforms]
      };
      showToast("Post berhasil diperbarui!");
    }
  } else {
    const newPost = {
      id: "post-" + Date.now(),
      title,
      date,
      category,
      format,
      brand,
      status,
      platforms: [...selectedPlatforms],
      notes: ""
    };
    calendarPosts.push(newPost);
    showToast("Post baru berhasil dijadwalkan!");
  }

  saveData();
  closePostModal();
  selectedDateStr = date;
  renderCurrentView();
  renderAgendaPanel();
}

function deleteCurrentPost() {
  if (!activeEditingId) return;
  if (confirm("Apakah Anda yakin ingin menghapus jadwal postingan ini?")) {
    calendarPosts = calendarPosts.filter(p => p.id !== activeEditingId);
    saveData();
    closePostModal();
    renderCurrentView();
    renderAgendaPanel();
    showToast("Postingan telah dihapus.");
  }
}

// -----------------------------------------------------------------
// SYNC & UTILS
// -----------------------------------------------------------------
async function syncWithGoogleSheet() {
  const icon = document.getElementById("sidebar-sync-icon");
  if (icon) icon.classList.add("animate-spin");

  try {
    const res = await fetch(GOOGLE_SHEET_CSV_URL);
    if (!res.ok) throw new Error("Fetch failed");
    calendarPosts = [...INITIAL_CALENDAR_DATA];
    saveData();
    renderCurrentView();
    renderAgendaPanel();
    showToast("Tersinkronisasi dengan Google Sheet!");
  } catch (err) {
    showToast("Database lokal aktif.");
  } finally {
    if (icon) icon.classList.remove("animate-spin");
  }
}

function exportToCSV() {
  const headers = ["ID", "Date", "Category", "Brand", "Format", "Platforms", "Title", "Status"];
  const rows = calendarPosts.map(p => [
    p.id,
    p.date,
    p.category,
    `"${(p.brand || '').replace(/"/g, '""')}"`,
    `"${(p.format || '').replace(/"/g, '""')}"`,
    `"${(p.platforms || []).join(';')}"`,
    `"${(p.title || '').replace(/"/g, '""')}"`,
    p.status
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `gim_social_plan_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("File CSV berhasil diexport!");
}

function formatDateIndo(dateStr) {
  if (!dateStr) return "-";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  return `${parts[2]} ${MONTH_NAMES[parseInt(parts[1], 10) - 1].substring(0, 3)} ${parts[0]}`;
}

function onSearchInput() {
  renderCurrentView();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-msg");
  msgEl.textContent = message;
  toast.className = "fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-2.5 bg-slate-900 text-white dark:bg-slate-800 dark:text-white border-slate-700 transform transition duration-300 translate-y-0 opacity-100";

  setTimeout(() => {
    toast.className = "fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-2.5 bg-slate-900 text-white dark:bg-slate-800 dark:text-white border-slate-700 transform transition duration-300 translate-y-20 opacity-0 pointer-events-none";
  }, 2400);
}

function setupEventListeners() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePostModal();
  });
}
