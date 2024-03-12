import { Form, Card } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import _ from "lodash";

import { changeOp } from "../../features/seasonSlice";
import SeasonPanel from "../../components/SeasonPanel";


export default function EmpiricalRight() {

  const seasonFilters = useSelector(state => state.seasons)
  const dispatch = useDispatch()


  const handleChangeLogicalOperation = (op) => {
    dispatch(changeOp(op))
  }
  
  return (
    <div className="h-100 d-flex flex-column p-2">
      
     

      <SeasonPanel />

    </div>
  );
}
