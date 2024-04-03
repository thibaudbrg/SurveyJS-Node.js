import React, { useState, useEffect } from "react";
import { Model, StylesManager } from "survey-core";
import { Survey as SurveyComponent } from "survey-react-ui";
import "survey-core/defaultV2.css";

export function SurveyPage() {
  const [surveyJson, setSurveyJson] = useState(null);
  const [surveyTheme, setSurveyTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSurveyData() {
      try {
        const surveyJsonResponse = await fetch('/survey-json');
        const surveyJsonData = await surveyJsonResponse.json();
        setSurveyJson(surveyJsonData);

        const surveyThemeResponse = await fetch('/survey-theme');
        const surveyThemeData = await surveyThemeResponse.json();
        setSurveyTheme(surveyThemeData);
      } catch (error) {
        console.error('Error fetching survey data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSurveyData();
  }, []);

  function onValueChanged(_, options) {
    console.log("Value changed: ", options.value);
  }

  function transformResults(model, data) {
    let results = {};
    for (let [key, value] of Object.entries(data)) {
      const question = model.getQuestionByName(key);
      if (question) {
        // Handle questions with predefined choices
        if (question.choices && Array.isArray(value)) {
          // For multiple choice questions
          let answerTexts = value.map(val => {
            const choice = question.choices.filter(choice => choice.value === val)[0];
            return choice ? choice.text : val;
          });

          // Check for and append "-Comment" field if "other" is selected
          if (value.includes('other') && data[`${key}-Comment`]) {
            answerTexts.push(`Other: ${data[`${key}-Comment`]}`);
          }

          results[key] = answerTexts;
        } else if (question.choices) {
          // For single choice questions
          const choice = question.choices.filter(choice => choice.value === value)[0];
          results[key] = choice ? choice.text : value;
        } else {
          // For text input and other non-choice questions
          results[key] = value;
        }
      } else {
        results[key] = value; // Include as is if question not found
      }
    }
    return results;
  }


  function onComplete(survey) {
    const surveyData = survey.data;
    const surveyModel = survey;
    const transformedData = transformResults(surveyModel, surveyData);
    console.log("Survey complete! Results: ", transformedData);

    fetch('/submit-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData),
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch((error) => {
          console.error('Error:', error);
        });
  }

  if (isLoading || !surveyJson || !surveyTheme) {
    return <div>Loading survey...</div>;
  }

  const model = new Model(surveyJson)
  model.applyTheme(surveyTheme);

  return (
      <div className="container">
        <SurveyComponent
            model={model}
            onComplete={onComplete}
            onValueChanged={onValueChanged}
        />
      </div>
  );
}
