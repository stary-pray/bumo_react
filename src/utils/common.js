export const resize = (url, minWidth)=> {
  let width;
  if (url && !url.match(/\.svg$/)) {
    width = minWidth * (window.devicePixelRatio || 1);
    return url + "?imageMogr2/format/jpg/interlace/1/thumbnail/" + width + "x";
  } else {
    return url;
  }
};

export const calculateHeat = (heatObj, like_amount = 0) => {
  const last_heat = heatObj.point;
  const late_modified = heatObj.modified;
  const max_heat = heatObj.max_point;
  const q = 0.5 ** ((+Date.now() - +new Date(late_modified)) / (14 * 24 * 60 * 60 * 1000));
  const new_heat = (last_heat + like_amount) * q;
  return Math.round(new_heat > max_heat / 2 ? new_heat : max_heat / 2);
};

export const imageHeight = (rawWidth, rawHeight, newWidth)=> newWidth / rawWidth * rawHeight;

