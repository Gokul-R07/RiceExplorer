import {
  Route,
  Switch,
  useLocation,
  Redirect
} from "react-router-dom";
import Header from "./components/Header";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCookie } from "./utils/csrfToken";
import { setToken } from "./features/csrfTokenSlice";

import Map from "./components/LeafletMap";
import CropSelectionComponent from "./apps/empirical/CropSelectionComponent";


import "./App.css";
import SplitPane from "react-split-pane";

import { EmpiricalLeft } from "./apps/empirical/EmpiricalLeft";
import EmpiricalRight from "./apps/empirical/EmpiricalRight";

import { LogPanel } from "./components/LogPanel";

const leftSize = {
  "default": "20%",
  "max": "40%"
}

const rightSize = {
  "default": "25%",
  "max": "40%"
}

function App() {
  const location = useLocation();

  const dispatch = useDispatch();

  const appName = useSelector(state => state.appName)


  useEffect(() => {
    let token = getCookie("csrftoken");
    dispatch(setToken(token));
  }, []);



  return (
    <div className="vh-100 vw-100">
      <Header />
      <div className="main d-flex h-100 w-100">
        <Switch>
        <Redirect exact from="/" to="/empirical" />
        <Route exact path="/cropselection">
            <CropSelectionComponent />
          </Route>
        <Route>
            <SplitPane
              split="vertical"
              defaultSize={leftSize["default"]}
              minSize={0}
              maxSize={leftSize["max"]}
              className="h-100 position-static"
            >
        
              <div className="h-100 w-100">
                <Switch>
                  <Route exact path="/empirical">
                    <EmpiricalLeft  />
                  </Route>
                  
                </Switch>
              </div>

              <SplitPane 
                split="vertical" 
                primary="second" 
                defaultSize={rightSize["default"]}
                minSize={0}
                maxSize={rightSize["max"]}
              >
     
                <div className="h-100 w-100">
                 
                  <SplitPane 
                    split="horizontal" 
                    primary="second" 
                    defaultSize={250} 
                    maxSize={400}
                    minSize={0}
                  >
                    <div className="w-100 h-100">
                      <Map />
                    </div>

                    <div className="w-100">
                      <LogPanel />
                    </div>

                  </SplitPane>
                </div>

                <div className="h-100">

                  <Route exact path="/empirical">
                    <EmpiricalRight />
                  </Route>
                 
                </div>
              </SplitPane>
            </SplitPane>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
