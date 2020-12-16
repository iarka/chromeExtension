import React from "react";
import "./App.scss";

export class App extends React.Component<{}> {
  public componentDidMount() {
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id || 0, { from: "popup", subject: "getFullName" }, response => {
          console.log(response);
        });
      });
    }
  }

  render() {
    return <div className="app">Hello world</div>;
  }
}

export default App;
