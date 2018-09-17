import { Injectable } from "@angular/core";
import { Http, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { File, Transfer } from "ionic-native";
import * as RecipeInterfaces from "../interfaces/IRecipe";

declare var cordova: any;

const serverRoot = "http://cs554.philbarresi.com";
const recipeRootUrl = `${serverRoot}/api/recipes`;
const getRecipeUrl = id => {
  return `${recipeRootUrl}/${id}`;
};
const getImageUrl = id => {
  return `${serverRoot}/photos/${id}.jpg`;
};

@Injectable()
export class RecipeService {
  constructor(private http: Http) {}

  getRecipeList(): Promise<RecipeInterfaces.IShortRecipe[]> {
    return this.http
      .get(recipeRootUrl)
      .map(res => {
        return res.json() || [];
      })
      .toPromise();
  }

  downloadImage(recipeId: number) {
    const fileTransfer = new Transfer();
    let url = getImageUrl(recipeId);
    let storageLocation = `${cordova.file.dataDirectory}${recipeId}.jpg`;

    return fileTransfer.download(url, storageLocation).then(
      entry => {
        return storageLocation;
      },
      error => {
        alert("got an error");
        console.log(error);
        // handle error
      }
    );
  }

  getRecipe(id: number): Promise<RecipeInterfaces.IRecipe> {
    let filePath = cordova.file.dataDirectory;
    let fileName = `recipe.${id}.json`;

    let recipeIsCached = File.checkFile(filePath, `recipe.${id}.json`);

    return recipeIsCached
      .then(cached => {
        return File.readAsText(filePath, fileName).then(text => {
          return <RecipeInterfaces.IRecipe>JSON.parse(<string>text);
        });
      })
      .catch(() => {
        let recipe = this.http
          .get(getRecipeUrl(id))
          .map(res => {
            return res.json() || null;
          })
          .toPromise();

        return recipe.then(recipe => {
          return this.downloadImage(recipe.id).then(imageStorageUrl => {
            // This is bad, kids, don't do this.
            // Try not to mutate data like that. It's dumb and bad.
            recipe.imageStorageUrl = imageStorageUrl;

            return File.writeFile(
              filePath,
              fileName,
              JSON.stringify(recipe),
              true
            ).then(() => {
              return recipe;
            });
          });
        });
      });
  }
}
