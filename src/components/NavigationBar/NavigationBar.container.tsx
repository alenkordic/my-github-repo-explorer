import React, { useEffect, useCallback } from "react";

import { useQuery } from "react-query";

import NavigationBarView from "./NavigationBar.view"
import { useRepoExplorerContext } from "./../../store";
import { getUser } from "./../../services/api";
import { ACTION_TYPES } from "../../constants/actionTypes";


const NavigationBarContainer = () => {

    const { state, dispatch } = useRepoExplorerContext();

  const { isLoggedIn } = state;

  // const accessToken = localStorage.getItem("access_token");
  // useEffect(() => {
  //   if (accessToken) {
  //     dispatch({
  //       type: ACTION_TYPES.LOGIN,
  //     });
  //   }
  // }, [ dispatch]);


  const {
    data: user,
    status,
    isLoading,
    error,
    isSuccess
  } = useQuery("getUser", () => getUser(), {
    enabled: isLoggedIn,
  });

  if (isSuccess) {
    console.log("yere", user);
  }


  return <div><NavigationBarView isLoggedIn={isLoggedIn} user={user}/></div>;
};

export default NavigationBarContainer;
