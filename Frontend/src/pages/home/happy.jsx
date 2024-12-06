import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Happy = () => {
  const [questions, setQuestions] = useState([
    {
      question: "Do you have cold or runny nose?",
      options: { yes: ["mild", "moderate", "high"], no: [] }
    },
    {
      question: "Do you have cough?",
      options: { yes: ["dry", "mucus"], no: [] }
    },
    {
      question: "Irritation to eyes?",
      options: { yes: [], no: [] }
    },
    {
      question: "Watering of eyes or redness?",
      options: { yes: [], no: [] }
    },
    {
      question: "Whistling sound while breathing?",
      options: { yes: [], no: [] }
    },
    {
      question: "Chest tightness or suffocation?",
      options: { yes: [], no: [] }
    },
    {
      question: "Overall breathing disturbances?",
      options: { yes: ["deep/mouth", "shallow-fast"], no: [] }
    },
    {
      question: "Have you had any exposure to chemicals?",
      options: {
        yes: ["inhaled", "ingestion-drunk", "eaten", "touched-mild", "touched-normal", "touched-high"],
        no: []
      }
    }
  ]);

  const [userSelections, setUserSelections] = useState(new Array(8).fill(null)); // Store user answers
  const [subSelections, setSubSelections] = useState(new Array(8).fill(null)); // Store sub-option answers
  const [predictedScore, setPredictedScore] = useState(0); // Store the predicted score from Guidelines
  const [finalScore, setFinalScore] = useState(0); // Final combined score
  const [riskLevel, setRiskLevel] = useState(""); // Risk level based on final score

  const navigate = useNavigate();

  // Retrieve the predicted score from the URL path using useParams
  const { score } = useParams(); // The predicted score is passed via the URL
  useEffect(() => {
    if (score) {
      setPredictedScore(parseFloat(score)); // Set the predicted score
    }
  }, [score]);

  const handleOptionSelect = (questionIndex, option) => {
    const updatedSelections = [...userSelections];
    updatedSelections[questionIndex] = option; // Save user selection for Yes/No
    setUserSelections(updatedSelections);
  };

  const handleSubOptionSelect = (questionIndex, subOption) => {
    const updatedSubSelections = [...subSelections];
    updatedSubSelections[questionIndex] = subOption; // Save sub-option selection
    setSubSelections(updatedSubSelections);
  };

  const calculateRiskLevel = (score) => {
    // Calculate the risk level based on the combined score
    if (score >= 0.75) {
      return "Very High Risk";
    } else if (score >= 0.5) {
      return "High Risk";
    } else if (score >= 0.25) {
      return "Moderate Risk";
    } else {
      return "Low Risk";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate questionnaire score: 1 for Yes answers, 0 for No
    const questionnaireScore = userSelections.reduce(
      (acc, currentValue) => acc + (currentValue !== null ? 1 : 0),
      0
    );

    // Normalize the questionnaire score (divide by number of questions to get a value between 0 and 1)
    const normalizedQuestionnaireScore = questionnaireScore / questions.length;

    // Calculate final score by balancing both predicted and questionnaire scores
    const finalScore = (predictedScore + normalizedQuestionnaireScore) / 2; // Equal weightage

    setFinalScore(finalScore); // Set final score

    // Determine the risk level based on the final score
    const calculatedRiskLevel = calculateRiskLevel(finalScore);
    setRiskLevel(calculatedRiskLevel);

    console.log("Final Score:", finalScore);
    console.log("Risk Level:", calculatedRiskLevel);

    // Navigate to the result_happy page with the final score and risk level
    navigate(`/result_happy/${finalScore}/${calculatedRiskLevel}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('emotion_bg.png')" }}>
      <div className="w-full max-w-4xl p-6 bg-white bg-opacity-80 rounded-lg shadow-xl overflow-y-auto" style={{ maxHeight: "90vh", paddingTop: "30px" }}>
        <h1 className="text-3xl font-bold text-center text-black mb-8">Pneumonia Questionnaire</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-6">
              <p className="text-xl text-black mb-2">{question.question}</p>
              <div className="flex flex-col space-y-4">
                {/* Yes/No selection */}
                <div className="flex items-center ml-8">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value="yes"
                      checked={userSelections[questionIndex] === "yes"}
                      onChange={() => handleOptionSelect(questionIndex, "yes")}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value="no"
                      checked={userSelections[questionIndex] === "no"}
                      onChange={() => handleOptionSelect(questionIndex, "no")}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>

                {/* Show dropdown for sub-options if "Yes" is selected and if there are values in the "yes" array */}
                {userSelections[questionIndex] === "yes" && question.options.yes.length > 0 && (
                  <div className="ml-8">
                    <label className="block text-lg text-black mb-2">Select option:</label>
                    <select
                      className="p-2 border border-gray-300 rounded-md w-full"
                      value={subSelections[questionIndex] || ""}
                      onChange={(e) => handleSubOptionSelect(questionIndex, e.target.value)}
                    >
                      <option value="">Select...</option>
                      {question.options.yes.map((subOption, subIndex) => (
                        <option key={subIndex} value={subOption}>
                          {subOption}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          ))}

          <button type="submit" className="w-full py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 transition duration-300">
            Submit
          </button>
        </form>

        <div className="text-center mt-6">
          {finalScore > 0 && (
            <div>
              <p className="text-xl text-black mb-2">Your final score: {finalScore.toFixed(2)}</p>
              <p className="text-xl text-black mb-2">Risk Level: {riskLevel}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Happy;
