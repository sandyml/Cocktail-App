document.addEventListener('prechange',function(event){
document.querySelector('ons-toolbar .center')
    .innerHTML=event.tabItem.getAttribute('label');
});


// code for fetch https://web.dev/introduction-to-fetch/
function getRandomCocktail() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(
    function(resp) {
        if (resp.status !== 200) {
        // console.log('Looks like there was a problem. Status Code: ' +
        //     resp.status);
        return;
        }
        resp.json().then(function(data) {
        // console.log(data);
        displayRandomCocktail(data);
        });
    }
    )
    .catch(function(err) {
    // console.log('Fetch Error :-S', err);
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
        // console.log();
        if(cocktail.drinks[0][`strIngredient${i}`] == null || cocktail.drinks[0][`strIngredient${i}`] == '') {
            break;

        }
        
        let ingredient = document.createElement('ons-list-item');
        ingredient.innerHTML = cocktail.drinks[0][`strMeasure${i}`] + ': ' + cocktail.drinks[0][`strIngredient${i}`];
        
        drinkSection.appendChild(ingredient);
    }

    const manual = document.createElement('manual');
    manual.innerHTML = cocktail.drinks[0].strInstructions;
    drinkSection.appendChild(manual);

}
