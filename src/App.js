import React, { Component } from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    };
  }

  componentDidMount() {
    // 生命周期中调用
    console.log("componentDidMount before: " + this.state.counter);
    this.setState({ counter: this.state.counter + 1 });
    // 此处不能实时更新
    console.log("componentDidMount after: " + this.state.counter);
    setTimeout(() => {
      // setTimeout中调用
      console.log("setTimeout before: " + this.state.counter);
      this.setState({ counter: this.state.counter + 1 });
      console.log("setTimeout after: " + this.state.counter);
    }, 0);
    document.getElementById("btn-2").addEventListener("click", this.btn2Click);
  }

  spanClick = () => {
    const { counter } = this.state;
    console.log("spanClick before: " + this.state.counter);
    this.setState({
      counter: counter + 1
    });
    this.setState({
      counter: counter + 2
    });
    // 此处不能实时更新
    console.log("spanClick after: " + this.state.counter);
  };

  btn2Click = () => {
    const { counter } = this.state;
    console.log("addEventListener btn2Click before: " + this.state.counter);
    this.setState({
      counter: counter + 1
    });
    // 此处可以实时更新
    console.log("addEventListener btn2Click after: " + this.state.counter);
  };

  render() {
    return (
      <div className="App">
        <span className="btn" onClick={(event) => this.spanClick(event)}>
          点击
        </span>
        <span className="btn-2" id="btn-2">
          点击2
        </span>
      </div>
    );
  }
}
export default App;
