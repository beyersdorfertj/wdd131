const data_gen = {
    "language": [
        {
            "name": "English",
            "flag": "images/flag_us.svg"
        },
        {
            "name": "Deutsch",
            "flag": "images/flag_de.svg"
        },
    ]
}

// load language from localStorage , default 0 : German, 1 : English


let language = parseInt(localStorage.getItem('language')) || 0;

function updateLangButton(language) {
    document.getElementById('lang-flag').src = data_gen.language[language].flag;
    document.getElementById('lang-text').textContent = data_gen.language[language].name;
}

document.getElementById('lang-button').addEventListener('click', function() {
    language = (language + 1) % 2;
    localStorage.setItem('language', language);
    updateLangButton(language)
    updatePage(language);
});

document.querySelector("#currentyear").innerHTML = new Date().getFullYear();
document.querySelector("#lastModified").innerHTML = "Last Modification: " + document.lastModified;
updateLangButton(language);