import {useState, useEffect} from "react"
import Recipe from "./Recipe"
import './App.css';

function App() {
  
  
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("chicken")
  useEffect(() => {
   getRecipes();
  }, [query])

  const getRecipes = async()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`)
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data.hits);
  }

  const UpdateSearch = (e)=>{
    setSearch(e.target.value)
    console.log(search);
  }

  const getSearch = (e)=>{
      e.preventDefault()
      setQuery(search)
      setSearch("")
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text"
        value={search}
        onChange={UpdateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map((recipe)=>(
          <Recipe 
          key={recipe.recipe.label}
          ingredients={recipe.recipe.ingredients}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image} />
        ))}
        </div>
    </div>
  );
}

export default App;
