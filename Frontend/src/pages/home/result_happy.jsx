import React from "react";
import { useParams } from "react-router-dom";

const ResultHappy = () => {
  // Extracting calculatedSum (final score) and emo (risk level) from URL params
  const { calculatedSum, emo } = useParams();

  // Define guidelines for each risk level
  const guidelines = {
    "Very High Risk": [
      "Seek immediate medical attention and follow your doctor's advice.",
      "Ensure you rest adequately and avoid physical exertion.",
      "Monitor your symptoms closely and report any changes to your doctor.",
      "Stay hydrated and eat a balanced diet to support your immune system.",
      "Avoid contact with others to prevent the spread of infection."
    ],
    "High Risk": [
      "Consult a healthcare provider if symptoms worsen or persist.",
      "Take time to rest and avoid strenuous activities.",
      "Monitor your symptoms and track any changes.",
      "Stay hydrated, and eat nutritious foods to support your recovery.",
      "Avoid stress and practice relaxation techniques such as deep breathing."
    ],
    "Moderate Risk": [
      "Monitor your symptoms and get adequate rest.",
      "Maintain a balanced diet with plenty of fluids to support recovery.",
      "Engage in light physical activities, but avoid overexertion.",
      "Stay connected with loved ones for emotional support.",
      "Take time for self-care and relaxation to help manage stress."
    ],
    "Low Risk": [
      "Keep up with regular physical activity to maintain overall health.",
      "Ensure you get enough sleep and maintain a healthy diet.",
      "Monitor any changes in symptoms and consult a doctor if needed.",
      "Take breaks throughout the day to reduce stress and improve mental clarity.",
      "Stay hydrated and practice mindfulness to reduce anxiety."
    ],
    "Very Low Risk": [
      "Continue maintaining healthy habits to support your well-being.",
      "Stay active and engage in activities you enjoy to reduce stress.",
      "Ensure you're getting enough sleep to maintain a strong immune system.",
      "Keep up with regular health check-ups to stay on top of any concerns.",
      "Practice gratitude and mindfulness to promote emotional balance."
    ]
  };

  return (
    <div className="bg-cover bg-center flex items-center justify-center h-screen mt-10 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 overflow-y-auto" style={{ backgroundImage: "url('/guidelines_bg.png')" }}>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl p-6 mt-10 mb-20 mx-auto" style={{ marginLeft: '100px' }}>
        <h1 className="text-3xl font-bold mb-4 md:text-center text-cyan-600">
          Result Page
        </h1>
        <p className="text-lg">Total Score: {calculatedSum ? (calculatedSum * 100).toFixed(2) : 0}</p>
        
        {/* Display risk level based on the calculated sum */}
        <p className="text-lg mt-4 font-semibold">Risk Level: {emo ? emo : "Not Available"}</p>
        
        {/* Display the 5 personalized guidelines for the current risk level */}
        <div className="mt-4">
          <p className="font-semibold mb-2">Mental Health Guidelines:</p>
          <ul className="list-disc list-inside">
            {guidelines[emo]?.map((guideline, index) => (
              <li key={index} className="text-black">{guideline}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultHappy;
