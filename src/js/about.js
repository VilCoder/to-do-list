function displayAbout() {
    const aboutContent = document.querySelector('#content');
    aboutContent.textContent = '';
    aboutContent.insertAdjacentHTML(
        'beforeend',
        `<section class="content__description">
            <h1 class="description__title">About Awesome food</h1>
            <p class="description__text">
                At <strong>Awesome Food</strong>, we believe that good food is more than just a 
                delicious dish: it's an experience. Our restaurant was born from a passion for 
                combining fresh ingredients, innovative recipes, and a welcoming atmosphere where 
                every visit becomes a special moment.
            </p>
            <p class="description__text">
                From our starters to desserts, each dish is prepared with dedication and a unique 
                touch that will make you want to come back for more. Whether you're looking for a 
                casual meal with friends, a romantic dinner, or just to enjoy incredible flavors, 
                at <strong>Awesome Food</strong> you'll find the best in every bite.
            </p>
            <p class="description__text">
                We invite you to discover why the food here is not only good, but <em>awesome</em>! 🍽️✨
            </p>
        </section>
        <section class="content__opening">
            <h2 class="opening__title">Opening Hours</h2>
            <p class="opening__text">
                Monday - Friday: 10:00 AM - 9:00PM
            </p>
            <p class="opening__text">
                Saturday - Sunday: 2:00 PM - 10:00PM
            </p>
        </section>`

    );
}

export {
    displayAbout,
};