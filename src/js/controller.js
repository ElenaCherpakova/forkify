import * as model from './model.js';
import recipeView from './views/recipeView.js';

//polyfilling for everythin else (support any most real-old browsers )
import 'core-js/stable';
//polyfilling async/await
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//https://forkify-api.herokuapp.com/v2

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //1) Load a recipe
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    //2) render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);

// window.addEventListener('hashchange', controlRecipes)
// window.addEventListener('load', controlRecipes)
