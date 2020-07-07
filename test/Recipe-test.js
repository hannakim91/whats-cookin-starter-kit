const expect = require('chai').expect;

const Recipe = require('../src/Recipe');
const recipe1Ingredients = [
  {
    "id": 20081,
    "quantity": {
      "amount": 1.5,
      "unit": "c"
    }
  },
  {
    "id": 18372,
    "quantity": {
      "amount": 0.5,
      "unit": "tsp"
    }
  },
  {
    "id": 1123,
    "quantity": {
      "amount": 1,
      "unit": "large"
    }
  }
];

const recipe2Ingredients = [
  {
    "id": 1009016,
    "quantity": {
      "amount": 1.5,
      "unit": "cups"
    }
  },
  {
    "id": 9003,
    "quantity": {
      "amount": 2,
      "unit": ""
    }
  },
  {
    "id": 20027,
    "quantity": {
      "amount": 1,
      "unit": "tablespoon"
    }
  }
];

describe('Recipe', function() {

  let recipe, recipe2;
  beforeEach(function() {
    recipe1 = new Recipe(595736, "https://spoonacular.com/recipeImages/595736-556x370.jpg", recipe1Ingredients);
    recipe2 = new Recipe(678353, "https://spoonacular.com/recipeImages/678353-556x370.jpg", recipe2Ingredients);
  });

  it('should be a function', function() {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    expect(recipe1).to.be.an.instanceof(Recipe);
  });

  it('should have an id number', function() {
    expect(recipe1.id).to.equal(595736);
  });

  it('should be able to have a different id number', function() {
    expect(recipe2.id).to.equal(678353);
  });


});