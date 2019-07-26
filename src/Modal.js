import React, { Component } from "react";
import Recipe from "./Recipe";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.targetRef = React.createRef();
    this.targetElement = null;
    this.history = props.history;
  }

  componentDidMount() {
    this.targetElement = this.targetRef.current;
    disableBodyScroll(this.targetElement);
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  back(e) {
    e.stopPropagation();
    this.history.goBack();
  }

  render() {
    return (
      <div>
        <div className="modal-container" onClick={this.back.bind(this)} />
        <div className="modal" ref={this.targetElement}>
          <div className="close" onClick={this.back.bind(this)}>&times;</div>
          <Recipe {...this.props} />
        </div>
      </div>
    );
  }
}
