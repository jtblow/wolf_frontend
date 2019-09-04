import React from "react";

const Suggestions = props => {
  const options = props.results.map(r => (
    <p
      data-value={props.name}
      onClick={event => {
        props.handleSugClick(event);
        props.handleTextChange(event);
      }}
      key={r.id}
    >
      {r.username}
    </p>
  ));
  return <div>{options}</div>;
};

export default Suggestions;
