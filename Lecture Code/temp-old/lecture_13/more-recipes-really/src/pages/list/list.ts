import { Component } from "@angular/core";
import { IShortRecipe } from "../../interfaces/IRecipe";
import { RecipeService } from "../../services/recipe.service";
import { OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

import { ItemDetailsPage } from "../item-details/item-details";

@Component({
  selector: "list-page",
  templateUrl: "list.html"
})
export class ListPage implements OnInit {
  selectedItem: any;
  icons: string[];
  items: Array<IShortRecipe>;

  ngOnInit() {
    let fullList = this.recipeService.getRecipeList().then(fullList => {
      this.items = fullList;
    });
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private recipeService: RecipeService
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get("item");

    this.items = [];
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
