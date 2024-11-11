import imageCompression from 'browser-image-compression';

export async function compressImage(file: File) {
  // Skip compression for small images (less than 1MB)
  if (file.size < 1024 * 1024) {
    return file;
  }

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: file.type as string,
    initialQuality: 0.8,
    alwaysKeepResolution: true,
    preserveExif: true,
    // Aggressive compression for large files
    ...(file.size > 5 * 1024 * 1024 && {
      maxSizeMB: 0.8,
      initialQuality: 0.7
    })
  };

  try {
    const compressedFile = await imageCompression(file, options);
    
    // If compression didn't help much, return original
    if (compressedFile.size > file.size * 0.9) {
      return file;
    }
    
    return compressedFile;
  } catch (error) {

    return file;
  }
}