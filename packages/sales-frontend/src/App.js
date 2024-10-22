import './App.css';
import React from 'react';
import RecipeReviewCard from '@ecommerce/shared/src/RecipeReviewCard';


function App() {

  return (
    <div className="App">
      <RecipeReviewCard onClick={() => alert('Hello from the shared button!')}>
        Click me!
      </RecipeReviewCard>
      {console.log('Hello from the sales frontend!')}

    </div>
  );
}

export default App;
