const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "images/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/yigo_guam_temple_2.webp",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "images/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "images/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Frankfurt Germany",
    location: "Frankfurt, Germany",
    dedicated: "1987, October, 28",
    area: 32895,
    imageUrl: "images/frankfurt_temple.webp",
  },
  {
    templeName: "Freiberg Germany",
    location: "Freiberg, Germany",
    dedicated: "1985, June, 30",
    area: 21500,
    imageUrl: "images/freiberg_temple.webp",
  },
  {
    templeName: "Den Haag Netherlands",
    location: "Den Haag, Netherlands",
    dedicated: "2002, April, 30",
    area: 15000,
    imageUrl: "images/den_haag_temple.webp"
  },
  {
    templeName: "Salt Lake City Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl: "images/salt_lake_temple.webp"
  }
];

const mainnav = document.querySelector('nav');
const hambutton = document.querySelector('#menu');
const albumtitle = document.querySelector('#album-title');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
    albumtitle.classList.toggle('show');
});

document.querySelector('#filter-no').addEventListener('click', () => {
    setActiveButton('#filter-no');
    createTempleCards();
});
document.querySelector('#filter-old').addEventListener('click', () => {
    setActiveButton('#filter-old');
    createTempleCards(temples.filter(temple => new Date(temple.dedicated) < new Date('1900-01-01')));
});
document.querySelector('#filter-new').addEventListener('click', () => {
    setActiveButton('#filter-new');
    createTempleCards(temples.filter(temple => new Date(temple.dedicated) >= new Date('2001-01-01')));
});
document.querySelector('#filter-large').addEventListener('click', () => {
    setActiveButton('#filter-large');
    createTempleCards(temples.filter(temple => temple.area > 90000));
});
document.querySelector('#filter-small').addEventListener('click', () => {
    setActiveButton('#filter-small');
    createTempleCards(temples.filter(temple => temple.area <= 10000));
});

function setActiveButton(activeButtonId) {
    // Entferne active Klasse von allen Buttons
    document.querySelectorAll('nav a').forEach(button => {
        button.classList.remove('active');
    });
    // Füge active Klasse zum geklickten Button hinzu
    document.querySelector(activeButtonId).classList.add('active');
}

createTempleCards();

// Setze Home Button als standardmäßig aktiv
setActiveButton('#filter-no');

function createTempleCards(filteredTemples = temples) {
    let index = 0;
    document.querySelector('#temple-gallery').innerHTML = filteredTemples.map((temple) => `
        <section>
            <h3>${temple.templeName}</h3>
            <p><span class="label">Location:</span> ${temple.location}</p>
            <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
            <p><span class="label">Size:</span> ${temple.area} sq ft</p>
            <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" width="400" height="250" ${index++ === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
        </section>
    `).join('');
}

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = "Last Modification: " + document.lastModified;
