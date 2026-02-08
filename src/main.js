import './style.css';
import tapsData from './taps.json';

document.addEventListener('DOMContentLoaded', () => {
    initTapList();
    initScrollAnimations();
    initReviewCarousel();
    initVibeSlideshow();
    initPatioBadge();
    initWallOfLegends();
});

// Feature 2: Weather Badge - Always Visible
async function initPatioBadge() {
    const badge = document.getElementById('patio-badge');
    if (!badge) return;

    try {
        // Using Open-Meteo API (free, no key required) for Lakewood, OH coordinates
        const response = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=41.4819&longitude=-81.7982&current=temperature_2m,precipitation&temperature_unit=fahrenheit'
        );
        const data = await response.json();

        const temp = Math.round(data.current.temperature_2m);
        const precipitation = data.current.precipitation;

        // Always show badge with weather-appropriate message
        if (temp > 60 && precipitation === 0) {
            badge.innerHTML = `☀️ ${temp}°F — Patio's Open`;
            badge.classList.add('patio-good');
        } else if (temp > 40) {
            badge.innerHTML = `🍺 ${temp}°F — Fireplace Weather`;
            badge.classList.add('patio-cozy');
        } else {
            badge.innerHTML = `❄️ ${temp}°F — Warm Up Inside`;
            badge.classList.add('patio-cold');
        }
        badge.style.display = 'inline-block';
    } catch (error) {
        // Fallback if weather unavailable
        badge.innerHTML = '🍀 Open Daily 4pm';
        badge.style.display = 'inline-block';
    }
}

// The Local Legends - Rotating Carousel
function initWallOfLegends() {
    const legendsData = [
        {
            text: "Best Guinness in Ohio, hands down. The fireplace in the winter makes it the coziest spot in Lakewood.",
            author: "Mike R.",
            memberSince: "2008",
            source: "Google"
        },
        {
            text: "The fireplace at McGinty's is unmatched. Nothing beats a Guinness by the fire on a cold Lakewood night.",
            author: "Tom H.",
            memberSince: "2010",
            source: "Google"
        },
        {
            text: "Best pool table scene in Cleveland! Plus, you can order Angelo's Pizza right to your table.",
            author: "Mark S.",
            memberSince: "2012",
            source: "Google"
        },
        {
            text: "We order Angelo's Pizza every time. Can't beat a cold Guinness and hot pizza.",
            author: "Jennifer L.",
            memberSince: "2015",
            source: "Google"
        },
        {
            text: "The fireplace, the pool table, the regulars - this is what every Irish pub should be.",
            author: "Brian K.",
            memberSince: "2005",
            source: "Google"
        },
        {
            text: "Dog-friendly patio is perfect in summer. Lakewood's best kept secret.",
            author: "Amanda W.",
            memberSince: "2018",
            source: "Google"
        }
    ];

    const carousel = document.getElementById('legends-carousel');
    if (!carousel) return;

    let currentIndex = 0;

    function renderLegend() {
        const legend = legendsData[currentIndex];
        carousel.innerHTML = `
            <div class="legend-item active">
                <blockquote class="serif">"${legend.text}"</blockquote>
                <div class="legend-meta">
                    <cite>— ${legend.author}</cite>
                    <span class="member-since">Member since ${legend.memberSince}</span>
                    <a href="https://g.page/mcgintys-lakewood" target="_blank" rel="noopener" class="legend-source">via ${legend.source}</a>
                </div>
            </div>
        `;
    }

    renderLegend();
    setInterval(() => {
        currentIndex = (currentIndex + 1) % legendsData.length;
        renderLegend();
    }, 5000);
}

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
            text: "A real pub feel. No corporate buzzwords, just good people and cold ones.",
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
