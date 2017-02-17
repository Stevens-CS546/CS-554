const AppComponent = () => {
    return <div className="row">
        <div className="col-sm-8">
            <RecipeList url="/recipes" />
        </div>
        <div className="col-sm-4">
            Comment box goes here
        </div>
    </div>
}
