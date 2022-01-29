import React from 'react';
import './App.css';
import {useRepoExplorerContext} from "./store"
import { useQuery } from 'react-query';
import {getRepositories} from "./services/api"

import {ACTION_TYPES} from "./constants/actionTypes"

function App() {
  // const ctx = useRepoExplorerContext()

  // console.log("ctx", ctx.state)

  // const toggleHandle = ()=> {
  //   ctx.dispatch({
  //     type: ACTION_TYPES.TOGGLE_THEME_MODE
  //   })

  // }

  // const {isLoading, data} = useQuery('getInit', getRepositories )

  // if (isLoading) return <h1>Loading....</h1>

  // if (data) {
  //   console.log("data",data)
  // }


  return (
    <div className="App">
     APP MAIN
    </div>
  );
}

export default App;
