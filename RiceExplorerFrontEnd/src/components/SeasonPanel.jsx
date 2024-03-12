import { Fragment } from "react";
import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import _, { sample } from "lodash";

import { SeasonFilterGroup } from "../components/SeasonFilterGroup";
import { addSeason } from "../features/seasonSlice";
import { PlusSquare } from "react-bootstrap-icons";

export const SeasonPanel = () => {
  const appName = useSelector((state) => state.appName);
  const sampleState = useSelector((state) => state.samples);

  const seasonFilters = useSelector((state) => state.seasons);

  const dispatch = useDispatch();

  const handleAddSeason = () => {
    dispatch(addSeason());
  };

  return (
    <Fragment >
      {seasonFilters.seasons.map((seasonFilter, i) => (
        <SeasonFilterGroup
          key={i}
          idx={i}
          readOnly={false}
          inputThres={appName !== "phenology"}
        />
      ))}

   
    </Fragment>
  );
};

export default SeasonPanel;
