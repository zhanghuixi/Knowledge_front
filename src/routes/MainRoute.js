import React from "react";
import { observer } from "mobx-react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import AsyncComponent from "../components/AsyncComponent";

const MeasureLib = AsyncComponent(() => {
  return import("./../containers/MeasureLib");
});
const NewMeasureLib = AsyncComponent(() => {
  return import("./../containers/NewMeasureLib");
});
const MeasureDetails = AsyncComponent(() => {
  return import("./../containers/MeasureDetails");
});
const MeasureRelate = AsyncComponent(() => {
  return import("./../containers/MeasureRelate");
});
const AddMeasure = AsyncComponent(() => {
  return import("./../containers/MeasureLib/AddMeasure");
});
const MainRoute = observer(props => {
  const MainDiv = styled("div")`
    height: 100%;
    overflow: hidden;
    min-width: 450px;
    margin: 0 auto;
    background: #fff;
  `;
  const { location, match } = props;
  return (
    <MainDiv>
      <Switch location={location}>
        <Route path={`${match.path}`} exact component={MeasureLib} />
        <Route
          path={`${match.path}/measuredetails`}
          exact
          component={MeasureDetails}
        />
        <Route
          path={`${match.path}/newmeasurelib`}
          exact
          component={NewMeasureLib}
        />
        <Route
          path={`${match.path}/measurerelate`}
          exact
          component={MeasureRelate}
        />
        <Route
          path={`${match.path}/addmeasure`}
          exact
          component={AddMeasure}
        />
      </Switch>
    </MainDiv>
  );
});

export default MainRoute;
