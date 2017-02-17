const AppComponent = () => {
    return <div className="row">
        <div className="col-sm-8">
            <RecipeContainer url="/recipes" />
        </div>
        <div className="col-sm-4">
            <CommentContainer />
        </div>
    </div>
}
