// Initial data parsed from PT Geo Investama Mandiri Social Media Planning Calendar 2026
const INITIAL_CALENDAR_DATA = [
  // --- JANUARY 2026 ---
  {
    id: "jan-1",
    date: "2026-01-01",
    title: "Tahun Baru 2026",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Completed",
    notes: "Greeting Hari Libur Nasional"
  },
  {
    id: "jan-4",
    date: "2026-01-04",
    title: "Feed Education - LiDAR Tech",
    category: "Education",
    brand: "LiDAR",
    format: "Feed / Post",
    status: "Completed",
    notes: "Pengenalan teknologi LiDAR survei"
  },
  {
    id: "jan-8a",
    date: "2026-01-08",
    title: "Feed GIM Learning - about us - tagline - services",
    category: "Education",
    brand: "GIM Learning",
    format: "Feed / Post",
    status: "Completed",
    notes: "Pengenalan program edukasi dan layanan GIM"
  },
  {
    id: "jan-8b",
    date: "2026-01-08",
    title: "Feed GIM Learning - porto",
    category: "Education",
    brand: "GIM Learning",
    format: "Feed / Post",
    status: "Completed",
    notes: "Portofolio pelatihan GIM"
  },
  {
    id: "jan-9",
    date: "2026-01-09",
    title: "Feed Jadwal & Flyer Pelatihan Jan-Feb",
    category: "Webinar",
    brand: "GIM Learning",
    format: "Feed / Post",
    status: "Completed",
    notes: "Jadwal pelatihan pemetaan dan survei"
  },
  {
    id: "jan-13a",
    date: "2026-01-13",
    title: "Vid Promo - training & product L3",
    category: "Promo",
    brand: "AlphaGeo L300",
    format: "Video / Reels",
    status: "Completed",
    notes: "Video promosi produk L3 & training"
  },
  {
    id: "jan-13b",
    date: "2026-01-13",
    title: "Vid Promo - training & product L3 versi 2",
    category: "Promo",
    brand: "AlphaGeo L300",
    format: "Video / Reels",
    status: "Completed",
    notes: "Variasi video promosi L3"
  },
  {
    id: "jan-16",
    date: "2026-01-16",
    title: "Isra' Miraj",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Completed",
    notes: "Greeting Hari Besar Islam"
  },
  {
    id: "jan-19",
    date: "2026-01-19",
    title: "Vid Recap BPPTKG versi 1",
    category: "Event",
    brand: "GIM",
    format: "Video / Reels",
    status: "Completed",
    notes: "Recap kegiatan kunjungan/kerjasama BPPTKG"
  },
  {
    id: "jan-20",
    date: "2026-01-20",
    title: "Vid Recap BPPTKG versi 2",
    category: "Event",
    brand: "GIM",
    format: "Video / Reels",
    status: "Completed",
    notes: "Recap kegiatan BPPTKG part 2"
  },
  {
    id: "jan-23",
    date: "2026-01-23",
    title: "Vid Report - Visit BIG (Badan Informasi Geospasial)",
    category: "Event",
    brand: "GIM",
    format: "Video / Reels",
    status: "Completed",
    notes: "Laporan kunjungan ke kantor BIG"
  },
  {
    id: "jan-26",
    date: "2026-01-26",
    title: "Vid Promo - Product/Service Bathymetry Artaboat v.2",
    category: "Promo",
    brand: "Artaboat / Hydrotech",
    format: "Video / Reels",
    status: "Completed",
    notes: "Promosi alat survei batimetri USV Artaboat"
  },

  // --- FEBRUARY 2026 ---
  {
    id: "feb-4",
    date: "2026-02-04",
    title: "Feed promo produk - Topcon LN",
    category: "Promo",
    brand: "Topcon",
    format: "Feed / Post",
    status: "Completed",
    notes: "Promo Total Station & Layout Navigator Topcon LN"
  },
  {
    id: "feb-5a",
    date: "2026-02-05",
    title: "Iklan M3E + DRTK 3",
    category: "Promo",
    brand: "DJI Enterprise",
    format: "Feed / Post",
    status: "Completed",
    notes: "Paket Drone DJI Matrice 3 Enterprise + D-RTK 3"
  },
  {
    id: "feb-5b",
    date: "2026-02-05",
    title: "Video Pembelian M4E",
    category: "Promo",
    brand: "DJI Enterprise",
    format: "Video / Reels",
    status: "Completed",
    notes: "Showcase drone DJI Matrice 4 Enterprise"
  },
  {
    id: "feb-7a",
    date: "2026-02-07",
    title: "Iklan IBase + I76 + i89",
    category: "Promo",
    brand: "CHC Navigation",
    format: "Feed / Post",
    status: "Completed",
    notes: "Paket GNSS RTK CHC IBase, I76 & i89 Visual Survey"
  },
  {
    id: "feb-7b",
    date: "2026-02-07",
    title: "Education _Cors FJD N10 (Global) - apa itu cors, pengenalan produk, spek",
    category: "Education",
    brand: "FJDynamics",
    format: "Carousel",
    status: "Completed",
    notes: "Edukasi stasiun CORS FJD N10 & fitur unggulannya"
  },
  {
    id: "feb-8a",
    date: "2026-02-08",
    title: "Iklan L300 - Alphageo",
    category: "Promo",
    brand: "AlphaGeo",
    format: "Feed / Post",
    status: "Completed",
    notes: "Promo GNSS RTK Alphageo L300"
  },
  {
    id: "feb-8b",
    date: "2026-02-08",
    title: "Education _V4ELidar (Global)",
    category: "Education",
    brand: "FJD Trion",
    format: "Carousel",
    status: "Completed",
    notes: "Edukasi sensor V4E LiDAR pemetaan 3D"
  },
  {
    id: "feb-9",
    date: "2026-02-09",
    title: "Iklan CHC CTS A-100",
    category: "Promo",
    brand: "CHC Navigation",
    format: "Feed / Post",
    status: "Completed",
    notes: "Total Station CHC CTS A-100"
  },
  {
    id: "feb-11",
    date: "2026-02-11",
    title: "Iklan FJD V1T (base) + V10A Rover",
    category: "Promo",
    brand: "FJDynamics",
    format: "Feed / Post",
    status: "Completed",
    notes: "Paket Base & Rover FJD GNSS RTK"
  },
  {
    id: "feb-12",
    date: "2026-02-12",
    title: "Hasil Uji V4E LiDAR",
    category: "Education",
    brand: "FJD Trion",
    format: "Feed / Post",
    status: "Completed",
    notes: "Showcase akurasi dan point cloud V4E LiDAR"
  },
  {
    id: "feb-13",
    date: "2026-02-13",
    title: "Pengenalan V4E + V4E Pro",
    category: "Product",
    brand: "FJD Trion",
    format: "Carousel",
    status: "Completed",
    notes: "Perbandingan fitur V4E vs V4E Pro"
  },
  {
    id: "feb-14",
    date: "2026-02-14",
    title: "Cors FJD - Lebih dalam",
    category: "Education",
    brand: "FJDynamics",
    format: "Carousel",
    status: "Completed",
    notes: "Pembahasan teknis jaringan CORS FJD"
  },
  {
    id: "feb-15a",
    date: "2026-02-15",
    title: "Iklan M3E + DRTK 3",
    category: "Promo",
    brand: "DJI Enterprise",
    format: "Feed / Post",
    status: "Completed",
    notes: "Promo Drone Pemetaan M3E"
  },
  {
    id: "feb-15b",
    date: "2026-02-15",
    title: "Video Part I - China",
    category: "Event",
    brand: "GIM",
    format: "Video / Reels",
    status: "Completed",
    notes: "Dokumentasi kunjungan industri ke pabrik di China"
  },
  {
    id: "feb-16a",
    date: "2026-02-16",
    title: "Iklan V4e",
    category: "Promo",
    brand: "FJD Trion",
    format: "Feed / Post",
    status: "Completed",
    notes: "Promo LiDAR Handheld / Drone V4E"
  },
  {
    id: "feb-16b",
    date: "2026-02-16",
    title: "Pengenalan V10A, fitur",
    category: "Product",
    brand: "FJDynamics",
    format: "Carousel",
    status: "Completed",
    notes: "Fitur kamera AR visual positioning V10A"
  },
  {
    id: "feb-17a",
    date: "2026-02-17",
    title: "Tahun Baru Imlek 2577 K",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Completed",
    notes: "Greeting Hari Raya Imlek"
  },
  {
    id: "feb-17b",
    date: "2026-02-17",
    title: "Iklan IBase + I76 + i89 (Special Imlek)",
    category: "Promo",
    brand: "CHC Navigation",
    format: "Feed / Post",
    status: "Completed",
    notes: "Promo diskon khusus Tahun Baru Imlek"
  },
  {
    id: "feb-18",
    date: "2026-02-18",
    title: "Greeting - Selamat Menunaikan Ibadah Puasa Ramadhan",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Completed",
    notes: "Greeting Awal Bulan Ramadhan"
  },
  {
    id: "feb-19",
    date: "2026-02-19",
    title: "Pengenalan CHC CTS A-100",
    category: "Product",
    brand: "CHC Navigation",
    format: "Carousel",
    status: "Completed",
    notes: "Ulasan fitur Total Station CHC CTS A-100"
  },
  {
    id: "feb-20",
    date: "2026-02-20",
    title: "Iklan CHC CTS A-100 (Special Ramadhan)",
    category: "Promo",
    brand: "CHC Navigation",
    format: "Feed / Post",
    status: "Completed",
    notes: "Promo Ramadhan Total Station"
  },
  {
    id: "feb-21a",
    date: "2026-02-21",
    title: "Advance I - Webgis",
    category: "Education",
    brand: "GIM Learning",
    format: "Carousel",
    status: "Completed",
    notes: "Materi WebGIS Tingkat Lanjut Part 1"
  },
  {
    id: "feb-21b",
    date: "2026-02-21",
    title: "Iklan FJD V1T (base) + V10A Rover (Special Ramadhan)",
    category: "Promo",
    brand: "FJDynamics",
    format: "Feed / Post",
    status: "Completed",
    notes: "Promo Ramadhan GNSS RTK FJD"
  },
  {
    id: "feb-22",
    date: "2026-02-22",
    title: "Iklan V4e (Special Ramadhan)",
    category: "Promo",
    brand: "FJD Trion",
    format: "Feed / Post",
    status: "Completed",
    notes: "Promo Ramadhan LiDAR V4E"
  },
  {
    id: "feb-23",
    date: "2026-02-23",
    title: "Video Unboxing Cors FJD N10",
    category: "Product",
    brand: "FJDynamics",
    format: "Video / Reels",
    status: "Completed",
    notes: "Unboxing dan setup awal stasiun CORS"
  },
  {
    id: "feb-24",
    date: "2026-02-24",
    title: "Iklan M3E + DRTK 3 (Special Ramadhan)",
    category: "Promo",
    brand: "DJI Enterprise",
    format: "Feed / Post",
    status: "Completed",
    notes: "Promo drone survei DJI Ramadhan"
  },
  {
    id: "feb-25",
    date: "2026-02-25",
    title: "Video V4E LiDAR in Action",
    category: "Education",
    brand: "FJD Trion",
    format: "Video / Reels",
    status: "Completed",
    notes: "Praktek pengambilan data point cloud di lapangan"
  },
  {
    id: "feb-26",
    date: "2026-02-26",
    title: "Iklan IBase + I76 + i89 (Special Ramadhan)",
    category: "Promo",
    brand: "CHC Navigation",
    format: "Feed / Post",
    status: "Completed",
    notes: "Promo GNSS CHC Ramadhan"
  },
  {
    id: "feb-27a",
    date: "2026-02-27",
    title: "Iklan Satlab GNSS RTK",
    category: "Promo",
    brand: "Satlab",
    format: "Feed / Post",
    status: "Completed",
    notes: "Promo receiver Satlab Geodesi"
  },
  {
    id: "feb-27b",
    date: "2026-02-27",
    title: "Advance II - Webgis",
    category: "Education",
    brand: "GIM Learning",
    format: "Carousel",
    status: "Completed",
    notes: "Materi WebGIS Tingkat Lanjut Part 2 (GeoServer & Leaflet)"
  },
  {
    id: "feb-28",
    date: "2026-02-28",
    title: "Iklan CHC CTS A-100 (Special Ramadhan)",
    category: "Promo",
    brand: "CHC Navigation",
    format: "Feed / Post",
    status: "Completed",
    notes: "Penutupan promo Ramadhan CHC"
  },

  // --- MARCH 2026 ---
  {
    id: "mar-7",
    date: "2026-03-07",
    title: "Advance III - Webgis",
    category: "Education",
    brand: "GIM Learning",
    format: "Carousel",
    status: "Planned",
    notes: "Materi WebGIS Lanjutan Part 3"
  },
  {
    id: "mar-14",
    date: "2026-03-14",
    title: "Advance IV - Webgis",
    category: "Education",
    brand: "GIM Learning",
    format: "Carousel",
    status: "Planned",
    notes: "Materi WebGIS Lanjutan Part 4 (Deployment & Dashboard)"
  },
  {
    id: "mar-19",
    date: "2026-03-19",
    title: "Hari Raya Nyepi Tahun Baru Saka 1948",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Planned",
    notes: "Greeting Hari Raya Nyepi"
  },
  {
    id: "mar-21",
    date: "2026-03-21",
    title: "Hari Raya Idul Fitri 1447 H",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Planned",
    notes: "Ucapan Selamat Hari Raya Idul Fitri"
  },

  // --- APRIL 2026 ---
  {
    id: "apr-2",
    date: "2026-04-02",
    title: "Pelatihan Offline V4E LiDAR",
    category: "Webinar",
    brand: "FJD Trion",
    format: "Webinar / Training",
    status: "Planned",
    notes: "Workshop pelatihan langsung penggunaan LiDAR V4E"
  },
  {
    id: "apr-3",
    date: "2026-04-03",
    title: "Wafat Yesus Kristus",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Planned",
    notes: "Hari Libur Nasional"
  },
  {
    id: "apr-5",
    date: "2026-04-05",
    title: "Kebangkitan Yesus Kristus (Paskah)",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Planned",
    notes: "Greeting Hari Paskah"
  },
  {
    id: "apr-6",
    date: "2026-04-06",
    title: "Posting FJDTrion V4e LiDAR (Buffer)",
    category: "Product",
    brand: "FJD Trion",
    format: "Feed / Post",
    status: "Planned",
    notes: "Konten buffer V4e LiDAR"
  },
  {
    id: "apr-8a",
    date: "2026-04-08",
    title: "Upload Feeds DJI Kit",
    category: "Promo",
    brand: "DJI Retail",
    format: "Feed / Post",
    status: "Planned",
    notes: "Koleksi aksesoris dan DJI kit"
  },
  {
    id: "apr-8b",
    date: "2026-04-08",
    title: "Upload Feeds DJI Mini 4 Pro",
    category: "Product",
    brand: "DJI Retail",
    format: "Feed / Post",
    status: "Planned",
    notes: "Spesifikasi DJI Mini 4 Pro"
  },
  {
    id: "apr-10a",
    date: "2026-04-10",
    title: "Revisi & Uploads Feeds DJI Kit",
    category: "Promo",
    brand: "DJI Retail",
    format: "Feed / Post",
    status: "Planned",
    notes: "Upload final feeds paket DJI"
  },
  {
    id: "apr-10b",
    date: "2026-04-10",
    title: "Revisi & Upload Feeds DJI Mini 4 Pro",
    category: "Product",
    brand: "DJI Retail",
    format: "Feed / Post",
    status: "Planned",
    notes: "Posting bundle Mini 4 Pro"
  },
  {
    id: "apr-11",
    date: "2026-04-11",
    title: "Tips & Trick AutoCAD Pemetaan",
    category: "Education",
    brand: "GIM Learning",
    format: "Carousel",
    status: "Planned",
    notes: "Tips pengolahan gambar ukur di AutoCAD Civil 3D"
  },
  {
    id: "apr-12a",
    date: "2026-04-12",
    title: "Complete ASSETS Fasih",
    category: "Product",
    brand: "GIM",
    format: "Feed / Post",
    status: "Planned",
    notes: "Showcase asset library Fasih pemetaan"
  },
  {
    id: "apr-12b",
    date: "2026-04-12",
    title: "Posting SATLAB x GIM Partnership",
    category: "Event",
    brand: "Satlab",
    format: "Feed / Post",
    status: "Planned",
    notes: "Kolaborasi resmi Satlab Geodesi dan GIM"
  },
  {
    id: "apr-13a",
    date: "2026-04-13",
    title: "Upload Drive Specs n Package DJI Mini (3, 4K, 4 Pro) dan Neo",
    category: "Product",
    brand: "DJI Retail",
    format: "Carousel",
    status: "Planned",
    notes: "Perbandingan seri DJI Mini & Neo"
  },
  {
    id: "apr-13b",
    date: "2026-04-13",
    title: "Upload Drive Specs n Package DJI Avata 2 dan Flip",
    category: "Product",
    brand: "DJI Retail",
    format: "Feed / Post",
    status: "Planned",
    notes: "FPV Drone Avata 2 showcase"
  },
  {
    id: "apr-13c",
    date: "2026-04-13",
    title: "Prepare n Uploads DJI Consumer (by demand) Shopee",
    category: "Promo",
    brand: "DJI Retail",
    format: "Feed / Post",
    status: "Planned",
    notes: "Katalog marketplace Shopee"
  },
  {
    id: "apr-15a",
    date: "2026-04-15",
    title: "Upload Drive Specs n Package DJI Osmo (360, Action 4, Mobile 78)",
    category: "Product",
    brand: "DJI Retail",
    format: "Feed / Post",
    status: "Planned",
    notes: "Seri Osmo Pocket, Action & Mobile"
  },
  {
    id: "apr-15b",
    date: "2026-04-15",
    title: "Upload Drive Specs n Package DJI Mic Mini",
    category: "Product",
    brand: "DJI Retail",
    format: "Feed / Post",
    status: "Planned",
    notes: "Spesifikasi DJI Mic Mini untuk creator survei"
  },

  // --- MAY 2026 ---
  {
    id: "may-1",
    date: "2026-05-01",
    title: "Hari Buruh Internasional (May Day)",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Planned",
    notes: "Greeting Hari Buruh"
  },
  {
    id: "may-14",
    date: "2026-05-14",
    title: "Kenaikan Yesus Kristus",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Planned",
    notes: "Hari Libur Nasional"
  },
  {
    id: "may-27a",
    date: "2026-05-27",
    title: "Hari Raya Idul Adha 1477 H",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Planned",
    notes: "Greeting Hari Raya Idul Adha"
  },
  {
    id: "may-27b",
    date: "2026-05-27",
    title: "USV Batimetri Hydrotech in Shallow Water",
    category: "Education",
    brand: "Hydrotech",
    format: "Video / Reels",
    status: "Planned",
    notes: "Penerapan USV untuk perairan dangkal"
  },
  {
    id: "may-31",
    date: "2026-05-31",
    title: "Hari Raya Waisak 2570 BE",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Planned",
    notes: "Greeting Hari Raya Waisak"
  },

  // --- JUNE 2026 (Content Campaign Month) ---
  {
    id: "jun-1a",
    date: "2026-06-01",
    title: "Hari Lahir Pancasila",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Completed",
    notes: "Greeting Hari Lahir Pancasila"
  },
  {
    id: "jun-1b",
    date: "2026-06-01",
    title: "DJI Retail (Video NEO)",
    category: "Product",
    brand: "DJI Retail",
    format: "Video / Reels",
    status: "Completed",
    notes: "Review drone ultralight DJI NEO"
  },
  {
    id: "jun-2",
    date: "2026-06-02",
    title: "Enterprise (M3E VS M4E)",
    category: "Education",
    brand: "DJI Enterprise",
    format: "Carousel",
    status: "Completed",
    notes: "Komparasi lengkap DJI M3E vs M4E untuk pemetaan"
  },
  {
    id: "jun-3",
    date: "2026-06-03",
    title: "DJI Agriculture (T55 Drone Semprot)",
    category: "Product",
    brand: "DJI Agriculture",
    format: "Feed / Post",
    status: "Completed",
    notes: "Spesifikasi dan kapasitas drone semprot T55"
  },
  {
    id: "jun-4",
    date: "2026-06-04",
    title: "CHC Navigation (Test Flight P60 & X500)",
    category: "Product",
    brand: "CHC Navigation",
    format: "Video / Reels",
    status: "Completed",
    notes: "Uji terbang drone VTOL CHC P60 & X500"
  },
  {
    id: "jun-5",
    date: "2026-06-05",
    title: "FJDynamics (Mine Tunnel Scanning Tips)",
    category: "Education",
    brand: "FJD Trion",
    format: "Carousel",
    status: "Completed",
    notes: "Tips pemindaian lorong tambang bawah tanah tanpa GPS"
  },
  {
    id: "jun-6a",
    date: "2026-06-06",
    title: "Satlab (Tutor Statik Data Processing)",
    category: "Education",
    brand: "Satlab",
    format: "Video / Reels",
    status: "Completed",
    notes: "Tutorial pengolahan data GNSS statik Satlab"
  },
  {
    id: "jun-6b",
    date: "2026-06-06",
    title: "USV Sonar Bathymetry",
    category: "Education",
    brand: "Hydrotech",
    format: "Feed / Post",
    status: "Completed",
    notes: "Teknologi sonar untuk survei batimetri"
  },
  {
    id: "jun-7",
    date: "2026-06-07",
    title: "Topcon GM Series: Apa Saja Keunggulannya?",
    category: "Product",
    brand: "Topcon",
    format: "Feed / Post",
    status: "Completed",
    notes: "Review Total Station Topcon GM series"
  },
  {
    id: "jun-8",
    date: "2026-06-08",
    title: "Sokkia (iM Series: Apa Saja Fiturnya?)",
    category: "Product",
    brand: "Sokkia",
    format: "Feed / Post",
    status: "Completed",
    notes: "Spesifikasi Total Station Sokkia iM-50 & iM-100"
  },
  {
    id: "jun-9",
    date: "2026-06-09",
    title: "Hi-Target vRTK: Keperluan Pemodelan 3D Photogrammetry",
    category: "Education",
    brand: "Hi-Target",
    format: "Carousel",
    status: "Completed",
    notes: "Pemanfaatan dual-camera vRTK untuk visual positioning"
  },
  {
    id: "jun-10",
    date: "2026-06-10",
    title: "EFIX F8L Laser Pocket-Size IMU-RTK (Laser Fitur)",
    category: "Product",
    brand: "EFIX",
    format: "Feed / Post",
    status: "Completed",
    notes: "Pengukuran titik sulit tanpa prisma dengan Green Laser EFIX"
  },
  {
    id: "jun-11",
    date: "2026-06-11",
    title: "QYSEA Underwater ROV Video Showcase",
    category: "Product",
    brand: "QYSEA",
    format: "Video / Reels",
    status: "Completed",
    notes: "Inspeksi bawah air dengan Drone ROV QYSEA Fifish"
  },
  {
    id: "jun-12",
    date: "2026-06-12",
    title: "Leica: Lahirnya Standar Akurasi Modern - Warisan Heinrich Wild",
    category: "Education",
    brand: "Leica Geosystems",
    format: "Carousel",
    status: "Completed",
    notes: "Sejarah dan standar instrumen optik presisi tinggi Leica"
  },
  {
    id: "jun-13a",
    date: "2026-06-13",
    title: "AlphaGeo L300: Spec dan Rekomendasi Penggunaan",
    category: "Product",
    brand: "AlphaGeo",
    format: "Feed / Post",
    status: "Completed",
    notes: "Panduan memilih konfigurasi receiver GNSS L300"
  },
  {
    id: "jun-13b",
    date: "2026-06-13",
    title: "LoD (Level of Detail) dalam Pemetaan BIM",
    category: "Education",
    brand: "GIM Learning",
    format: "Carousel",
    status: "Completed",
    notes: "Edukasi konsep LoD 100 hingga LoD 500"
  },
  {
    id: "jun-14",
    date: "2026-06-14",
    title: "Axioo Pongo 760 V2: Laptop Workstation untuk Olah Data GIS & LiDAR",
    category: "Product",
    brand: "Axioo",
    format: "Feed / Post",
    status: "Completed",
    notes: "Benchmark performa Axioo Pongo olah point cloud"
  },
  {
    id: "jun-15",
    date: "2026-06-15",
    title: "Hydrotech: Apa sih Multibeam Echo Sounder?",
    category: "Education",
    brand: "Hydrotech",
    format: "Carousel",
    status: "Completed",
    notes: "Prinsip kerja MBES untuk pemetaan dasar laut akurasi tinggi"
  },
  {
    id: "jun-16a",
    date: "2026-06-16",
    title: "Tahun Baru Islam 1448 H",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Completed",
    notes: "Greeting Tahun Baru Hijriyah"
  },
  {
    id: "jun-16b",
    date: "2026-06-16",
    title: "DJI Retail Content Showcase",
    category: "Promo",
    brand: "DJI Retail",
    format: "Feed / Post",
    status: "Completed",
    notes: "Pilihan drone content creator"
  },
  {
    id: "jun-17",
    date: "2026-06-17",
    title: "DJI Enterprise: Solusi Inspeksi Tower & Listrik",
    category: "Education",
    brand: "DJI Enterprise",
    format: "Feed / Post",
    status: "Completed",
    notes: "Inspeksi termal dan zoom tinggi"
  },
  {
    id: "jun-18",
    date: "2026-06-18",
    title: "DJI Agri: Fakta Drone T100",
    category: "Product",
    brand: "DJI Agriculture",
    format: "Carousel",
    status: "Completed",
    notes: "Kapasitas muatan hingga 100 kg di perkebunan"
  },
  {
    id: "jun-19",
    date: "2026-06-19",
    title: "CHC Navigation Hydrographic USV",
    category: "Product",
    brand: "CHC Navigation",
    format: "Video / Reels",
    status: "Completed",
    notes: "Uji coba perahu otonom batimetri CHC"
  },
  {
    id: "jun-20a",
    date: "2026-06-20",
    title: "FJD V10A: Fitur & Keunggulan AR Visual Stakeout",
    category: "Product",
    brand: "FJDynamics",
    format: "Carousel",
    status: "Completed",
    notes: "Stakeout cepat dengan panduan visual AR di layar controller"
  },
  {
    id: "jun-20b",
    date: "2026-06-20",
    title: "LoD Part 2: Dari Point Cloud ke Model 3D",
    category: "Education",
    brand: "GIM Learning",
    format: "Feed / Post",
    status: "Completed",
    notes: "Workflow export model BIM 3D"
  },
  {
    id: "jun-21",
    date: "2026-06-21",
    title: "Satlab SL9 Promo Spesial Pertengahan Tahun",
    category: "Promo",
    brand: "Satlab",
    format: "Feed / Post",
    status: "Completed",
    notes: "Penawaran menarik receiver GNSS Satlab SL9"
  },
  {
    id: "jun-22",
    date: "2026-06-22",
    title: "Topcon: Perbedaan Total Station Robotic vs Manual",
    category: "Education",
    brand: "Topcon",
    format: "Carousel",
    status: "Completed",
    notes: "Efisiensi satu surveyor dengan robotic total station"
  },
  {
    id: "jun-23",
    date: "2026-06-23",
    title: "Sokkia iM-100 Series: Kombinasi Sempurna Keamanan Data USB dan Kecepatan Ukur Otomatis",
    category: "Product",
    brand: "Sokkia",
    format: "Feed / Post",
    status: "Completed",
    notes: "Keandalan EDM Sokkia iM-100"
  },
  {
    id: "jun-24",
    date: "2026-06-24",
    title: "Hi-Target V200: GNSS RTK Ringkas Generasi Baru",
    category: "Product",
    brand: "Hi-Target",
    format: "Feed / Post",
    status: "Completed",
    notes: "Desain ultra-lightweight hanya 800g dengan IMU 60 derajat"
  },
  {
    id: "jun-25",
    date: "2026-06-25",
    title: "EFIX F7: Mitos Kemampuan Sinyal di Bawah Kanopi Hutan",
    category: "Education",
    brand: "EFIX",
    format: "Carousel",
    status: "Completed",
    notes: "Pengujian tracking multi-konstelasi EFIX di area tertutup"
  },
  {
    id: "jun-26",
    date: "2026-06-26",
    title: "QYSEA: Blue Economy & Pemantauan Konservasi Terumbu Karang",
    category: "Education",
    brand: "QYSEA",
    format: "Carousel",
    status: "Completed",
    notes: "Teknologi ROV untuk riset kelautan dan lingkungan"
  },
  {
    id: "jun-27",
    date: "2026-06-27",
    title: "Leica: Digital Twin untuk Infrastruktur Cerdas",
    category: "Education",
    brand: "Leica Geosystems",
    format: "Carousel",
    status: "Completed",
    notes: "Integrasi terrestrial laser scanner dengan platform digital twin"
  },
  {
    id: "jun-28",
    date: "2026-06-28",
    title: "AlphaGeo: Survei Presisi Canopy Tebal",
    category: "Education",
    brand: "AlphaGeo",
    format: "Feed / Post",
    status: "Completed",
    notes: "Teknologi pelacakan sinyal lemah pada receiver AlphaGeo"
  },
  {
    id: "jun-29",
    date: "2026-06-29",
    title: "Axioo: Mengapa Hardware Pemrosesan Sama Pentingnya dengan Sensor Lapangan",
    category: "Education",
    brand: "Axioo",
    format: "Carousel",
    status: "Completed",
    notes: "Spesifikasi GPU dan CPU ideal untuk Agisoft & Pix4D"
  },
  {
    id: "jun-30",
    date: "2026-06-30",
    title: "Hydrotech: Ilusi Kecepatan Suara di Perairan Berbeda Suhu",
    category: "Education",
    brand: "Hydrotech",
    format: "Carousel",
    status: "Completed",
    notes: "Pentingnya Sound Velocity Profiler (SVP) dalam batimetri"
  },

  // --- JULY 2026 ---
  {
    id: "jul-1",
    date: "2026-07-01",
    title: "DJI Retail (LITO 1)",
    category: "Product",
    brand: "DJI Retail",
    format: "Feed / Post",
    status: "Completed",
    notes: "Showcase produk retail DJI"
  },
  {
    id: "jul-2",
    date: "2026-07-02",
    title: "DJI Enterprise: Era Sensor Fusion (LiDAR + RGB + Thermal)",
    category: "Education",
    brand: "DJI Enterprise",
    format: "Carousel",
    status: "Completed",
    notes: "Penggabungan payload multi-sensor pada Zenmuse L2 / H30T"
  },
  {
    id: "jul-3",
    date: "2026-07-03",
    title: "DJI Agri: Badai Angin Buatan & Penetrasi Droplet",
    category: "Education",
    brand: "DJI Agriculture",
    format: "Carousel",
    status: "Completed",
    notes: "Dinamika hembusan baling-baling drone terhadap penyerapan pupuk"
  },
  {
    id: "jul-4",
    date: "2026-07-04",
    title: "CHC Navigation: Quick Guide Statik GNSS",
    category: "Education",
    brand: "CHC Navigation",
    format: "Feed / Post",
    status: "Completed",
    notes: "Panduan cepat pengukuran statik orde tinggi"
  },
  {
    id: "jul-5",
    date: "2026-07-05",
    title: "FJDynamics: Quick Guide Convert RINEX Data",
    category: "Education",
    brand: "FJDynamics",
    format: "Feed / Post",
    status: "Completed",
    notes: "Cara mudah konversi raw log data ke standar RINEX 3.0"
  },
  {
    id: "jul-6",
    date: "2026-07-06",
    title: "GNSS Satlab Eyr: Fitur Visual Positioning & Keunggulan Dual Camera",
    category: "Product",
    brand: "Satlab",
    format: "Carousel",
    status: "Completed",
    notes: "Kamera depan untuk stakeout visual dan kamera bawah untuk photogrammetry"
  },
  {
    id: "jul-31",
    date: "2026-07-31",
    title: "Pelatihan M400 (Free) - Demo Terbang, Fitur, DJI Modify",
    category: "Webinar",
    brand: "DJI Enterprise",
    format: "Webinar / Training",
    status: "Completed",
    notes: "Workshop bersama Inneke Astrid (Halo Robotic)"
  },

  // --- AUGUST 2026 ---
  {
    id: "aug-4",
    date: "2026-08-04",
    title: "Reels: Petunjuk Lokasi Event GPFE 2026 (Geospatial Expo)",
    category: "Event",
    brand: "GIM",
    format: "Video / Reels",
    status: "Completed",
    notes: "Panduan rute dan denah booth GIM di GPFE"
  },
  {
    id: "aug-5",
    date: "2026-08-05",
    title: "Reels: RECAP DAY 1 GPFE 2026",
    category: "Event",
    brand: "GIM",
    format: "Video / Reels",
    status: "Completed",
    notes: "Suasana keseruan booth hari pertama pameran geodesi"
  },
  {
    id: "aug-11",
    date: "2026-08-11",
    title: "Carousel: 7 Kesalahan GNSS RTK yang Membuat Koordinat Meleset",
    category: "Education",
    brand: "GIM Learning",
    format: "Carousel",
    status: "Completed",
    notes: "Edukasi tentang multipath, GDOP, tinggi antena, dan geoid"
  },
  {
    id: "aug-17",
    date: "2026-08-17",
    title: "Dirgahayu Republik Indonesia Ke-81",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Completed",
    notes: "Peringatan Hari Kemerdekaan RI"
  },
  {
    id: "aug-20",
    date: "2026-08-20",
    title: "Carousel: Things I Wish I Knew Sebelum Jadi Surveyor",
    category: "Education",
    brand: "GIM Learning",
    format: "Carousel",
    status: "Planned",
    notes: "Cuaca adalah bagian pekerjaan, data salah = processing panjang, alat mahal != otomatis bagus"
  },
  {
    id: "aug-23",
    date: "2026-08-23",
    title: "Carousel: 5 Hal yang Harus Kamu Pertimbangkan Sebelum Memilih Metode Survey",
    category: "Education",
    brand: "GIM Learning",
    format: "Carousel",
    status: "Planned",
    notes: "Biaya, luasan area, akurasi yang diminta, medan lapangan, waktu deadline"
  },
  {
    id: "aug-25",
    date: "2026-08-25",
    title: "Maulid Nabi Muhammad SAW",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Planned",
    notes: "Greeting Hari Libur Keagamaan"
  },
  {
    id: "aug-27",
    date: "2026-08-27",
    title: "Carousel: 7 Istilah Survey yang Wajib Anak Geodesi Tahu",
    category: "Education",
    brand: "GIM Learning",
    format: "Carousel",
    status: "Planned",
    notes: "Benchmark, Backsight, Foresight, Resection, Geoid Undulation, PPM, Epoch"
  },
  {
    id: "aug-29",
    date: "2026-08-29",
    title: "Reel: Expectation vs Reality Survey Pakai Drone",
    category: "Education",
    brand: "GIM Learning",
    format: "Video / Reels",
    status: "Planned",
    notes: "Konten komedi edukatif tantangan terbang di lapangan"
  },
  {
    id: "aug-31",
    date: "2026-08-31",
    title: "Reel: Sehari Jadi Surveyor di PT Geo Investama Mandiri",
    category: "Event",
    brand: "GIM",
    format: "Video / Reels",
    status: "Planned",
    notes: "Behind the scenes keseruan tim lapangan"
  },

  // --- OCTOBER 2026 ---
  {
    id: "oct-25",
    date: "2026-10-25",
    title: "Anniversary PT Geo Investama Mandiri Ke-7",
    category: "Event",
    brand: "GIM",
    format: "Feed / Post",
    status: "Planned",
    notes: "Perayaan 7 tahun dedikasi untuk industri geospasial Indonesia"
  },

  // --- DECEMBER 2026 ---
  {
    id: "dec-25",
    date: "2026-12-25",
    title: "Hari Raya Natal 2026",
    category: "Holiday",
    brand: "GIM",
    format: "Feed / Post",
    status: "Planned",
    notes: "Greeting Selamat Hari Raya Natal"
  },
  {
    id: "dec-31",
    date: "2026-12-31",
    title: "Menyambut Tahun Baru 2027 & Year End Recap",
    category: "Holiday",
    brand: "GIM",
    format: "Video / Reels",
    status: "Planned",
    notes: "Recap pencapaian dan terobosan teknologi tahun 2026"
  }
];
