let searchbtn = document.querySelector(".search")
let recipeContainer = document.querySelector(".recipe-container")
let searchbox = document.querySelector(".searchBox")
let recipeDetailsContent = document.querySelector(".recipe-details-content")
let recipeCloseBtn = document.querySelector(".recipe-close-btn")
let recipePopup = document.querySelector(".recipe-popup")
// fetching data
let fetchdata = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes....</h2>"
    try {


        let res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

        recipeContainer.innerHTML = ""
        res.data.meals.forEach(meal => {
            let recipeDiv = document.createElement("div")
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="">
        <h3>${meal.strMeal} </h3>
        <p><span>${meal.strArea}</span> Dish </p>
        <p> Belongs to <span>${meal.strCategory}</span> Category </p>
        
        `

            let button = document.createElement("button")
            button.textContent = "Review Recipe"
            recipeDiv.append(button)


            button.addEventListener("click", () => {
                openPopup(meal)
            })


            recipeContainer.appendChild(recipeDiv)
        });
    } catch (error) {
        recipeContainer.innerHTML = `<h2>Check your meal again</h2>`
    }
}


let openPopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal} </h2>
    <h3>Ingredents </h3>
    <ul  class="ingredientList">${fetchIngredents(meal)} </ul>
    <div class="recipe-instruction">
        <h3>Instruction</h3>
        <p>${meal.strInstructions}</p>
    </div>
    
    
    `

    recipeDetailsContent.parentElement.style.display = "block";

}


let fetchIngredents = (meal) => {
    let IngredentsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredent = meal[`strIngredient${i}`];
        if (ingredent) {
            const measure = meal[`strMeasure${i}`]
            IngredentsList += `<li> ${measure} ${ingredent}</li>`
        } else {
            break;
        }

    }
    return IngredentsList;
}


recipeCloseBtn.addEventListener("click", () => {
    recipeDetailsContent.parentElement.style.display = "none"
})
searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    let searchinp = searchbox.value.trim()
    if (!searchinp) {
        recipeContainer.innerHTML = `<h2> Type the meal in the search box </h2>`
        return;
    }
    fetchdata(searchinp)
})