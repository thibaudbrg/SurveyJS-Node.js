import { useEffect, useState } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import { registerMyQuestion } from "./MyQuestion";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";

registerMyQuestion();

export default function SurveyCreatorWidget({ json }) {
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    if (!creator) {
      let options = { showLogicTab: true, showTranslationTab: true, showThemeTab: true };
      const newCreator = new SurveyCreator(options);
      newCreator.saveSurveyFunc = (no, callback) => {
        console.log(JSON.stringify(newCreator.JSON));
        callback(no, true);
      };
      setCreator(newCreator);
    }

    // Update creator JSON whenever props.json changes
    if (creator && json) {
      creator.JSON = json;
    }
  }, [creator, json]); // Dependencies to trigger effect

  return (
      <div style={{ height: "calc(100% - 70px)" }}>
        {creator && <SurveyCreatorComponent creator={creator} />}
      </div>
  );
}
