static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Chat',
    headerRight: (
        <TouchableWithoutFeedback
            onPress={() => navigation.state.params.onLogoutPress()}
        >
            <Text style={styles.logOutTxt}>Log Out</Text>
        </TouchableWithoutFeedback>),
})
constructor(props) {
    super(props);
    this.onLogoutPress = this.onLogoutPress.bind(this)
}
componentDidMount() {
    this.props.navigation.setParams({
        onLogoutPress: this.onLogoutPress
    })
}
onLogoutPress = () => {
    this.props.logout();//gọi đến action của redux
}