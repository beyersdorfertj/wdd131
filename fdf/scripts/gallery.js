// Gallery data with categories
const galleryData = {
    "title": ["Galerie", "Gallery"],
    "navigation": [
        {
            "name": ["Startseite", "Home"],
            "link": "home.html"
        },
        {
            "name": ["Alle", "All"],
            "link": "gallery.html"
        },
        {
            "name": ["Sehenswürdigkeiten", "Sightseeing"],
            "link": "gallery.html?filter=sightseeing"
        },
        {
            "name": ["Sport"],
            "link": "gallery.html?filter=sport"
        },
        {
            "name": ["Einkaufen", "Shopping"],
            "link": "gallery.html?filter=shopping"
        }
    ],
    "filterTexts": {
        "all": ["Zeige alle Einträge", "Showing all items"],
        "sightseeing": ["Zeige Sehenswürdigkeiten", "Showing sightseeing"],
        "sport": ["Zeige Sport-Aktivitäten", "Showing sports activities"],
        "shopping": ["Zeige Einkaufsmöglichkeiten", "Showing shopping options"]
    }
};

// Variable to store loaded items
let galleryItems = [];

// Load gallery items from JSON file
async function loadGalleryItems() {
    try {
        const response = await fetch('data/gallery-items.json');
        const data = await response.json();
        galleryItems = data.items;
        return galleryItems;
    } catch (error) {
        console.error('Error loading gallery items:', error);
        return [];
    }
}

// Get URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    if (hasHalfStar) {
        starsHTML += '☆';
    }
    
    return starsHTML;
}

// Create gallery card HTML
function createGalleryCard(item, language) {
    const imageSource = Array.isArray(item.image) ? item.image[0] : item.image;
    const locationText = Array.isArray(item.location) ? item.location[language] : item.location;
    
    return `
        <div class="gallery-card" data-category="${item.category}" data-id="${item.id}" onclick="openDetailsPage(${item.id})">
            <img src="${imageSource}" alt="${item.title[language]}" loading="lazy">
            <div class="card-content">
                <div class="card-header">
                    <h3>${item.title[language]}</h3>
                </div>
                <p>${item.description[language]}</p>
                <div class="card-details">
                    <span class="location">📍 ${locationText}</span>
                    <div class="card-rating">
                        <span class="rating-stars">${generateStars(item.rating)}</span>
                        <span>${item.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Filter gallery items
function filterGallery(category) {
    const cards = document.querySelectorAll('.gallery-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
            card.classList.add('filtered');
        } else {
            card.classList.add('hidden');
            card.classList.remove('filtered');
        }
    });
}

// Update gallery page
async function updatePage(language) {
    
    // Update title
    document.getElementById('gallery-title').textContent = galleryData.title[language];
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.navigation a');
    galleryData.navigation.forEach((item, index) => {
        if (navLinks[index]) {
            navLinks[index].textContent = item.name[language] || item.name[0];
            navLinks[index].href = item.link;
        }
    });
    
    // Get current filter from URL
    const currentFilter = getURLParameter('filter') || 'all';
    
    // Update filter display text
    const filterDisplay = document.getElementById('filter-display');
    filterDisplay.textContent = galleryData.filterTexts[currentFilter][language];
    
    // Load items if not already loaded
    if (galleryItems.length === 0) {
        await loadGalleryItems();
    }
    
    // Generate gallery cards
    const galleryGrid = document.getElementById('gallery-grid');
    let galleryHTML = '';
    
    galleryItems.forEach(item => {
        galleryHTML += createGalleryCard(item, language);
    });
    
    galleryGrid.innerHTML = galleryHTML;
    
    // Apply filter
    filterGallery(currentFilter);
    
    // Update navigation active state
    document.querySelectorAll('.navigation a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeNav = document.querySelector(`[href*="filter=${currentFilter}"]`) || 
                     document.querySelector('[href="gallery.html"]');
    if (activeNav) {
        activeNav.classList.add('active');
    }
}

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', async function() {
    // Check if we're on the gallery page
    if (window.location.pathname.includes('gallery.html')) {
        await updatePage(language);
    }
});

// Function to open details page
function openDetailsPage(itemId) {
    window.location.href = `details.html?id=${itemId}`;
}
