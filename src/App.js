import { useState, useEffect } from "react";
import "./assets/css/typography.css";
import "./assets/css/main.css";
import parse from "html-react-parser";
require("dotenv").config();
function App() {
  const url = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.REACT_APP_API_KEY}`;
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    document.title = "Random Recipe Generator 🍳";
  });
  const getRecipe = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
        setRecipe(resp.recipes[0]);
      });
  };
  return (
    <div className="container">
      <h1>
        Random Recipe Generator. <span className="img">🍳</span>
      </h1>
      <button onClick={getRecipe}>Generate Random Recipe</button>
      {Object.keys(recipe).length > 0 ? (
        <div>
          <h3>{recipe.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
          <div className="flex-container">
            <div>
              <h6>Ingredients</h6>
              <ul>
                {recipe.extendedIngredients.map((ingredient) => {
                  return (
                    <li>
                      {ingredient.name} ({ingredient.original})
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h6>Instructions</h6>
              {parse(recipe.instructions)}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
