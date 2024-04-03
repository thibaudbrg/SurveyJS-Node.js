import React, { Component } from "react";
import { DataTables } from "survey-analytics/survey.analytics.datatables.js";
import { Model } from "survey-core";
import $ from "jquery";
import "datatables.net/js/jquery.dataTables.js";
import "datatables.net-dt/js/dataTables.dataTables.js";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-colreorder/js/dataTables.colReorder.js";
import "datatables.net-rowgroup/js/dataTables.rowGroup.js";
import "datatables.net-colreorder-dt/css/colReorder.dataTables.css";
import "survey-analytics/survey.analytics.datatables.css";
import { useLocalCheck } from '../hooks/useLocalCheck';


export default class SurveyAnalyticsDatatables extends Component {
  state = {
    loading: true,
    error: null,
    surveyJson: null,
    results: null,
  };

  async componentDidMount() {
    if (!useLocalCheck()) {
      this.setState({ loading: false });
      return;
    }

    DataTables.initJQuery($);
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

      this.setState({ surveyJson: surveyJsonData, results: results, loading: false }, this.initializeDataTables);
    } catch (error) {
      console.error('Error fetching survey data or results:', error);
      this.setState({ error, loading: false });
    }
  }

  initializeDataTables = () => {
    if (this.state.surveyJson && this.state.results) {
      const surveyModel = new Model(this.state.surveyJson);
      this.visPanel = new DataTables(surveyModel, this.state.results);
      this.visPanel.render(document.getElementById("summaryContainer"));
    }
  }

  render() {
    if (!useLocalCheck()) {
      return <div>Access Denied: This page is only accessible from localhost.</div>;
    }

    const { loading, error } = this.state;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <div id="summaryContainer"></div>;
  }
}
