import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!file) {
      console.error("Please select a profile image.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result.split(",")[1];
      const profileImage = {
        name: file.name,
        base64: base64Image,
        type: file.type,
      };

      try {
        // Replace with your AWS Lambda endpoint
        const response = await axios.post("https://ia7vd5dcti.execute-api.us-east-1.amazonaws.com/dev/signup", {
          email,
          password,
          name,
          profileImage,
        });
        console.log("User signed up:", response.data);
        navigate("/login");
      } catch (error) {
        console.error("Error signing up:", error);
      }
    };
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h2>Signup: update the pipeline</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
