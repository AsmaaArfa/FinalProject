// UploadImage.js
import React, { useState } from "react";
import axios from "axios";

function UploadImage() {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);


  const [sImage, setSImage] = useState(null); 


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setImage(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !email) {
      setMessage("Please enter your email and select a file.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result.split(",")[1];
      const imageData = {
        name: file.name,
        base64: base64Image,
        type: file.type,
      };
      setSImage(imageData);

      try {
        const response = await axios.put(
          "https://p2drjrpw9f.execute-api.us-east-1.amazonaws.com/dev/uploadv2",
          { email, image: imageData },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMessage(response.data.message);
      } catch (error) {
        setMessage("Upload failed. Please try again.");
        console.error("Error uploading image:", error);
      }
    };

    reader.onerror = () => {
      setMessage("Failed to read file.");
    };
  };

  return (
    <div>
      <h2>Upload Image</h2>
      {/* Email Input Field */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email" // Added id
          name="email" // Added name
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email" // Optional: Enhances autofill
          required // Optional: Ensures field is filled
        />
      </div>

      {/* File Input Field */}
      <div>
        <label htmlFor="image">Select Image:</label>
        <input
          id="image" // Added id
          name="image" // Added name
          type="file"
          onChange={handleFileChange}
          accept="image/*" // Restricts to image files
          required // Optional: Ensures a file is selected
        />
      </div>

      <button onClick={handleUpload}>Upload Image</button>
      <p>{message}</p>

      {/* Display Uploaded Image */}
      {sImage && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={sImage && `data:${sImage.type};base64, ${sImage.base64}`}
            alt="Uploaded"
            style={{ width: "300px", height: "auto", marginTop: "20px" }}
          />
        </div>
      )}
    </div>
  );
}

export default UploadImage;
