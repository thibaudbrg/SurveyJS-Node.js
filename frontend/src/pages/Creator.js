import React, { useState, useEffect } from "react";
import SurveyCreator from "../components/SurveyCreator";

export function CreatorPage() {
    const [surveyJson, setSurveyJson] = useState(null);

    useEffect(() => {
        async function fetchSurveyJson() {
            try {
                const response = await fetch('/survey-json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSurveyJson(data);
            } catch (error) {
                console.error("Failed to fetch survey json:", error);
            }
        }

        fetchSurveyJson();
    }, []);

    return (
        <>
            <h1>Survey Creator / Form Builder</h1>
            {surveyJson && <SurveyCreator json={surveyJson} />}
        </>
    );
}
