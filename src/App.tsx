import React from 'react';
import './App.css';
import {Main} from "./n1-main/Main";
import {useSelector} from "react-redux";
import {AppStoreType} from "./n1-main/m2-bll/store";
import {RequestStatusType} from "./n1-main/m2-bll/app-reducer";
import {Loader} from "./n1-main/m1-ui/superComponents/Loader/Loader";

const App = () => {
    const status = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)

  return (
    <div className="App">
        {status === 'loading' && <Loader />}
      <Main/>
    </div>
  );
}

export default App;
