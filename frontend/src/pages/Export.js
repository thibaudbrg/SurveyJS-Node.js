import React, { useState, useEffect } from "react";
import { Model } from "survey-core";
import { SurveyPDF } from "survey-pdf";

function savePDF(json) {
    return function() {
        const surveyPDF = new SurveyPDF(json);
        // Assuming you might want to pass some data to the PDF, you can modify this
        // For demonstration, we're just using empty data
        surveyPDF.data = {};
        surveyPDF.save("survey.pdf");
    };
}

export function ExportToPDFPage() {
    const [surveyJson, setSurveyJson] = useState(null);

    useEffect(() => {
        const fetchSurveyJson = async () => {
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
        };

        fetchSurveyJson();
    }, []);

    if (!surveyJson) {
        return <div className="container">Loading...</div>;
    }

    const model = new Model(surveyJson);

    return (
        <div className="container">
            <h1>SurveyJS PDF Export</h1>
            <div className="jumbotron">
                <p>SurveyJS PDF Export is a client-side extension over the SurveyJS Library that enables users to save surveys as PDF documents.</p>
                <p>NOTE: Dynamic elements and characteristics (visibility, validation, navigation buttons) are not supported.</p>
                <p>Click the button below to export the survey to a PDF document.</p>
                <button onClick={savePDF(surveyJson)}>Save as PDF</button>
            </div>
        </div>
    );
}
