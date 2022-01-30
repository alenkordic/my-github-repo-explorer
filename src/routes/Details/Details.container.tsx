import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";

import { getRepository } from "./../../services/api"

const DetailsContainer = () => {

  let params  = useParams();

  const {owner, repoName} = params

  const {data, isLoading, isError, error, status} = useQuery(['repository', owner, repoName], ()=> getRepository(owner, repoName), {
    enabled: true
  } )


  if (isLoading) return <h1>Loadiiing...</h1>

  if (status === "success") {
    console.log('DATA', data)
  }

  return <div>DetailsContainer <h6>{owner}</h6><h3>{repoName}</h3></div>;
};

export default DetailsContainer;
