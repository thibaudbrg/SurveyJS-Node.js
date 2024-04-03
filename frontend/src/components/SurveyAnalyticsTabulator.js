import React, { Component } from "react";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import "jspdf-autotable";
import { Tabulator } from "survey-analytics/survey.analytics.tabulator.js";
import { Model } from "survey-core";
import "survey-analytics/survey.analytics.tabulator.css";
import "tabulator-tables/dist/css/tabulator.min.css";

window.jsPDF = jsPDF;
window.XLSX = XLSX;

export default class SurveyAnalyticsTabulator extends Component {
  state = {
    loading: true,
    error: null,
    surveyJson: null,
    results: null,
  };

  async componentDidMount() {
    try {
      const surveyJsonResponse = await fetch('/survey-json');
      if (!surveyJsonResponse.ok) {
        throw new Error(`HTTP error! status: ${surveyJsonResponse.status}`);
      }
      const surveyJsonData = await surveyJsonResponse.json();

      const resultsResponse = await fetch('/get-all-survey-results');
      if (!resultsResponse.ok) {
        throw new Error(`HTTP error! status: ${resultsResponse.status}`);
      }
      const results = await resultsResponse.json();

      this.setState({ surveyJson: surveyJsonData, results: results, loading: false }, this.initializeTabulator);
    } catch (error) {
      console.error('Error fetching survey data:', error);
      this.setState({ error, loading: false });
    }
  }

  initializeTabulator = () => {
    if (this.state.surveyJson && this.state.results) {
      const surveyModel = new Model(this.state.surveyJson);
      this.visPanel = new Tabulator(surveyModel, this.state.results);
      this.visPanel.render(document.getElementById("summaryContainer"));
    }
  }

  render() {
    const { loading, error } = this.state;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <div id="summaryContainer"></div>;
  }
}
