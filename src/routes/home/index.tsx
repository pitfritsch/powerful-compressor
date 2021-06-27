import { useEffect, useState } from 'preact/hooks';
import { compressImage } from '../../utils/compressor';

const Home = () => {

  const [ selectedImage, setSelectedImage ] = useState<File>(undefined)
  const [ compressedImage, setCompressedImage ] = useState<File>(undefined)

  useEffect(() => {
    if (!selectedImage) return
    console.log(URL.createObjectURL(selectedImage))
    compressImage(selectedImage).then(setCompressedImage)
  }, [ selectedImage ])

  const handleSelectImage = (event) => {
    if (!event.target.files.length) return

    const files: FileList = event.target.files
    setSelectedImage( files[0] )
  }

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
      <div className='flex col-span-2 justify-center items-center flex-col gap-5'>
        <h1 className='text-5xl'>Image compressor</h1>
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

        {(selectedImage && compressedImage) && 
          <h3>{`Reduction of ${(100 - ((compressedImage.size / selectedImage.size) * 100)).toFixed(2)}%`}</h3>
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
    </div>
  )
}

export default Home;
