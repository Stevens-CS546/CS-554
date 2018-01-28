const RecipeList = ({recipes}) => {
    return <div>
        {recipes.map((recipe) => {
            return (
                <Recipe
                    key={recipe.id}
                    title={recipe.title}
                    description={recipe.description}
                    id={recipe.id}
                    steps={recipe.steps}
                    ingredients={recipe.ingredients} />
            );
        })}
    </div>;
};