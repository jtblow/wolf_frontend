import React from "react";
import MatchSummaryView from "./MatchSummaryView";

const UserMatchListing = props => {
  return (
    <div onClick={() => props.handleMatchClick(props.matchListing.id)}>
      {props.matchListing.course_name}:{" "}
      {props.matchListing.created_at.slice(0, 10)}
    </div>
  );
};
export default UserMatchListing;
