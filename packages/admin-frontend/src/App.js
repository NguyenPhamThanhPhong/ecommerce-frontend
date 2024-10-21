import './App.css';
import RecipeReviewCard from '@ecommerce/shared/src/RecipeReviewCard';


function App() {
  return (
    <div className="App">

      <RecipeReviewCard onClick={() => alert('Hello from the shared button!')}>
        Click me!
      </RecipeReviewCard>

    </div>
  );
}

export default App;
