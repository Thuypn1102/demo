import { TabNavigator } from 'react-navigation'

import TaskTab from './TaskTab'
import ProductTab from './ProductTab'
import SettingTab from './SettingTab'

const Main = TabNavigator({
    TaskTab: { screen: TaskTab },
    ProductTab: { screen: ProductTab },
    SettingTab: { screen: SettingTab },
})

export default Main;