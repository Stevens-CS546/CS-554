import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { HelloIonicPage } from "../pages/hello-ionic/hello-ionic";
import { ItemDetailsPage } from "../pages/item-details/item-details";
import { ListPage } from "../pages/list/list";
import { RecipeService } from "../services/recipe.service";

@NgModule({
  declarations: [MyApp, HelloIonicPage, ItemDetailsPage, ListPage],
  imports: [IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HelloIonicPage, ItemDetailsPage, ListPage],
  providers: [
    RecipeService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
