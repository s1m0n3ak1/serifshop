document.addEventListener('DOMContentLoaded', () => {
    // variables
    const slides = document.querySelectorAll('.container__section');
    const nav = document.querySelector('#navigation');
    const backTopButton = document.querySelector('.back-to-top');
    const header = document.querySelector('#main-header');

    let windowH = window.innerHeight;
    let topOffset = window.scrollY;
    let navHide = false;
    let currentActive = 0;
    let current = Math.floor(topOffset / windowH + 0.5);

    // helper functions
    const addClass = (arr, link, nameOfClass) => arr[link].classList.add(nameOfClass);
    const removeClass = (arr, link, nameOfClass) => arr[link].classList.remove(nameOfClass);
    const removeClasses = (arr, nameOfClass) => [...Array(arr.length).keys()].forEach(link => removeClass(arr, link, nameOfClass));
    const fixHeader = (pos) => pos > 0 ? header.classList.add('sticky') : header.classList.remove('sticky');

    // helper function to activate / deactivate the navigation bullet
    const setClearTimeout = (intvalTarget, hideTarget, variable) => {
        intvalTarget.clearInterval(variable);
        hideTarget.classList.remove('hidden');
        navHide = intvalTarget.setTimeout(() => {
            hideTarget.classList.add('hidden');
        }, 3000);
    }

    // creating ul and document fragment
    const ul = document.createElement('ul');
    const fragment = document.createDocumentFragment();

    // build the nav
    slides.forEach((item, index) => {
        const newBullet = document.createElement('li');

        newBullet.setAttribute('data-scroll', `${ index }`);
        newBullet.classList.add('bullet');

        // we add an Event Listener to each navigation bullet
        newBullet.addEventListener('click', e => {
            const idx = item.attributes['data-anchestor'].value;
            let topScroll = 0;

            topScroll = item.offsetTop;
            removeClasses(slides, 'highlighted');
            addClass(slides, idx, 'highlighted');
            
            window.scrollTo({ top: topScroll, behavior: 'smooth' });
        });

        fragment.appendChild(newBullet);
    });

    ul.appendChild(fragment);
    nav.appendChild(ul);

    // definition of the variables to count 'slides' and select all the navigation 'bullets'
    const menuLinks = document.querySelectorAll('.bullet');

    // by using the addClass function we set the first navigation bullet and highlight the first slide
    addClass(menuLinks, currentActive, 'active');
    addClass(slides, currentActive, 'highlighted');

    // in case there's a resize event (the device orientation changes included)
    // we redefine the windowH and the we update the navigation bullet activation
    window.addEventListener('resize', () => {
        // constant update of the vertical scroll position and calculation
        // to obtain an int to be passed to the function addActive()
        windowH = window.innerHeight;
        current = slides.length - [...slides].reverse().findIndex((s) => window.scrollY >= s.offsetTop - (windowH / 2)) - 1

        if (current !== currentActive) {
            removeClasses(slides, 'highlighted');
            removeClasses(menuLinks, 'active');
            currentActive = current;
            addClass(slides, current, 'highlighted');
            addClass(menuLinks, current, 'active');
        }

        if (topOffset > windowH) backTopButton.classList.remove('hidden');
        else backTopButton.classList.add('hidden');
    });

    window.addEventListener('mousemove', () => setClearTimeout(window, nav, navHide));

    window.addEventListener('scroll', (e) => {
        // constant update of the vertical scroll position and calculation
        // to obtain an int to be passed to the function addActive()
        topOffset = window.scrollY;
        current = slides.length - [...slides].reverse().findIndex((s) => window.scrollY >= s.offsetTop - (windowH / 2)) - 1

        fixHeader(topOffset);

        if (current !== currentActive) {
            removeClasses(slides, 'highlighted');
            removeClasses(menuLinks, 'active');
            currentActive = current;
            addClass(slides, current, 'highlighted');
            addClass(menuLinks, current, 'active');
        }

        // handling of backTop button: if top
        if (topOffset > windowH) backTopButton.classList.remove('hidden');
        else backTopButton.classList.add('hidden');

        setClearTimeout(window, nav, navHide);
    });

    backTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

}, false);
