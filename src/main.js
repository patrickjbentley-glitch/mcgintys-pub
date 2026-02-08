import './style.css';
import tapsData from './taps.json';

document.addEventListener('DOMContentLoaded', () => {
    initTapList();
    initScrollAnimations();
    initReviewCarousel();
    initVibeSlideshow();
});

function initVibeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentSlide = 0;

    // Ensure first slide is active immediately
    slides[0].classList.add('active');

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000);
}

function initTapList() {
    const tapGrid = document.getElementById('tap-grid');
    if (!tapGrid) return;

    tapGrid.innerHTML = tapsData.map(tap => `
        <div class="tap-item fade-in">
            <div class="tap-info">
                <h3 style="font-size: 1.4rem; color: var(--aged-cream);">${tap.name}</h3>
                <p style="opacity: 0.7; font-family: var(--font-sans);">${tap.brewery} | ${tap.type}</p>
            </div>
            <div class="tap-abv" style="color: var(--polished-brass); font-weight: 700;">
                ${tap.abv}
            </div>
        </div>
    `).join('');
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function initReviewCarousel() {
    const reviews = [
        {
            text: "Best Guinness in Ohio, hands down. The fireplace in the winter makes it the coziest spot in Lakewood.",
            author: "Mike R., Madison Ave. Regular"
        },
        {
            text: "Great dog-friendly atmosphere. The patio with the garage door is perfect for summer nights.",
            author: "Sarah J., Local Resident"
        },
        {
            text: "A proper pub feel. No corporate buzzwords, just good people and a proper pour.",
            author: "Dave L., Regular since '05"
        },
        {
            text: "The Angelo's pizza delivery to the table is a game changer. Best beer + best pizza.",
            author: "Chris T., Pizza Lover"
        }
    ];

    const carousel = document.getElementById('review-carousel');
    if (!carousel) return;

    let currentIndex = 0;

    function renderReview() {
        const review = reviews[currentIndex];
        carousel.innerHTML = `
            <div class="review-item active">
                <blockquote class="serif">"${review.text}"</blockquote>
                <cite>— ${review.author}</cite>
            </div>
        `;
    }

    setInterval(() => {
        currentIndex = (currentIndex + 1) % reviews.length;
        renderReview();
    }, 5000);
}
