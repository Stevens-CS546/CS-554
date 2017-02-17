const Recipe = ({steps, title, description, ingredients}) => {
  let viewSteps = steps.map((step) => {
    return <li>{step}</li>;
  });

  let viewIngredients = ingredients.map((step) => {
    return <li>{step}</li>;
  });

  return (
    <div className="panel panel-default">
      <div className="panel-heading">{title}</div>
      <div className="panel-body">
        <div>
          <p>
            {description}
          </p>
          <div className="row">
            <div className="col-md-8">
              <ol>
                {viewSteps}
              </ol>
            </div>
            <div className="col-sm-4">
              <ul>
                {viewIngredients}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};