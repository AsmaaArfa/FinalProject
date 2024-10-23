import React, { useState } from "react";
import axios from "axios";

function UploadImage() {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
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
      const image = {
        name: file.name,
        base64: base64Image,
        type: file.type,
      };

      try {
        const response = await axios.put(
          "https://p2drjrpw9f.execute-api.us-east-1.amazonaws.com/dev/uploadv2",
          { email, image },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMessage(response.data.message);
        setImageUrl(response.data.imageUrl); // Pre-signed GET URL
      } catch (error) {
        setMessage("Upload failed. Please try again.");
        console.error("Error uploading image:", error);
      }
    };
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
      <p>{message}</p>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          style={{ width: "300px", height: "auto" }}
        />
      )}
    </div>
  );
}

export default UploadImage;
