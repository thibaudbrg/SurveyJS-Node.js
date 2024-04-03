import React, { useEffect, useState } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import { registerMyQuestion } from "./MyQuestion";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import { useLocalCheck } from '../hooks/useLocalCheck'; // Adjust the path as necessary

registerMyQuestion();

export default function SurveyCreatorWidget({ json }) {
  const [creator, setCreator] = useState(null);
  const isLocalhost = useLocalCheck();

  useEffect(() => {
    if (!creator && isLocalhost) {
      let options = { showLogicTab: true, showTranslationTab: true, showThemeTab: true };
      const newCreator = new SurveyCreator(options);
      newCreator.saveSurveyFunc = (no, callback) => {
        console.log(JSON.stringify(newCreator.JSON));
        callback(no, true);
      };
      setCreator(newCreator);
    }

    if (creator && json) {
      creator.JSON = json;
    }
  }, [creator, json, isLocalhost]); // Dependencies to trigger effect

  if (!isLocalhost) {
    return <div>Access Denied: This page is only accessible from localhost.</div>;
  }

  return (
      <div style={{ height: "calc(100% - 70px)" }}>
        {creator && <SurveyCreatorComponent creator={creator} />}
      </div>
  );
}
