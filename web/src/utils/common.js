import jwt_decode from "jwt-decode";
import some from "lodash/some";
import {getItem, removeItem} from "../helpers/storage";

export const AUTH0_DOMAIN = 'akinoniku.auth0.com';
export const AUTH0_CLIENT = 'auspnqFnkHXFpXEEt3ekP4Ht87fW6HLD';
const HEAT_HALF_LIFE = 30; // days
const isDev = process.env.NODE_ENV === 'development';

let webpSupported = false;

export const resize = (url, minWidth)=> {
  let width;
  if (url && !url.match(/\.svg$/)) {
    width = minWidth * (window.devicePixelRatio || 1);
    return isDev ? url : url + `!/format/${webpSupported ? 'webp' : 'jpg'}/fw/${width}/quality/75`;
  } else {
    return url;
  }
};

export const resizeWidthSquare = (url, minWidth)=> {
  let width;
  if (url && !url.match(/\.svg$/)) {
    width = minWidth * (window.devicePixelRatio || 1);
    return isDev ? url : url + `!/format/${webpSupported ? 'webp' : 'jpg'}/fw/${width}/clip/${width}x${width}a0s0/gravity/center/quality/75`;
  } else {
    return url;
  }
};

export const resizeHeight = (url, minHeight)=> {
  let height;
  if (url && !url.match(/\.svg$/)) {
    height = minHeight * (window.devicePixelRatio || 1);
    return isDev ? url : url + `!/format/${webpSupported ? 'webp' : 'jpg'}/fh/${height}/quality/75`;
  } else {
    return url;
  }
};

export const calculateHeat = (heatObj, like_amount = 0) => {
  const last_heat = heatObj.point;
  const late_modified = heatObj.modified;
  const max_heat = heatObj.max_point;
  const q = Math.pow(0.5, ((+Date.now() - +new Date(late_modified)) / (HEAT_HALF_LIFE * 24 * 60 * 60 * 1000)));
  const new_heat = (last_heat + like_amount) * q;
  return Math.round(new_heat > max_heat / 2 ? new_heat : max_heat / 2);
};

export const imageHeight = (rawWidth, rawHeight, newWidth)=> newWidth / rawWidth * rawHeight;

export const checkTokenValid = async ()=> {
  const token = await getItem('token');
  if (token) {
    try {
      const tokenPayload = jwt_decode(token);
      if (tokenPayload && ((tokenPayload.exp * 1000) - 3600) > +new Date()) {
        return {valid: true, needRefresh: false};
      }
    } catch (e) {
      console.info('decode jwt error');
    }
    console.info('jwt expired');
    await removeItem('token');
    return {valid: false, needRefresh: true};
  }
  return {valid: false, needRefresh: false};
};

export const getScrollBarWidth = ()=> {
  const inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  const outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild(inner);

  document.body.appendChild(outer);
  let w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  let w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild(outer);

  return (w1 - w2);
};

export const compareAttrs = (obj1, obj2, attrs, isArray = false)=> {
  return some(attrs, (attr)=> obj1[attr] !== obj2[attr]);
};


const _setBrowserWebp = () => {
  if(!window['localStorage']) { // native
    webpSupported = false;
    return;
  }
  const supported = localStorage.getItem('webpSupported');
  if (supported == null) {
    _testWebp((supported)=> {
      webpSupported = supported;
      localStorage.setItem('webpSupported', +supported + '');
    });
  } else {
    webpSupported = !!+supported;
  }
};

const _testWebp = (callback) => {
  const webP = new Image();
  webP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMw' +
    'AgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
  webP.onload = webP.onerror = function () {
    callback(webP.height === 2);
  };
};

_setBrowserWebp();

