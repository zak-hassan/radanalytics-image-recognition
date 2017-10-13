import { STATS } from "../constants"

const initialState = {
    numRes: null,
    timeTaken:null,
    dateLastRes:null,
    resultsHistory:null,
    images:null,
    timeToDownloadModel: null
};

const statsReducer = (state = initialState, action) => {
    switch (action.type) {
        case STATS.SET_LAST_RES_DATE:
            state = {
                ...state,
                dateLastRes: action.payload
            };
            break;
        case STATS.SET_LAST_RES_TIME_TAKEN:{
            let timeTaken = Math.round(action.payload*100)/1000;

            state = {
                ...state,
                timeTaken: timeTaken.toString()
            };
            break;
        }
        case STATS.SET_NUM_RES:
            state = {
                ...state,
                numRes: action.payload
            };
            break;
        case STATS.SET_RES_HIS:
            state = {
                ...state,
                resultsHistory: action.payload
            };
            break;
        case STATS.SET_MODAL_DOWNLOAD_TIME:
            state = {
                ...state,
                timeToDownloadModel: action.payload
            };
            break
    }
    return state
};

export default statsReducer
