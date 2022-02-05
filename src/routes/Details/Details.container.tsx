import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import DetailsView from "./Details.view";
import { getRepository } from "./../../services/api";

const DetailsContainer = () => {
  let params = useParams();

  const { owner, repoName } = params;

  const { data, isLoading, status } = useQuery(
    ["repository", owner, repoName],
    () => getRepository(owner, repoName),
    {
      enabled: true
    }
  );

  if (isLoading) return <h1>Loadiiing...</h1>;

  if (status === "success") {
    // console.log("DATA", { ...data });
  }

  return <DetailsView {...data} />;
};

export default DetailsContainer;
