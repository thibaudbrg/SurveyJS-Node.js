import React, { useState, useEffect } from "react";
import SurveyCreator from "../components/SurveyCreator";
import { useLocalCheck } from '../hooks/useLocalCheck'; // Adjust the path as necessary

export function CreatorPage() {
    const [surveyJson, setSurveyJson] = useState(null);
    const isLocalhost = useLocalCheck();

    useEffect(() => {
        if (isLocalhost) {
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
        }
    }, [isLocalhost]);

    if (!isLocalhost) {
        return <div>Access Denied: This page is only accessible from localhost.</div>;
    }

    return (
        <>
            {surveyJson && <SurveyCreator json={surveyJson} />}
        </>
    );
}
