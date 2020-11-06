import {combineReducers} from 'redux'

const initState = 1

function test(state=initState,action){
    switch(action.type){
        default:
            return state
    }
}

export default combineReducers({
    test
})