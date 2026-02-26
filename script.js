document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#navList a');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            navLinks.forEach(l => l.classList.remove('active-link'));
            sections.forEach(s => s.classList.remove('active'));


            this.classList.add('active-link');


            const targetId = this.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    navLinks[0].click(); // data sources as default on page load
});