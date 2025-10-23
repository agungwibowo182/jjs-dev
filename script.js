// --- LOGIKA COUNTDOWN (Tetap menggunakan tanggal 1 Nov 2025) ---
const countdownTo = new Date("Nov 1, 2025 00:00:00").getTime();
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

function updateCountdown() {
    // ... (Logika countdown sama seperti sebelumnya) ...
    const now = new Date().getTime();
    const distance = countdownTo - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);

    if (distance < 0) {
        clearInterval(countdownInterval);
        daysEl.innerHTML = hoursEl.innerHTML = minutesEl.innerHTML = secondsEl.innerHTML = "00";
        // Pastikan elemen ini hanya ada di countdown-page sebelum diakses
        const comingSoonEl = document.querySelector('#countdown-page .coming-soon');
        const underConstructionEl = document.querySelector('#countdown-page .under-construction');
        if (comingSoonEl && underConstructionEl) {
             comingSoonEl.textContent = "WE ARE LIVE!";
             underConstructionEl.textContent = "VISIT NOW";
        }
    }
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);


// --- LOGIKA PENGGANTIAN HALAMAN (BARU) ---
const countdownPage = document.getElementById('countdown-page');
const rundownPage = document.getElementById('rundown-page');
const showCountdownBtn = document.getElementById('show-countdown');
const showRundownBtn = document.getElementById('show-rundown');

function switchPage(targetPage) {
    // Sembunyikan semua halaman
    countdownPage.classList.add('hidden');
    rundownPage.classList.add('hidden');
    
    // Hapus status 'active' dari semua tombol
    showCountdownBtn.classList.remove('active');
    showRundownBtn.classList.remove('active');

    // Tampilkan halaman target
    if (targetPage === 'countdown') {
        countdownPage.classList.remove('hidden');
        showCountdownBtn.classList.add('active');
    } else if (targetPage === 'rundown') {
        rundownPage.classList.remove('hidden');
        showRundownBtn.classList.add('active');
    }
}

// Event Listener untuk tombol
showCountdownBtn.addEventListener('click', () => switchPage('countdown'));
showRundownBtn.addEventListener('click', () => switchPage('rundown'));

// Pastikan halaman awal yang aktif sudah benar saat dimuat
switchPage('countdown');