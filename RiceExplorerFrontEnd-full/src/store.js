import { configureStore } from "@reduxjs/toolkit";
import csrfTokenReducer from "./features/csrfTokenSlice";
import datasetReducer from './features/datasetSlice'
import sampleReducer from "./features/sampleSlice";
import seasonReducer from "./features/seasonSlice";
import logReducer from "./features/logSlice";

export default configureStore({
    reducer: {
        csrfToken: csrfTokenReducer,
        dataset: datasetReducer,
        seasons: seasonReducer,
        samples: sampleReducer,
        log: logReducer,
    }
})