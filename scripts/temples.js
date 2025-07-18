const mainnav = document.querySelector('nav');
const hambutton = document.querySelector('#menu');
const albumtitle = document.querySelector('#album-title');

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
    albumtitle.classList.toggle('show');
});

document.querySelector("#currentyear").innerHTML = new Date().getFullYear();
document.querySelector("#lastModified").innerHTML = "Last Modification: " + document.lastModified;