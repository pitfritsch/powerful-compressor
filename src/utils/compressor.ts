import Compressor from "compressorjs";

interface ICompressOptions {
  strict?: boolean;
  checkOrientation?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
  width?: number;
  height?: number;
  quality?: number;
  mimeType?: string;
  convertSize?: number;
}

const blobToFile = (theBlob: Blob, fileName:string): File => {
  return new File([theBlob], fileName, {
    type: theBlob.type,
  });
}

export const compressImage = async (
  image: File,
  options?: ICompressOptions
): Promise<File> => {
  return new Promise<File>((resolve, reject) => {
    new Compressor(image, {
      ...options,
      success(compressed: Blob) {
        resolve(
          blobToFile(compressed, image.name)
        )
      },
      error: reject
    })
  }).then((result: File) => {
    return result
  }).catch(err => {
    throw err
  })
}