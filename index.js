document.addEventListener('prechange', ({ target, tabItem }) => {
    if (target.matches('#tabbar')) {
      document.querySelector('#home-toolbar .center').innerHTML = tabItem.getAttribute('label');
    }
  });

let url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

// document.addEventListener('prechange',function(event){
//     document.querySelector('ons-toolbar .center')
//        .innerHTML=event.tabItem.getAttribute('label');
//     });
     
     
    // code for fetch https://web.dev/introduction-to-fetch/
    function getRandomCocktail() {
       fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
       .then(
       function(resp) {
           if (resp.status !== 200) {
           return;
           }
           resp.json().then(function(data) {
           displayRandomCocktail(data);
           });
       }
       )
       .catch(function(err) {
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
     
       drinkSection.appendChild(img);
       for(let i = 1; i < 16; i++) {
     
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
     
    // PullToRefresh.init({
    //     mainElement: '#main',
    //     onRefresh(done) {
    //         setTimeout(() => {
    //             done();
    //             alert('refresh');
    //         }, 1500);
    //     }
    // });
    