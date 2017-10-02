import { StackNavigator } from 'react-navigation';

import SettingList from '../screens/main/setting_tab/SettingList'
import SettingDetail from '../screens/main/setting_tab/SettingDetail'

const SettingTab = StackNavigator({
    SettingList: { screen: SettingList },
    SettingDetail: { screen: SettingDetail },
})

export default SettingTab;
