import "core-js/es6/reflect";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/modules/app.module";
platformBrowserDynamic().bootstrapModule(AppModule);