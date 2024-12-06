import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const Guidelines = () => {
  useAuth();
  const [image, setImage] = useState(null);
  const [apiResult, setApiResult] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleGetStarted = async () => {
    if (!image) {
      console.error("No image available for submission");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setApiResult(result);
      } else {
        console.error("API request failed");
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const handleSurvey = () => {
    // Save the prediction score (you can choose the right format based on the API response)
    const predictionScore = apiResult?.predictions[0];

    // Navigate to the "result_happy" page with the prediction score
    if (predictionScore !== undefined) {
      navigate(`/happy/${predictionScore}`);
    } else {
      console.error("Prediction score is unavailable");
    }
  };

  return (
    <div className="bg-cover bg-center flex items-center justify-center h-screen mt-20 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 overflow-y-auto" style={{ backgroundImage: "url('/guidelines_bg.png')" }}>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 mt-20 mb-20 mx-auto" style={{ marginLeft: '210px' }}>
        <h1 className="text-3xl font-bold mt-10 mb-4 text-center text-cyan-600">
          Pneumonia Predictor
        </h1>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-2 text-left">Upload Image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
          </div>
          <div className="w-full max-w-lg flex flex-col items-center justify-center">
            {image && (
              <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full h-auto max-h-48 object-cover mb-4" />
            )}
            <button
              onClick={handleGetStarted}
              className="bg-cyan-500 text-black font-semibold px-4 py-2 rounded block w-full mb-4"
            >
              Submit
            </button>
            {apiResult && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Prediction Score</h2>
                <p className="text-xl">{apiResult.predictions[0]}</p>
                <div className="mt-4">
                  <button
                    onClick={handleSurvey}
                    className="bg-cyan-500 text-black font-semibold px-4 py-2 rounded block w-full mb-4"
                  >
                    Start Survey
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
