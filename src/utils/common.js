export const resize = (url, minWidth)=>{
  let width;
  if (url && !url.match(/\.svg$/)) {
    width = Math.pow(2, Math.round(Math.log2(minWidth / 10))) * 10 * (window.devicePixelRatio || 1);
    return url + "?imageMogr2/format/jpg/interlace/1/thumbnail/" + width + "x";
  } else {
    return url;
  }
};
