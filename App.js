import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { QUESTIONS } from "./questions";

class App extends Component {
  state = {
    answers: {}, // Store user's answers
    overallScore: 0 // Store overall score
  };

  // Function to handle user's answer to a question
  handleAnswer = (questionNumber, answer) => {
    const updatedAnswers = { ...this.state.answers, [questionNumber]: answer };
    const totalQuestions = Object.keys(QUESTIONS).length;
    const yesAnswers = Object.values(updatedAnswers).filter(answer => answer === 'yes').length;
    const overallScore = (100 * yesAnswers) / totalQuestions;
    this.setState({ answers: updatedAnswers, overallScore });
  };

  // Function to calculate the score
  calculateScore = () => {
    const totalQuestions = Object.keys(QUESTIONS).length;
    const yesAnswers = Object.values(this.state.answers).filter(answer => answer === 'yes').length;
    return (100 * yesAnswers) / totalQuestions;
  };

  render() {
    const { answers, overallScore } = this.state;

    return (
      <div className="main__wrap">
        <main className="container">
          {/* Render questions */}
          {Object.keys(QUESTIONS).map(questionNumber => (
            <div className="question_wrapper" key={questionNumber}>
              <p>{QUESTIONS[questionNumber]}</p>
              <button className="btn" onClick={() => this.handleAnswer(questionNumber, 'yes')}>Yes</button>
              <button className="btn" onClick={() => this.handleAnswer(questionNumber, 'no')}>No</button>
            </div>
          ))}
          {/* Display score */}
          <div>
            <p>Score: {this.calculateScore().toFixed(2)}%</p>
            <p>Overall Score: {overallScore.toFixed(2)}%</p>
          </div>
        </main>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;
