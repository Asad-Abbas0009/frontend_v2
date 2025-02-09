import React from "react";

const PostCounselling = ({ title, description }) => {
  return (
    <div>
      <h1>{title || "Default Title"}</h1>
      <p>{description || "This is a default description."}</p>
    </div>
  );
};

export default PostCounselling;
