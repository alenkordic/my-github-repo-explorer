import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Loader } from "../../components";

import { getRepository, getRepositoryReadMe } from "./../../services/api";
import DetailsView from "./Details.view";

const DetailsContainer = (): JSX.Element => {
  let params = useParams();

  const { owner, repoName } = params;

  const { data: repository, isLoading: repoDataIsLoading } = useQuery(
    ["repository", owner, repoName],
    () => getRepository(owner, repoName)
  );

  const {
    data: readMeContent,
    isLoading: readMeIsLoading,
    error
  } = useQuery(["readme", owner, repoName], () =>
    getRepositoryReadMe(owner, repoName)
  );

  if (error || !repository) return <h1>Something went wrong!{error}</h1>;

  if (repoDataIsLoading || readMeIsLoading) {
    return <Loader text="Loading details..." />;
  }

  return (
    <>
      <Helmet>
        <title>Details | Git Repo Explorer</title>
        <meta charSet="utf-8" />
        <meta name="description" content="This is repository details page" />
        <link
          rel="canonical"
          href={`http://localhost:3000/repositories/${owner}/${repoName}`}
        />
      </Helmet>
      <DetailsView repository={repository} readMe={readMeContent} />
    </>
  );
};

export default DetailsContainer;
