document.addEventListener('DOMContentLoaded', () => {

    // here we select all the haikus and set a var and we select
    // and store in a var the <nav> element then we create the virtual
    // elements ul and the fragment
    const haikus = document.querySelectorAll('.container__section');
    const nav = document.querySelector('#navigation');
    const ul = document.createElement('ul');
    const fragment = document.createDocumentFragment();

    // we store the initial viewport height
    let windowH = window.innerHeight;

    // build the nav
    haikus.forEach((item, index) => {

        // creating the virtual element <li>
        const newBullet = document.createElement('li');

        // here we set the attribute data-scroll with the increasing index
        // starting from 0 in order to scroll top in when we'll use .scrollTo
        // and we add a class '.bullet' to select these elements later on
        newBullet.setAttribute('data-scroll', `${ index }`);
        newBullet.classList.add('bullet');
        
        // we add an Event Listener to each navigation bullet
        newBullet.addEventListener('click', (e) => {
            // on click we find out what is the index to scroll we set up just before
            // with attribute 'data-scroll', which we can select opening the event.target.dataset
            // and parsing the attribute value from a string to a number
            const idx = parseInt(e.target.dataset.scroll);
            
            // once we have the scroll index we can calculate the amount of scroll we need
            // by multiplying the viewport height (windowH) for the parsed number we selected
            // from the target dataset additionally we can specify, which kind of animation we want
            window.scrollTo({
                top: windowH * idx,
                behavior: 'smooth'
            })
        });

        // after have defined all the attributes for each bullet, we append
        // the populated elements to the virtual fragment defined before
        fragment.appendChild(newBullet);
    });

    // here we append the fragmet to the ul and finally 
    // we attach the whole element to the DOM node <nav>
    ul.appendChild(fragment);
    nav.appendChild(ul);
  
    // definition of the variables to count 'slides' and select all the navigation 'bullets'
    const slides = document.querySelectorAll('.container__section');
    const menuLinks = document.querySelectorAll('.bullet');
    // here we store in a var the header container
    const header = document.querySelector('#main-header');
    
    // here we select all the slides from the DOM and we just create an array of numbers 
    // which we'll iterate to remove the precedently selected bullet
    const keyArr = [...Array(slides.length).keys()];    
    
    // helper functions to activate / deactivate the navigational bullet
    const addActive = (link) => menuLinks[link].classList.add('active');
    const removeActive = (link) => menuLinks[link].classList.remove('active');
    const removeActives = () => keyArr.forEach(link => removeActive(link));
    // with this function we add a class to the main header
    // and by scrolling the header will change style
    const fixHeader = (pos) => pos > 0 ? header.classList.add('fixed') : header.classList.remove('fixed');
    
    // changeable variables: amount of vertical scroll and the definition of which
    // navigation bullet is currently selected (set to 0 as initial value)
    let topPos = window.scrollY;
    let currentActive = 0;
    let current = Math.floor(topPos / windowH + 0.5);

    // by using the addActive function we set the first navigation bullet 
    addActive(currentActive);

    // in case there's a resize event (the device orientation changes included)
    // we redefine the windowH and the we update the navigation bullet activation
    window.addEventListener('resize', () => {

        // constant update of the vertical scroll position and calculation
        // to obtain an int to be passed to the function addActive()
        windowH = window.innerHeight;
        current = Math.floor(topPos / windowH + 0.5);

        // here we use all the functions we need to update which bullet is selected
        // before defining which bullet is selected addActives() we update
        // the 'currentActive' to be equal to the value of 'current'
        if (current !== currentActive) {
            removeActives();
            currentActive = current;
            addActive(current);
        }
    });
    
    // we listen for the window scroll event
    window.addEventListener('scroll', () => {

        // constant update of the vertical scroll position and calculation
        // to obtain an int to be passed to the function addActive()
        topPos = window.scrollY;        
        current = Math.floor(topPos / windowH + 0.5);
        
        // update the header during the scrolling event
        fixHeader(topPos);
        
        // here we use all the functions we need to update which bullet is selected
        // before defining which bullet is selected addActives() we update
        // the 'currentActive' to be equal to the value of 'current'
        if (current !== currentActive) {
            removeActives();
            currentActive = current;
            addActive(current);
        }
    });
}, false);
