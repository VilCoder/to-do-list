import steak from '../image/steak.jpg';
import lamb from '../image/lamb.jpg';
import duck from '../image/duck-confit.jpg';
import fish from '../image/fish.jpg';
import salmon from '../image/salmon.jpg';
import cream from '../image/pepper-cream.jpg';
import filo from '../image/stuffed-filo.jpg';
import pear from '../image/poached-pear.jpg';

function displayMenu() {
    const menuContent = document.querySelector('#content');
    // menuContent.style.backgroundImage = '';
    menuContent.textContent = '';

    const containerTitle = document.createElement('div');
    containerTitle.classList.add('container__title');

    const menuTitle = document.createElement('h1');
    menuTitle.classList.add('title');
    menuTitle.textContent = 'Menu';
    containerTitle.appendChild(menuTitle);

    menuContent.appendChild(containerTitle);

    const containerDishes = document.createElement('div');
    containerDishes.classList.add('container__dishes');

    const steakImage = new Image();
    steakImage.src = steak

    const lambImage = new Image();
    lambImage.src = lamb;

    const duckImage = new Image();
    duckImage.src = duck;
    
    const fishImage = new Image();
    fishImage.src = fish;

    const salmonImage = new Image();
    salmonImage.src = salmon;

    const creamImage = new Image();
    creamImage.src = cream;

    const filoImage = new Image();
    filoImage.src = filo;

    const pearImage = new Image();
    pearImage.src = pear;

    const dishes = [
        {
            image: steakImage.src,
            info: 'Fillet in red wine and 3 peppers',
            price: '$18'
        },
        {
            image: lambImage.src,
            info: 'Lamb on port and mint reduction',
            price: '$19'
        },
        {
            image: duckImage.src,
            info: 'Duck confit with orange and leek sauce',
            price: '$18'
        },
        {
            image: fishImage.src,
            info: 'Fresh fish with soy sauce and saffron',
            price: '$15'
        },
        {
            image: salmonImage.src,
            info: 'Salmon in white wine and fennel',
            price: '$23'
        },
        {
            image: creamImage.src,
            info: 'Roasted pepper cream',
            price: '$14'
        },
        {
            image: filoImage.src,
            info: 'Filo stuffed with portobello mushroom and tomato sauce',
            price: '$17.5'
        },
        {
            image: pearImage.src,
            info: 'Poached pear with vanilla sauce',
            price: '$15'
        },
    ];

    dishes.forEach(dish => {
        const containerDish = document.createElement('div');
        containerDish.classList.add('container__dish');

        const dishImage = document.createElement('div');
        dishImage.classList.add('dish__image');
        dishImage.style.backgroundImage = `url('${dish.image}')`;

        const dishInfo = document.createElement('p');
        dishInfo.classList.add('dish__info');
        dishInfo.textContent = dish.info;

        const dishPrice = document.createElement('span');
        dishPrice.classList.add('dish__price');
        dishPrice.textContent = dish.price;

        containerDish.appendChild(dishImage);
        containerDish.appendChild(dishInfo);
        containerDish.appendChild(dishPrice);

        containerDishes.appendChild(containerDish);
    });

    menuContent.appendChild(containerDishes);       

}

export {
    displayMenu,
}