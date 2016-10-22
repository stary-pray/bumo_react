import App from "./web/src/components_mobile/App.mobile";
import {iconsLoaded} from "./web/src/components_mobile/NavigatorIcons";

iconsLoaded.then(() => {
  const app = new App();
});
