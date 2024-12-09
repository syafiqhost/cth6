// Toggle class active
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// Klik di luar sidebar untuk menghilangkan nav
const hamburger = document.querySelector('#hamburger-menu');
document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 0; // Slide pertama
    let slides = document.querySelectorAll(".custom-slide");
    let dots = document.querySelectorAll(".custom-dot");

    // Menampilkan slide berdasarkan index
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = 'none'; // Sembunyikan semua slide
            dots[i].classList.remove('active'); // Hapus class 'active' dari semua dots
        });

        slides[index].style.display = 'block'; // Tampilkan slide yang dipilih
        dots[index].classList.add('active'); // Tandai dot yang aktif
    }

    // Fungsi untuk slide berikutnya
    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length; // Slide berikutnya, kembali ke 0 jika sudah mencapai akhir
        showSlide(slideIndex);
    }

    // Fungsi untuk melompat ke slide tertentu
    function currentSlide(index) {
        slideIndex = index; // Set slide ke index yang dipilih
        showSlide(slideIndex);
    }

    // Inisialisasi slideshow dengan interval 3 detik
    function initSlideshow() {
        showSlide(slideIndex); // Tampilkan slide pertama
        setInterval(nextSlide, 3000); // Ganti slide setiap 3 detik
    }

    // Menambahkan event listener untuk dots navigation
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => currentSlide(i)); // Menyinkronkan klik pada dot dengan slide
    });

    // Menjalankan inisialisasi slideshow
    initSlideshow();

    // Geser sentuh untuk perangkat mobile (touch swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    // Fungsi untuk menangani geser sentuh
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Geser ke kiri (slide berikutnya)
            nextSlide();
        }
        if (touchEndX > touchStartX) {
            // Geser ke kanan (slide sebelumnya)
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            showSlide(slideIndex);
        }
    }

    // Event listener untuk sentuhan mulai
    document.querySelector('.custom-slideshow-container').addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    // Event listener untuk sentuhan selesai
    document.querySelector('.custom-slideshow-container').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
});

// Tab Toggle Logic
function toggleTab(tab) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => {
        t.classList.remove('active');
    });

    document.querySelector(`.tab[data-tab="${tab}"]`).classList.add('active');
}

// Search Functionality
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah reload halaman
    const searchValue = document.getElementById('search-input').value.trim().toLowerCase();
    const cards = document.querySelectorAll('.house-card');

    let found = false;

    cards.forEach(card => {
        const title = card.getAttribute('data-title') ? card.getAttribute('data-title').toLowerCase() : "";

        card.classList.remove('highlight');

        if (title.includes(searchValue)) {
            card.classList.add('highlight');
            found = true;
            card.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'center'
            });
        }
    });

    if (!found) {
        alert('Tidak ada hasil yang ditemukan!');
    }
});

// Back to Top Button Logic
const backToTopButton = document.getElementById('back-to-top');

// Tampilkan tombol saat user scroll ke bawah
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Tampilkan jika sudah scroll 300px ke bawah
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Tambahkan event listener untuk klik tombol
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0, // Scroll ke paling atas
        behavior: 'smooth' // Efek scroll smooth
    });
});