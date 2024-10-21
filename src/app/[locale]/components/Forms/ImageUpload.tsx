import { useState } from "react";

export default function ImageUpload() {
  // Store multiple images and previews
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Handle multiple image selection and generate previews
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []); // Get the selected files as an array

    setImageFiles(files); // Set the selected files for later upload

    // Generate preview URLs for all selected files
    const filePreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // Read each image file as a data URL

      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    });

    // Set the preview URLs once all file previews are generated
    Promise.all(filePreviews).then((urls) => setPreviewUrls(urls));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFiles.length > 0) {
      // Here, you would trigger your upload function or handle the files
      console.log("Ready to upload images:", imageFiles);
      // Optionally, call the upload function here, one by one or all at once
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Input allows multiple files */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        {/* Display previews for all selected images */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {previewUrls.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`Selected Image ${index + 1}`}
                style={{ maxWidth: "100px" }}
              />
            </div>
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
