import { StackNavigator } from 'react-navigation';

import TaskList from '../screens/main/task_tab/TaskList'
import TaskDetail from '../screens/main/task_tab/TaskDetail'

const TaskTab = StackNavigator({
    TaskList: { screen: TaskList },
    TaskDetail: { screen: TaskDetail },
})

export default TaskTab;
