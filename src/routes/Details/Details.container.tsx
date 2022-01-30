import React from 'react';
import { useParams } from "react-router-dom";

const DetailsContainer = () => {

  let params  = useParams();


  return <div>DetailsContainer <h6>{params.repoId}</h6></div>;
};

export default DetailsContainer;
