// Details page functionality
let galleryData = null;
let currentItem = null;

// Load the details when page loads
document.addEventListener('DOMContentLoaded', async function() {
    await loadDetailsData();
    setupEventListeners();
});

// Load gallery data and display the specific item
async function loadDetailsData() {
    try {
        // Get item ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const itemId = parseInt(urlParams.get('id'));

        if (!itemId) {
            console.error('No item ID provided');
            showError();
            return;
        }

        // Load gallery data
        console.log("itemid", itemId);
        const response = await fetch('data/gallery-items.json');
        console.log("item res", itemId, response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        galleryData = await response.json();
        
        console.log("itemid2", itemId);
        // Find the specific item
        currentItem = galleryData.items.find(item => item.id === itemId);
        
        if (!currentItem) {
            console.error('Item not found');
            showError();
            return;
        }

        // Display the item details
        displayItemDetails();
        
        // Setup navigation for details page
        setupDetailsNavigation();
        
    } catch (error) {
        console.error('Error loading details data:', error);
        showError();
    }
}

// Display the item details on the page
function displayItemDetails() {
    if (!currentItem) return;
    
    // Update page title
    document.title = `${getLocalizedText(currentItem.title, language)} - Friedrichsdorf Details`;
    
    // Update main content
    updateElement('details-title', getLocalizedText(currentItem.title, language));
    updateElement('details-description', getLocalizedText(currentItem.description, language));
    updateElement('location-text', getLocalizedText(currentItem.location, language));
    
    // Update rating
    updateRating(currentItem.rating);
    
    // Update image
    const image = document.getElementById('details-image');
    const imageSource = currentItem.image[1];
    image.src = imageSource;
    image.alt = getLocalizedText(currentItem.title, language);
    
    // Update category badge
    updateElement('details-category-badge', currentItem.category);
    
    // Update facts if available
    updateFacts(currentItem.facts, language);

    // Update extended text if available
    updateExtendedText(currentItem.text, language);
    
    // Update source if available
    updateSource(currentItem.source);
    
    // Update language-specific UI
    updateDetailsLanguage(language);
}

// Update rating stars and value
function updateRating(rating) {
    const starsElement = document.getElementById('details-stars');
    const ratingElement = document.getElementById('details-rating-value');
    
    if (rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        let starsHTML = '';
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '★';
        }
        if (hasHalfStar) {
            starsHTML += '☆';
        }
        
        starsElement.innerHTML = starsHTML;
        ratingElement.textContent = rating.toFixed(1);
    }
}

// Update facts section
function updateFacts(facts, language) {
    const factsSection = document.getElementById('details-facts');
    const factsList = document.getElementById('facts-list');
    
    if (facts && facts.length > 0) {
        factsList.innerHTML = '';
        facts.forEach(fact => {
            const factItem = document.createElement('div');
            factItem.className = 'fact-item';
            factItem.innerHTML = `
                <h4>${getLocalizedText(fact.title, language)}</h4>
                <p>${getLocalizedText(fact.text, language)}</p>
            `;
            factsList.appendChild(factItem);
        });
        factsSection.classList.remove('hidden');
    } else {
        factsSection.classList.add('hidden');
    }
}

// Update extended text section
function updateExtendedText(text, language) {
    const textSection = document.getElementById('details-text');
    const extendedText = document.getElementById('extended-text');
    
    if (text && text.length > 0) {
        extendedText.textContent = getLocalizedText(text, language);
        textSection.classList.remove('hidden');
    } else {
        textSection.classList.add('hidden');
    }
}

// Update source section
function updateSource(source) {
    const sourceSection = document.querySelector('.details-source');
    const sourceLink = document.getElementById('source-link');
    
    if (source) {
        sourceLink.href = source;
        sourceLink.textContent = source;
        sourceSection.classList.remove('hidden');
    } else {
        sourceSection.classList.add('hidden');
    }
}

// Update language-specific UI elements
function updateDetailsLanguage(language) {
    const translations = {
        locationTitle: ['Standort', 'Location'],
        factsTitle: ['Fakten', 'Facts'],
        moreInfoTitle: ['Weitere Informationen', 'More Information'],
        sourceTitle: ['Quelle', 'Source'],
        backText: ['Zurück zur Galerie', 'Back to Gallery']
    };
    
    Object.keys(translations).forEach(key => {
        const element = document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, ''));
        if (element) {
            element.textContent = translations[key][language];
        }
    });
    
    // Update specific elements
    updateElement('location-title', translations.locationTitle[language]);
    updateElement('facts-title', translations.factsTitle[language]);
    updateElement('more-info-title', translations.moreInfoTitle[language]);
    updateElement('source-title', translations.sourceTitle[language]);
    updateElement('back-text', translations.backText[language]);
}

// Setup event listeners
function setupEventListeners() {
    // Close button
    const closeButton = document.getElementById('close-button');
    closeButton.addEventListener('click', goBackToGallery);
    
    // Back button
    const backButton = document.getElementById('back-to-gallery');
    backButton.addEventListener('click', goBackToGallery);
   
    // Keyboard support for close (Escape key)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            goBackToGallery();
        }
    });
}

// Go back to gallery
function goBackToGallery() {
    // Try to get the referrer to maintain filter state
    const referrer = document.referrer;
    if (referrer && referrer.includes('gallery.html')) {
        window.location.href = referrer;
    } else {
        window.location.href = 'gallery.html';
    }
}

// Show error message
function showError() {
    const container = document.querySelector('.details-container');
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h1>Item nicht gefunden / Item not found</h1>
            <p>Das angeforderte Item konnte nicht geladen werden. / The requested item could not be loaded.</p>
            <button onclick="goBackToGallery()" class="back-button">
                ← Zurück zur Galerie / Back to Gallery
            </button>
        </div>
    `;
}

// Setup navigation specifically for details page
function setupDetailsNavigation() {
    // Clear existing navigation content
    const navigation = document.querySelector('.navigation');
    if (navigation) {
        navigation.innerHTML = '<a id="nav-home" href="home.html">Home</a>';
    }
}

// Helper function to get localized text
function getLocalizedText(textArray, language) {
    if (Array.isArray(textArray)) {
        return textArray[language] || textArray[0] || '';
    }
    return textArray || '';
}

// Helper function to update element content safely
function updateElement(elementId, content) {
    const element = document.getElementById(elementId);
    if (element && content !== undefined) {
        element.textContent = content;
    }
}

function updatePage() {
    updateLangButton(language);
    displayItemDetails(language);
}

updatePage();