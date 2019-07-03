import React from "react";

const UserMatchListing = props => {
  return (
    <li>
      {props.matchListing.course_name}:{" "}
      {props.matchListing.created_at.slice(0, 10)}
    </li>
  );
};
export default UserMatchListing;
