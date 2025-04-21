// src/components/ProfileForm.jsx
import { useEffect, useState } from "react";
import "./ProfileForm.css"; // หรือจะใช้ Tailwind ก็ได้

export default function ProfileForm() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    bodyfat: "",
    target: "",
    gender: ""
  });

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      setUser(tgUser);
    } else {
      alert("⚠️ Please open via Telegram Web App");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderSelect = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key of Object.keys(formData)) {
      if (!formData[key]) {
        alert(`❌ Please fill in ${key}`);
        return;
      }
    }

    const payload = {
      telegramId: user?.id,
      name: user?.first_name,
      gender: formData.gender,
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
      fatPercent: Number(formData.bodyfat),
      targetWeight: Number(formData.target),
    };

    try {
      const res = await fetch("https://saveprofile-dxaqcusziq-uc.a.run.app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        alert("✅ Profile saved!");
      } else {
        alert("❌ Failed to save: " + (result.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Network error");
    }
  };

  return (
    <div className="container">
      <h1 className="title">FIT LEVELING</h1>
      <h2>Hunter Profile</h2>
      <form onSubmit={handleSubmit}>
        {["age", "weight", "height", "bodyfat", "target"].map((key) => (
          <div className="form-row" key={key}>
            <label htmlFor={key}>
              {key === "bodyfat"
                ? "Body Fat (%)"
                : key === "target"
                ? "Target Weight (kg)"
                : key === "weight"
                ? "Current Weight (kg)"
                : key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {/* 👤 Gender Field with Icon Buttons */}
        <div className="form-row">
          <label>Gender</label>
          <div className="gender-selector">
            <button
              type="button"
              className={`gender-btn ${formData.gender === "Male" ? "selected" : ""}`}
              onClick={() => handleGenderSelect("Male")}
            ><i class="fa-solid fa-mars"></i></button>
            <button
              type="button"
              className={`gender-btn ${formData.gender === "Female" ? "selected" : ""}`}
              onClick={() => handleGenderSelect("Female")}
            ><i class="fa-solid fa-venus"></i></button>
          </div>
        </div>

        <button type="submit" className="submit-btn">SUBMIT</button>
      </form>
    </div>
  );
}
