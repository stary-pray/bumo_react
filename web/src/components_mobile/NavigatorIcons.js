import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  "explore": [30, "#bbb"],
  "explore--big": [50, "#bbb"],

  "palette--active": [30, "#fff"],
  "palette--active--big": [50, "#fff"],
  "palette--active--very-big": [100, "#fff"],

  "local-offer": [30, "#bbb"],
  "local-offer--active": [30, "#fff"],

  "person": [30, "#bbb"],
  "person--active": [30, "#fff"],
};

let iconsMap = {};
let iconsLoaded = new Promise((resolve, reject) => {
  new Promise.all(
    Object.keys(icons).map(iconName =>
      // IconName--suffix--other-suffix is just the mapping name in iconsMap
      MaterialIcons.getImageSource(
        iconName.replace(replaceSuffixPattern, ''),
        icons[iconName][0],
        icons[iconName][1]
      ))
  ).then(sources => {
    Object.keys(icons)
      .forEach((iconName, idx) => iconsMap[iconName] = sources[idx])

    // Call resolve (and we are done)
    resolve(true);
  })
});

export {
  iconsMap,
  iconsLoaded
};
