import { AsyncStorage } from 'react-native'

const checkLang = () => {
    const lang = AsyncStorage.getItem('lang');
    lang.then((resLang) => {
        console.log(resLang)
    })
}

export default checkLang;
