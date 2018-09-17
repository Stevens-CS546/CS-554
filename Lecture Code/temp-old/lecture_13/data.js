function Recipe(original) {
  if (this.constructor !== Recipe) {
    return new Recipe(original);
  }

  return {
    id: original.id,
    getFull() {
      return original;
    },
    getShort() {
      return {
        id: original.id,
        title: original.title,
        description: original.description
      };
    }
  };
}

const chemex = {
  id: 0,
  title: "Chemex Coffee",
  description: "Make a cup of chemex coffee, the proper way",
  imageAttribution:
    "https://pixabay.com/en/chemex-coffee-filterk%C3%A1v%C3%A9-1247169/",
  ingredients: [
    {
      displayTitle: "Coffee",
      systemTitle: "coffee",
      description: "Make sure it's coarsely and freshly ground",
      quantity: "33",
      unit: "grams"
    },
    {
      displayTitle: "Water",
      systemTitle: "water",
      description: "Heated to 196 degrees",
      quantity: "700",
      unit: "grams"
    },
    {
      displayTitle: "Splenda",
      systemTitle: "splenda",
      description: "May substitute with other artificial sweeteners",
      quantity: "3",
      unit: "packets"
    },
    {
      displayTitle: "Heavy Whipping Cream",
      systemTitle: "heavy whipping cream",
      description: "May substitute with non-dairy creamers",
      quantity: "1",
      unit: "tbsp"
    }
  ],
  steps: [
    "Bring water to a boil",
    "Grind 33g of coarse coffee",
    "Prepare chemex filter by adding hot water to it to dampen filter and draining wa" +
      "ter",
    "Add coffee to filter",
    "Bloom coffee by pouring 50g of water onto grinds",
    "Wait 45 seconds",
    "Pour 650 grams of water in concentric circles without touching the edges of the " +
      "filter over the course of 3 minutes"
  ]
};

const oatmeal = {
  id: 1,
  imageAttribution:
    "https://pixabay.com/en/berries-bowl-breakfast-food-fruit-1839515/",
  title: "Oatmeal",
  description: "Make the best cup of oatmeal in the world",
  ingredients: [
    {
      displayTitle: "Instant Oatmeal",
      systemTitle: "instant oatmeal",
      description: "May substitute with rolled oats",
      quantity: "1",
      unit: "packet"
    },
    {
      displayTitle: "Water",
      systemTitle: "water",
      description: "Boiling water",
      quantity: "300",
      unit: "mg"
    }
  ],
  steps: [
    "Place oatmeal in bowl",
    "Add hot water to bowl until desired consistency is achieved"
  ]
};

const eggsDeGastone = {
  id: 2,
  imageAttribution:
    "https://pixabay.com/en/egg-chicken-eggs-raw-eggs-eggshell-1510449/",
  title: "Eggs de Gastone",
  description:
    "When I was a lad I ate four dozen eggs. Every morning to help me get large. And now that I'm grown I eat five dozen eggs. So I'm roughly the size of a barge!",
  ingredients: [
    {
      displayTitle: "Eggs",
      systemTitle: "eggs",
      description: "Dat protein",
      quantity: "5 dozen",
      unit: "eggs"
    }
  ],
  steps: ["Prepare one egg to liking", "Prepare 59 more eggs to liking"]
};

const baconEggAndCheese = {
  id: 3,
  imageAttribution:
    "https://pixabay.com/en/beef-food-cheese-cucumber-bacon-1204649/",
  title: "Bacon, Egg, and Cheese",
  description:
    "Life Hack: Make this low carb by not eating the bagel you desperately want to include in this meal!",
  ingredients: [
    {
      displayTitle: "Eggs",
      systemTitle: "eggs",
      description: "Scrambled, not shaken, not stirred; that would be weird",
      quantity: "3",
      unit: "eggs"
    },
    {
      displayTitle: "Bacon",
      systemTitle: "bacon",
      description: "Pan seared in a skillet, because we're fancy.",
      quantity: "3",
      unit: "slices"
    },
    {
      displayTitle: "Heavy Whipping Cream",
      systemTitle: "hwc",
      description: "Can substitute with sour cream",
      quantity: "1",
      unit: "tbsp"
    },
    {
      displayTitle: "Dubliner Cheese",
      systemTitle: "dubliner",
      description: "Slice into bite sized pieces",
      quantity: "3",
      unit: "oz"
    }
  ],
  steps: [
    "Heat skillet to medium-high heat",
    "Pan sear bacon and set aside on paper towels when done to dry",
    "Heat oil in non-stick pan to medium",
    "Crack three eggs into mixing bowl",
    "Add heavy cream to egg mix",
    "Scramble until light and airy",
    "When oil is hot, pour eggs into oil and scramble",
    "When eggs are cooked, remove from heat or you'll burn them and that's just disgusting",
    "Put the cheese on the side of the eggs and bacon",
    "Seriously, there's nothing else. Go home to your families. Cook them something real that's better than this."
  ]
};

const lavaCake = {
  id: -1,
  imageAttribution: "https://pixabay.com/en/advent-plate-cake-1821756/",
  title: "Lava Cake",
  description:
    "This is a secret recipe; only students whom receive an A and request it specially will be given the lava cake recipe.",
  ingredients: [],
  steps: []
};

const recipeList = [
  chemex,
  oatmeal,
  eggsDeGastone,
  baconEggAndCheese,
  lavaCake
].map(Recipe);

module.exports = {
  getOne(id) {
    if (id === undefined) return Promise.reject("No id provided");

    let recipe = recipeList.filter(x => x.id === id)[0];
    if (recipe === undefined) return Promise.reject("No recipe found");

    return Promise.resolve(recipe.getFull());
  },
  getAll() {
    return Promise.resolve(recipeList.map(x => x.getShort()));
  }
};
