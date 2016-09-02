const CAMERA_IMAGE = 'bumo/CAMERA_IMAGE';

const initialState = {
};

export default function cameraImage(state = initialState, action) {
  switch (action.type) {
    case CAMERA_IMAGE:
      return {...state, images: action.images};
    default:
      return state;

  }

}
export function logCameraImage(images) {
  return {
    type:CAMERA_IMAGE,
    images
  };
}
