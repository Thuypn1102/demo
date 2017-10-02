import { TOOGLE_LANG } from '../types/'

const INITIAL = {
    toogleLang: true
}

export default (state = INITIAL, action) => {
    switch (action.type) {
        case TOOGLE_LANG:
            return { ...state, toogleLang: !state.toogleLang }
        default:
            return state;
    }
}