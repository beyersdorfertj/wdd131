const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');
console.log(mainnav, hambutton);

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

const navigation = document.querySelector('.navigation');
navigation.addEventListener('click', function(listElement) {
    document.querySelectorAll('.navigation li a').forEach(link => {
        if (link == listElement.target) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

});