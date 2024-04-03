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

  function transformResults(surveyModel, data) {
    let results = {};
    for (let [key, value] of Object.entries(data)) {
      const question = surveyModel.getQuestionByName(key);
      if (question) {
        let questionTitle = question.title || key;
        let answerText = question.choices
            ? question.choices.find(choice => choice.value === value)?.text || value
            : value;
        results[key] = answerText;
      } else {
        results[key] = value;
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
        <h1>SurveyJS Library / Runner</h1>
        <SurveyComponent
            model={model}
            onComplete={onComplete}
            onValueChanged={onValueChanged}
        />
      </div>
  );
}
