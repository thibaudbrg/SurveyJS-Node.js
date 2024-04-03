import React, { Component } from "react";
import { VisualizationPanel } from "survey-analytics";
import { Model } from "survey-core";
import "survey-analytics/survey.analytics.css";

export default class SurveyAnalytics extends Component {
  visPanel = null; // Initialized but not assigned until conditions are met
  state = {
    surveyJson: null,
    loading: true,
    error: null,
    results: null, // Include results in the state
  };

  async componentDidMount() {
    try {
      const surveyJsonResponse = await fetch('/survey-json');
      const surveyJsonData = await surveyJsonResponse.json();

      const response = await fetch('/get-all-survey-results');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const results = await response.json();

      this.setState({ surveyJson: surveyJsonData, results, loading: false });
    } catch (error) {
      console.error('Error:', error);
      this.setState({ error, loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if surveyJson or results just became available
    if (!prevState.surveyJson && this.state.surveyJson && this.state.results && !this.visPanel) {
      const surveyModel = new Model(this.state.surveyJson);
      this.visPanel = new VisualizationPanel(surveyModel.getAllQuestions(), this.state.results);
      this.visPanel.render(document.getElementById("summaryContainer"));
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    }
    // Ensure the container is always rendered for the visPanel to attach to
    return <div id="summaryContainer"></div>;
  }
}
