export const resize = (url, minWidth)=>{
  let width;
  if (url && !url.match(/\.svg$/)) {
    width = minWidth * (window.devicePixelRatio || 1);
    console.log(width);
    return url + "?imageMogr2/format/jpg/interlace/1/thumbnail/" + width + "x";
  } else {
    return url;
  }
};


export const imageHeight = (rawWidth, rawHeight, newWidth)=>  newWidth / rawWidth * rawHeight;

export const defaultAvatar = (avatarUrl) => avatarUrl || 'http://7sbq0u.com1.z0.glb.clouddn.com/uploads/user_6/paintings/None_bd9274b3.png';
