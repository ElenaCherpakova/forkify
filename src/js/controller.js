import * as model from './model.js';
import recipeView from './views/recipeView.js';

//polyfilling for everythin else (support any most real-old browsers )
import 'core-js/stable';
//polyfilling async/await
import 'regenerator-runtime/runtime';



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

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
}
init()