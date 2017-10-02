import { combineReducers } from 'redux';
import Navigation from './Navigation';
import Language from './Langguage'

export default combineReducers({
    nav: Navigation,
    lang: Language
})