export interface IIngredient {
  displayTitle: string;
  systemTitle: string;
  description: string;
  quantity: string;
  unit: string;
  imageStorageUrl?: string;
}

export interface IRecipe {
  id: number;
  title: string;
  description: string;
  imageAttribution: string;
  ingredients: IIngredient[];
  steps: string[];
}

export interface IShortRecipe {
  id: number;
  title: string;
  description: string;
}
