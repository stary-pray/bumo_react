import bowser from "bowser";

export const isUnsupported = bowser.isUnsupportedBrowser({
  msie: "12",
  edge: "13",
  firefox: "40",
  chrome: "43",
  safari: "8",
  opera: "35",
  phantom: "534"
}, window.navigator.userAgent);

if(isUnsupported) {
  alert('>A< 拜托别用古董浏览器！\n\n我们支持最新版的Chrome, Opera, Firefox, Safari, MS Edge，360浏览器，搜狗浏览器，QQ浏览器，百度浏览器等等等，但并不包括你现在正在使用的这个。\n\n=A= 要不我带你去下载一个Opera吧?');
  window.document.location = 'http://www.opera.com/zh-cn';
}


