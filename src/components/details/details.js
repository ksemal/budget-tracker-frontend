import React from "react";
import { connect } from "react-redux";

const Details = props => {
  return (
    <div>
      Transaction details: total is <span>{props.selected.sum}</span>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    selected: state.selectedTransaction
  };
};

export default connect(mapStateToProps)(Details);
