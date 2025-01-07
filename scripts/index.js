document.getElementById("copyright-text").innerHTML = "&copy; Cantor College - " + new Date().getFullYear();

const mobileMenu = document.getElementById('mobile-hamburger');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('mobile');
});