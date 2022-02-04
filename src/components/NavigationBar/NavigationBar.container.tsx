import React from "react";
import { useQuery } from "react-query";

import NavigationBarView from "./NavigationBar.view";
import { getUser } from "./../../services/api";
import { useAuthContext } from "./../../contexts/auth.context";

const NavigationBarContainer = () => {
  const { isAuthenticated } = useAuthContext();
  // const user = { avatar_url: "avatarurl", login: "alenHard" };
  const {
    data: user,
    isLoading,
    error
  } = useQuery("user", getUser, {
    enabled: isAuthenticated
  });

  if (error) {
    <h1>Error loading user data...</h1>;
  }
  if (isLoading) {
    <h1>Loading user data...</h1>;
  }

  return (
    <div>
      <NavigationBarView isAuthenticated={isAuthenticated} user={user} />
    </div>
  );
};

export default NavigationBarContainer;
