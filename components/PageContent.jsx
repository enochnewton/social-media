import { AddFriends, FriendRequests, Friends, HomePage } from "./Reusable";
import React from "react";

const PageContent = React.memo(({ linkName }) => {
  switch (linkName) {
    case "Friends":
      return <Friends />;
    case "Friend Request":
      return <FriendRequests />;
    case "Explore":
      return <AddFriends />;
    default:
      return <HomePage />;
  }
});

export default PageContent;
