const recipeLibraryView = document.querySelector('.recipe-library-view');
const individualRecipeView = document.querySelector('.individual-recipe-view');
const searchResultsView = document.querySelector('.search-results-view');
const recipeCardContainer = document.querySelector('.cards');
const userFavoritesButton = document.querySelector('.user-favorites');
const searchInput = document.getElementById('search-input');
const searchButton = document.querySelector('.search-button');

let recipeCards;
let user1 = new User();

window.addEventListener('load', setUpMainPageView);
recipeCardContainer.addEventListener('click', handlerFunction);
userFavoritesButton.addEventListener('click', toggleFavoriteRecipesView);
searchButton.addEventListener('click', searchForRecipe);

function searchForRecipe() {
  let recipeToDisplay = user1.searchByName(searchInput.value, recipeCards)
  toggleSearchResultsView()
  displaySearchedRecipe(recipeToDisplay[0])

  // if matching recipe found---fill in displayIngredients arguments and display
  // if not -- show error message

}

function displaySearchedRecipe(recipe) {
  console.log(recipe)
  console.log(recipe.name)
  searchResultsView.innerHTML = `
    <h2 class="individual-recipe-title">${recipe.name}</h2>
    <section class="individual-recipe-box">
      <div class="main-div">
        <img class='individual-recipe-img' src='${recipe.image}' alt="picture of yummy food">
        <!-- <p class="individual-recipe-ingredients">Ingredients: ${recipe.ingredients}</p> -->
      </div>
      <!-- <p class="individual-recipe-instructions">Instructions: ${recipe.instructions}</p> -->
    </section>
    `;
};


function toggleSearchResultsView() {
  recipeLibraryView.classList.add('hidden');
  individualRecipeView.classList.add('hidden');
  searchResultsView.classList.remove('hidden');
}

function handlerFunction(e) {

  if (e.target.closest('.recipe-name-container')) {
    let recipeDetails = getRecipeDetails(e)
    let instructionList = formatInstructions(recipeDetails)
    let ingredientList = formatIngredients(recipeDetails)
    displayIngredients(recipeDetails, instructionList, ingredientList)
    toggleIndividualRecipeView()
  }

  if (e.target.closest('.image-container')) {
    let recipeToAdd = getRecipe(e)
    user1.toggleFavoriteRecipes(recipeToAdd)
    toggleHeartColor(e)
  }
}

function getRecipe(e) {
  let recipeID = e.target.closest('.favorites-button')
  let recipeToFavorite = recipeData.find(recipeCard => {
    return parseInt(recipeID.id) === recipeCard.id
  })
  return recipeToFavorite
}

function toggleHeartColor(e) {
  const heartButtons = document.querySelectorAll('.favorites-button');
  console.log(e.target)
  heartButtons.forEach(button => {
    if (button.classList.contains('hidden') && button.id === e.target.id) {
      button.classList.remove('hidden')
    } else if (button.id === e.target.id) {
      button.classList.add('hidden')
    }
  })
}

// how do you determine whether you're adding or removing a recipe-- make show/hide buttons dependent on whether you're adding or removing from favorites array

function removeFromUserFavorites() {}


function getRecipeDetails(e) {
  let individualRecipe = e.target.closest('.recipe-name-container')
  let recipeToDisplay = recipeCards.find(recipeCard =>
    recipeCard.name === individualRecipe.innerText);
  return recipeToDisplay
}

function formatIngredients(recipe) {
  let ingredients = recipe.getIngredients(ingredientsData)
  let ingredientList =
   recipe.ingredients.reduce((ingredientList, ingredient) => {
    ingredientList += `${ingredient.name}: ${ingredient.amount} ${ingredient.unit} </br>`
    return ingredientList;
  },'')
  console.log(ingredientList)
  return ingredientList;
}

function formatInstructions(recipe) {
  recipe.getInstructions()
  return recipe.instructions
}

function displayIngredients(recipe, instructions, ingredients) {
  individualRecipeView.innerHTML = `
    <h2 class="individual-recipe-title">${recipe.name}</h2>
    <section class="individual-recipe-box">
      <div class="main-div">
        <img class='individual-recipe-img' src='${recipe.image}' alt="picture of yummy food">
        <p class="individual-recipe-ingredients">Ingredients: ${ingredients}</p>
      </div>
      <p class="individual-recipe-instructions">Instructions: ${instructions}</p>
    </section>
    `;
};

function toggleIndividualRecipeView() {
  recipeLibraryView.classList.add('hidden');
  individualRecipeView.classList.remove('hidden');
}

function toggleFavoriteRecipesView() {
  recipeLibraryView.classList.add('hidden');
  individualRecipeView.classList.add('hidden');
  searchResultsView.classList.remove('hidden');
}

function setUpMainPageView() {
  recipeCards = recipeData.map(currentRecipe => {
    let recipeCardData = new Recipe(currentRecipe.id, currentRecipe.image, currentRecipe.ingredients, currentRecipe.instructions, currentRecipe.tags, currentRecipe.name);
    return recipeCardData;
  })
  showRecipeCards(recipeCards);
}

function showRecipeCards(recipeCards) {
  recipeCards.map((currentRecipeCard) => {
    recipeCardContainer.innerHTML +=
    `
    <div class="card" id="${currentRecipeCard.id}">
      <div class="image-container" style="--image-url:url(${currentRecipeCard.image})">
        <input type="image" class="favorites-button" id="${currentRecipeCard.id}" alt="Add to favorites" src="../images/favorites-icon-inactive.png">
        <input type="image" class="favorites-button hidden"  id="${currentRecipeCard.id}" alt="Add to favorites" src="../images/favorites-icon-active.png">
      </div>
      <div class="recipe-name-container">
        <h3 class="recipe-name">${currentRecipeCard.name}</h3>
      </div>
    </div>
    `
  })
}


// function searchByTag(searchedTag, recipeList) {
//   let selectedRecipes = [];
//   recipeList.forEach(recipe => {
//     if (recipe.tags.includes(searchedTag)) {
//       selectedRecipes.push(recipe);
//     }
//   });
//   if (selectedRecipes.length === 0) {
//     return 'Sorry, not a valid entry.'
//   }
//   return selectedRecipes;
// }
