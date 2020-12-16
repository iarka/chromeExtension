import React from "react";
import "./App.css";
import Profile from "../models/profile";

interface State extends Profile {
}

export class App extends React.Component<{}, State> {
  state = {} as State

  public componentDidMount() {
    if (chrome && chrome.tabs) {
      chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id || 0, {from: "popup", subject: "getFullName"}, response => {
          console.log(response);
          this.setState({
            fullName: response.fullName,
            title: response.title,
            country: response.country,
            imageSrc: response.imageSrc,
            company: response.company
          })
        });
      });
    }
  }

  render() {
    return (
      <div className="app">
        <img className="profile-image" src={this.state.imageSrc} alt={this.state.fullName}/>
        <img className="company" src={this.state.company} alt="Company"/>
        <div className="fullName">{this.state.fullName}</div>
        <div className="title">{this.state.title}</div>
      </div>
    );
  }
}

export default App;
