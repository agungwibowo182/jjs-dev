// --- 1. DATA DINAMIS (Pusat Kontrol) ---
// Waktu Acara Dimulai: 1 November 2025, Pukul 07:00:00 (Waktu Kumpul/Acara)
const LAUNCH_DATE = new Date("Nov 1, 2025 07:00:00").getTime(); 

// Data Gambar Galeri: Mudah ditambahkan/dihapus
const GALLERY_IMAGES = [
    { src: "assets/villa1.jpeg", alt: "Area Kamar" },
    { src: "assets/villa2.jpeg", alt: "Area Kamar" },
    { src: "assets/villa21.jpeg", alt: "Area Kolam Renang" },
    { src: "assets/villa22.jpeg", alt: "Area Kolam Renang" },
    { src: "assets/villa5.jpeg", alt: "Area Kamar" },
    { src: "assets/villa6.jpeg", alt: "Gambar villa" },
    { src: "assets/villa7.jpeg", alt: "Gambar villa" },
    { src: "assets/villa8.jpeg", alt: "Gambar villa" },
    { src: "assets/villa9.jpeg", alt: "Gambar villa" },
    { src: "assets/villa10.jpeg", alt: "Gambar villa" },
    { src: "assets/villa11.jpeg", alt: "Gambar villa" },
    { src: "assets/villa12.jpeg", alt: "Gambar villa" },
    { src: "assets/villa13.jpeg", alt: "Gambar villa" },
    { src: "assets/villa14.jpeg", alt: "Gambar villa" },
    { src: "assets/villa15.jpeg", alt: "Gambar villa" },
    { src: "assets/villa16.jpeg", alt: "Gambar villa" },
    { src: "assets/villa17.jpeg", alt: "Gambar villa" },
    { src: "assets/villa18.jpeg", alt: "Gambar villa" },
    { src: "assets/villa19.jpeg", alt: "Gambar villa" },
    { src: "assets/villa20.jpeg", alt: "Gambar villa" }
    
    
];


// --- 2. DEKLARASI VARIABEL DOM GLOBAL ---
// Elemen Countdown
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Elemen Navigasi Halaman
const pages = {
    countdown: document.getElementById('countdown-page'),
    rundown: document.getElementById('rundown-page'),
    gallery: document.getElementById('gallery-page') // Pastikan ID halaman Gallery benar
};
const navButtons = {
    countdown: document.getElementById('show-countdown'),
    rundown: document.getElementById('show-rundown'),
    gallery: document.getElementById('show-gallery') // Kunci ini sekarang akan menemukan tombol yang benar!
};

// Elemen Galeri/Lightbox
const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const imageCounter = document.querySelector('.image-counter');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0; // Index gambar yang sedang ditampilkan


// --- 3. COUNTDOWN TIMER LOGIC ---
function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = LAUNCH_DATE - now;
    
    // Perhitungan waktu...
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update display...
    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);

    // Jika selesai...
    if (distance < 0) {
        clearInterval(countdownInterval);
        daysEl.innerHTML = hoursEl.innerHTML = minutesEl.innerHTML = secondsEl.innerHTML = "00";
        const comingSoonEl = document.querySelector('#countdown-page .coming-soon');
        const underConstructionEls = document.querySelectorAll('#countdown-page .under-construction');
        if (comingSoonEl) comingSoonEl.textContent = "ACARA SUDAH DIMULAI!";
        if (underConstructionEls.length > 0) underConstructionEls[0].textContent = "SELAMAT BERSANNS RIA!";
        if (underConstructionEls.length > 1) underConstructionEls[1].textContent = "Villa Yudi, Puncak Bogor.";
    }
}
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);


// --- 4. PAGE NAVIGATION LOGIC ---
function switchPage(targetPage) {
    // Sembunyikan semua halaman dan hapus 'active'
    Object.keys(pages).forEach(key => {
        pages[key].classList.add('hidden');
        navButtons[key].classList.remove('active');
    });

    // Tampilkan halaman target dan set 'active'
    pages[targetPage].classList.remove('hidden');
    navButtons[targetPage].classList.add('active');
}

// Event Listener untuk tombol menu
Object.keys(navButtons).forEach(key => {
    navButtons[key].addEventListener('click', () => switchPage(key));
});

// Default page saat pertama dimuat
switchPage('countdown');


// --- 5. DINAMIC GALLERY AND LIGHTBOX LOGIC ---
// Membuat Grid Galeri dari data array (Dinamis)
function createGallery() {
    galleryGrid.innerHTML = '';
    GALLERY_IMAGES.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.classList.add('gallery-item');
        img.dataset.index = index; 
        img.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(img);
    });
}

function updateLightboxContent() {
    const currentItem = GALLERY_IMAGES[currentIndex];
    lightboxImage.src = currentItem.src;
    lightboxImage.alt = currentItem.alt;
    lightboxCaption.textContent = currentItem.alt;
    imageCounter.textContent = `${currentIndex + 1} / ${GALLERY_IMAGES.length}`;
}

function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

const handleCloseLightbox = () => {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
};

// Event Listener Lightbox
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    updateLightboxContent();
});
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
    updateLightboxContent();
});
closeBtn.addEventListener('click', handleCloseLightbox);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        handleCloseLightbox();
    }
});

// Inisialisasi Galeri saat script dimuat
createGallery();