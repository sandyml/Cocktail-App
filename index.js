console.info('index.js loaded');

document.addEventListener('prechange',function(event){
document.querySelector('ons-toolbar .center')
    .innerHTML=event.tabItem.getAttribute('label');
});

function getRandomCocktail() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(
    function(resp) {
        if (resp.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
            resp.status);
        return;
        }
        resp.json().then(function(data) {
        // console.log(data);
        displayRandomCocktail(data);
        });
    }
    )
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
    });
}
getRandomCocktail();

function displayRandomCocktail(cocktail) {
    console.log(cocktail.drinks[0]);
    let drinkSection = document.querySelector('#drink-section');
    let drinkName = document.createElement('h2');
    drinkName.innerHTML = cocktail.drinks[0].strDrink;
    drinkSection.appendChild(drinkName);

    let img = document.createElement('img');
    img.src = cocktail.drinks[0].strDrinkThumb;

    // = 1 so it won't show undefined 
    drinkSection.appendChild(img);
    for(let i = 1; i < 16; i++) {
        // console.log(i);
        console.log();

        if(cocktail.drinks[0][`strIngredient${i}`] === null) {
            break;
            //by doing this, all the 'null' ingredients will be removed and only keep the ingredients that the cocktails need, if it looks up the ingredients and its equal to null - no ingredients there then it breals out of the loop and moves on with any other code if there is any (remove this) 
        }
        
        let ingredient = document.createElement('ons-list-item');
        ingredient.innerHTML = cocktail.drinks[0][`strMeasure${i}`] + ': ' + cocktail.drinks[0][`strIngredient${i}`];
        
        drinkSection.appendChild(ingredient);
    }

    let card = document.createElement('card');
    card.innerHTML = cocktail.drinks[0].strInstructions;
    drinkSection.appendChild(card);

}