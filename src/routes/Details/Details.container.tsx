import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { getRepository, getRepositoryReadMe } from "./../../services/api";
import {encodeBase64ToString} from "./../../utils/utils"
import DetailsView from "./Details.view";
import { Loader } from "../../components";

const DetailsContainer = (): JSX.Element => {
  let params = useParams();

  const { owner, repoName } = params;

  const { data: repository, isLoading: repoDataIsLoading, isSuccess } = useQuery(
    ["repository", owner, repoName],
    () => getRepository(owner, repoName)
  );

  const {
    data: readMeContent = "",
    isLoading: readMeIsLoading,
    error
  } = useQuery(["readme", owner, repoName], () =>
    getRepositoryReadMe(owner, repoName)
  );

  if (error || !repository) return <h1>Error readme{error}</h1>;

  if (repoDataIsLoading || readMeIsLoading) {
    return <Loader text="Loading details..." />;
  }

  console.log("repositoryrepository", repository)
  let encodedReadMe;
  // if(readMeContent) {
  //   encodedReadMe = encodeBase64ToString(readMeContent);
  // }
  
  encodedReadMe = encodeBase64ToString(readMeContent);
  const read = readMeContent;


  console.log("repository",repository)


  return <DetailsView repository={repository} readMe={encodedReadMe}/>;

};

export default DetailsContainer;
