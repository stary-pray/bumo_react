import loadImage from "blueimp-load-image";
import lodash from "lodash";

export const splitImage = (url, blockSize)=> {
  loadImage(url, originalCanvas=> {

    const {tempCanvas, sliceIndexes, addedSize} = shuffleImage(originalCanvas, blockSize);
    const reveredImage = revertShuffledImage(tempCanvas, sliceIndexes, addedSize, blockSize);

    //console.log('reveredImage', reveredImage);
    //console.log({tempCanvas, sliceIndexes, addedSize});
    //document.body.appendChild(originalCanvas);
    //document.body.appendChild(tempCanvas);
    //document.body.appendChild(reveredImage);
  })
};

const shuffleImage = (originalCanvas, blockSize)=> {

  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext('2d');

  const addedWidth = originalCanvas.width % blockSize === 0 ? 0 : blockSize - originalCanvas.width % blockSize ;
  const addedHeight = originalCanvas.height % blockSize === 0 ? 0 : blockSize - originalCanvas.height % blockSize;

  tempCanvas.width = originalCanvas.width + addedWidth;
  tempCanvas.height = originalCanvas.height + addedHeight;

  const sliceCount = (tempCanvas.width * tempCanvas.height) / (blockSize * blockSize);
  const sliceIndexes = lodash.shuffle(lodash.range(sliceCount));


  lodash.forEach(sliceIndexes, (targetIndex, rawIndex) => {
    const itemCountOnRow = tempCanvas.width / blockSize;

    const row = Math.floor(targetIndex / itemCountOnRow);
    const col = targetIndex % itemCountOnRow;
    const [x, y] = [col * blockSize, row * blockSize];

    const rawRow = Math.floor(rawIndex / itemCountOnRow);
    const rawCol = rawIndex % itemCountOnRow;
    const [rawX, rawY] = [rawCol * blockSize, rawRow * blockSize];

    tempCtx.drawImage(originalCanvas, x, y, blockSize, blockSize, rawX, rawY, blockSize, blockSize);
  });

  return {tempCanvas, sliceIndexes, addedSize: {height: addedHeight, width: addedWidth}};
};

const revertShuffledImage = (shuffledCanvas, sliceIndexes, addedSize, blockSize)=> {

  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = shuffledCanvas.width - addedSize.width;
  tempCanvas.height = shuffledCanvas.height - addedSize.height;

  lodash.forEach(sliceIndexes, (rawIndex, targetIndex)=> {
    const itemCountOnRow = shuffledCanvas.width / blockSize;

    const row = Math.floor(targetIndex / itemCountOnRow);
    const col = targetIndex % itemCountOnRow;
    const [x, y] = [col * blockSize, row * blockSize];

    const rawRow = Math.floor(rawIndex / itemCountOnRow);
    const rawCol = rawIndex % itemCountOnRow;
    const [rawX, rawY] = [rawCol * blockSize, rawRow * blockSize];

    tempCtx.drawImage(shuffledCanvas, x, y, blockSize, blockSize, rawX, rawY, blockSize, blockSize);
  });

  return tempCanvas
};
