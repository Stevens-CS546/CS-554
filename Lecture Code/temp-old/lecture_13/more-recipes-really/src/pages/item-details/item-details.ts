import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { IShortRecipe, IRecipe } from "../../interfaces/IRecipe";
import { RecipeService } from "../../services/recipe.service";
import { OnInit } from "@angular/core";

@Component({
  selector: "item-details-page",
  templateUrl: "item-details.html"
})
export class ItemDetailsPage implements OnInit {
  shortRecipe: IShortRecipe;
  fullRecipe: IRecipe;

  ngOnInit() {
    this.recipeService.getRecipe(this.shortRecipe.id).then(fullRecipe => {
      this.fullRecipe = fullRecipe;
    });
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private recipeService: RecipeService
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.shortRecipe = navParams.get("item");
  }
}
