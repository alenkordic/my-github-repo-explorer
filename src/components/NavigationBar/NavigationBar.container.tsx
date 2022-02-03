import React from "react";
import NavigationBarView from "./NavigationBar.view";
import { getUser } from "./../../services/api";
import { useAuthContext } from "./../../contexts/auth.context";



import { useQuery } from "react-query";


const NavigationBarContainer = () => {
 
  const { isAuthenticated, } = useAuthContext();
  const user = { avatar_url: "avatarurl", login: "alenHard" };

  console.log("isAuthenticated", isAuthenticated);

  return (
    <div>
      <NavigationBarView isAuthenticated={isAuthenticated} user={user} />
    </div>
  );
};

export default NavigationBarContainer;
