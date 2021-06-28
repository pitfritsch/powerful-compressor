import { useCallback, useState } from 'preact/hooks';
import Input from '../../components/Input';
import { compressImage } from '../../utils/compressor';

const Home = () => {

  const [ selectedImage, setSelectedImage ] = useState<File>(undefined)
  const [ compressedImage, setCompressedImage ] = useState<File>(undefined)

  const [ isOptionsOpened, setIsOptionsOpened ] = useState<boolean>(false)

  const [ strict, setStrict ] = useState<boolean>(false)
  const [ checkOrientation, setCheckOrientation ] = useState<boolean>(false)
  const [ maxWidth, setMaxWidth ] = useState<number>(10000)
  const [ maxHeight, setMaxHeight ] = useState<number>(10000)
  const [ minWidth, setMinWidth ] = useState<number>(0)
  const [ minHeight, setMinHeight ] = useState<number>(0)
  const [ width, setWidth ] = useState<number>(undefined)
  const [ height, setHeight ] = useState<number>(undefined)
  const [ quality, setQuality ] = useState<number>(0.6)
  const [ mimeType, setMimeType ] = useState<string>('auto')
  const [ convertSize, setConvertSize ] = useState<number>(0)

  const handleSelectImage = (event) => {
    if (!event.target.files.length) return

    const files: FileList = event.target.files
    setSelectedImage( files[0] )
    setCompressedImage(undefined)
  }

  const handleImageCompression = useCallback(() => {
    const options = {
      strict,
      checkOrientation,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      width,
      height,
      quality,
      mimeType,
      convertSize
    }
    console.log(options)
    compressImage(selectedImage, options).then(setCompressedImage)
  }, [selectedImage, 
      strict, 
      checkOrientation, 
      maxWidth, 
      maxHeight, 
      minWidth, 
      minHeight, 
      width, 
      height, 
      quality, 
      mimeType, 
      convertSize
    ])

  const getReadableSize = (size: number) => {
    let readableSize: string = `${size} bytes`
    if (size > 1000000) {
      readableSize = `${(size / 1000000).toFixed(2)} mb`
    } else if (size > 1000) {
      readableSize = `${(size / 1000).toFixed(2)} kb`
    }

    return readableSize
  }

  return (
    <div className='grid grid-cols-2 gap-4 p-4 text-white max-w-screen-lg m-auto'>
      <div className='flex col-span-2 justify-center items-center flex-col'>
        <h1 className='text-5xl'>Image compressor</h1>

        <div className='flex gap-4 mt-5'>
          <label
            htmlFor="photo"
            className='
              px-4
              py-2
              cursor-pointer
              rounded-full
              border-2
              shadow-md
              duration-200
              hover:bg-white
              hover:text-gray-500
            '
          >
            Select image
            <input
              type="file"
              id="photo"
              accept="image/*"
              className='hidden'
              onChange={handleSelectImage}
            />
          </label>
          <button
            onClick={handleImageCompression}
          >
            Compress
          </button>
          <button
            onClick={() => setIsOptionsOpened(isOpened => !isOpened)}
          >
            Options
          </button>
        </div>
        
        {isOptionsOpened && 
          <div className='grid grid-cols-2 items-center gap-2'>
            <Input 
              className='justify-self-end'
              type="checkbox"
              id="strict"
              value={strict}
              onChange={(target) => setStrict(target.checked)}
              label='Strict'
            />

            <Input
              className='justify-self-end'
              type="checkbox"
              id="checkOrientation"
              value={checkOrientation}
              onChange={(target) => setCheckOrientation(target.checked)}
              label='Check orientation'
            />

            <Input
              labelClassName='justify-self-end'
              className='text-gray-500 pl-2'
              type="number"
              id="maxWidth"
              value={maxWidth}
              onChange={(target) => setMaxWidth(+target.value)}
              label='Max Width'
            />

            <Input
              labelClassName='justify-self-end'
              className='text-gray-500 pl-2'
              type="number"
              id="maxHeight"
              value={maxHeight}
              onChange={(target) => setMaxHeight(+target.value)}
              label='Max Height'
            />

            <Input
              labelClassName='justify-self-end'
              className='text-gray-500 pl-2'
              type="number"
              id="minWidth"
              value={minWidth}
              onChange={(target) => setMinWidth(+target.value)}
              label='Min Width'
            />

            <Input
              labelClassName='justify-self-end'
              className='text-gray-500 pl-2'
              type="number"
              id="minHeight"
              value={minHeight}
              onChange={(target) => setMinHeight(+target.value)}
              label='Min Height'
            />

            <Input
              labelClassName='justify-self-end'
              className='text-gray-500 pl-2'
              type="number"
              id="width"
              value={width}
              onChange={(target) => setWidth(+target.value)}
              label='Width'
            />

            <Input
              labelClassName='justify-self-end'
              className='text-gray-500 pl-2'
              type="number"
              id="height"
              value={height}
              onChange={(target) => setHeight(+target.value)}
              label='Height'
            />

            <Input
              labelClassName='justify-self-end'
              className='text-gray-500 pl-2'
              type="number"
              id="quality"
              value={quality}
              min={0}
              max={1}
              step={0.1}
              onChange={(target) => setQuality(+target.value)}
              label='Compress quality'
            />

            <Input
              labelClassName='justify-self-end'
              className='text-gray-500 pl-2'
              type="text"
              id="mimeType"
              value={mimeType}
              onChange={(target) => setMimeType(target.value)}
              label='Mime type'
            />

            <Input
              labelClassName='justify-self-end'
              className='text-gray-500 pl-2'
              type="number"
              id="convertSize"
              value={convertSize}
              onChange={(target) => setConvertSize(+target.value)}
              label='Convert size'
            />
          </div>
        }

      </div>
      {selectedImage &&
        <div className='flex flex-col items-center p-4 border-2 rounded-2xl gap-1'>
          <h3>Original</h3>
          <img className='rounded-2xl shadow-md' src={URL.createObjectURL(selectedImage)} alt="originalImage" />
          <h3>{getReadableSize(selectedImage.size)}</h3>
        </div>
      }
      {compressedImage &&
        <div className='flex flex-col items-center p-4 border-2 rounded-2xl gap-1'>
          <h3>Compressed</h3>
          <img className='rounded-2xl shadow-md' src={URL.createObjectURL(compressedImage)} alt="compressedImage" />
          <h3>{getReadableSize(compressedImage.size)}</h3>
        </div>
      }
      {(selectedImage && compressedImage) && 
        <h3 className='col-span-2 text-center'>{`Reduction of ${(100 - ((compressedImage.size / selectedImage.size) * 100)).toFixed(2)}%`}</h3>
      }
    </div>
  )
}

export default Home;
