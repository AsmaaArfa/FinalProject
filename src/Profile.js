// src/Profile.js
import React, { useState } from "react";

function Profile() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <h2>Upload and Preview Image</h2>
      <input type="file" onChange={handleImageChange} />
      {imageUrl && <img src={imageUrl} alt="Profile Preview" style={{ width: "300px", height: "auto" }} />}
    </div>
  );
}

export default Profile;
