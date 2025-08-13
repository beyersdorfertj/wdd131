const data = {
    "navigation": [
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
    "data": {
        "header": ["Fakten", "Facts"],
        "rows":[
        {
            "name": ["Bevölkerung", "Population"],
            "value": "25,000"
        },
        {
            "name": ["Fläche", "Area"],
            "value": "30.13 km²"
        },
        {
            "name": ["Einwohner", "Inhabitants"],
            "value": "25.871"
        },
        {
            "name": ["Bezirk", "District"],
            "value": "Hochtaunuskreis"
        },
        {
            "name": ["Land", "Country"],
            "value": "Hessen/Germany"
        },
        {
            "name": ["Zeitzone", "Time Zone"],
            "value": "UTC+2"
        }
    ]},
    "weather": {
        "header": ["Wetter", "Weather"],
        "icon": {
            "src": "images/weather_clouds_sun_sunny_icon.svg",
            "id": "weather-icon"
        },
        "rows": [
            {
                "name": ["Temperatur", "Temperature"],
                "id": "temperature",
                "value": "15°C"
            },
            {
                "name": ["Bedingungen", "Conditions"],
                "value": "Teilweise bewölkt"
            },
            {
                "name": ["Wind", "Wind"],
                "value": "5 km/h",
                "id": "windSpeed"
            },
            {
                "name": ["Windchill", "Wind Chill"],
                "value": "13°C",
                "id": "windChill"
            }
        ]
    },
    "title": ["Willkommen in Friedrichsdorf", "Welcome to Friedrichsdorf"],
    "content": [
        ["Die Stadt des berühmten Telefonerfinders hat viel zu bieten: Friedrichsdorf verbindet das charmante Flair einer Kleinstadt mit der Nähe zur Großstadt - es liegt malerisch am Südhang des Taunus in unmittelbarer Nachbarschaft zur lebhaften Metropole Frankfurt am Main.",
        "The city of the famous telephone inventor has a lot to offer: Friedrichsdorf combines the charming flair of a small town with the proximity to the big city - it is located picturesque at the southern slope of the Taunus in immediate vicinity to the lively metropolis of Frankfurt am Main."
        ],
        ["Das breite Bildungsangebot sowie die zahlreichen Möglichkeiten für Freizeit, Kultur und Sport machen Friedrichsdorf zu einer familienfreundlichen Stadt mit hoher Wohn- und Lebensqualität, die gut 26.000 Menschen vor Ort genießen.",
        "The wide range of educational opportunities as well as the numerous options for leisure, culture and sports make Friedrichsdorf a family-friendly city with a high quality of living and life that around 26,000 people enjoy on site."
        ],
        ["Entdecken Sie unsere Stadt in ihrer ganzen Vielfalt! Auf den folgenden Seiten erfahren Sie mehr über die Friedrichsdorfer Stadtteile und Stadtgeschichte sowie über die attraktiven Einkaufsmöglichkeiten und Gastronomieangebote.",
        "Discover our city in all its diversity! On the following pages you will learn more about the Friedrichsdorf districts and city history as well as about the attractive shopping and gastronomy offers."
        ]
    ]
};

function addDataTable(data, element) {
    console.log(data, element);
    if (element) {
        let html = '';
        
        if (data.header) {
            html += '<div class="header-row">';
            html += `<h2>${data.header[language]}</h2>`;
            if (data.icon) {
                const iconId = data.icon.id ? ` id="${data.icon.id}"` : '';
                html += `<img src="${data.icon.src}" width="60" height="60"${iconId}>`;
            }
            html += '</div>';
        }

        if (data.rows) {
            html += '<table><tbody>';
            data.rows.forEach(row => {
                const tdId = row.id ? ` id="${row.id}"` : '';
                html += `<tr><th>${row.name[language]}:</th><td${tdId}>${row.value}</td></tr>`;
            });
            html += '</tbody></table>';
        }
        
        element.innerHTML = html;
    }
};

// Funktion zum Setzen des Flag-Bildes
function updatePage(language) {
    updateLangButton(language)

    const navLinks = document.querySelectorAll('.navigation a');
    data.navigation.forEach((item, index) => {
        if (navLinks[index]) {
            // Verwende die entsprechende Sprache oder fallback zur ersten verfügbaren
            navLinks[index].textContent = item.name[language] || item.name[0];
            navLinks[index].href = item.link;
        }
    });

    document.getElementById('main-title').textContent = data.title[language];
    addDataTable(data.data, document.getElementById('data'));
    addDataTable(data.weather, document.getElementById('weather'));

    const contentElement = document.getElementById('content');
    let contentHtml = '';
    data.content.forEach(item => {
        contentHtml += `<p>${item[language]}</p>`;
    });
    contentElement.innerHTML = contentHtml;
}

// Funktion beim Laden der Seite ausführen
updatePage(language);

