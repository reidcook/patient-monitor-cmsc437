const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<MyApp />)
function MyApp(){
    var [users, setUsers] = React.useState([{name: "Joe Shmo", age: "25", drugs: "Motrin", incident: "fell off bike"}]); // will hold all users
    var [user, setUser] = React.useState({name: "Joe Shmo", age: "25", drugs: "Motrin", incident: "fell off bike"}); // will hold current user
    var [screen, setScreen] = React.useState("Dashboard"); // will hold current screen
    console.log(user)
    const changeScreen = (newScreen) => {
        setScreen(newScreen)
    }
    const changeUser = (newUser) => {
        setUser(newUser)
    }
    const addUser = (newUser) => {
        let newUsersList = [];
        for(let i = 0; i< users.length; i++){
            newUsersList.push(users[i])
        }
        newUsersList.push(newUser);
        setUsers(newUsersList);
    }
    if(screen === "Dashboard"){
        return(
            <div style={{backgroundColor: "#212120"}} className="container-sm d-flex flex-column h-100 border border-info-subtle border-5">
            <div className="row h-10"><Footer currentUser={user} setScreenProp={changeScreen} setUserProp={setUser}/></div>
                <div className="row flex-grow-1 border-bottom border-top border-light border-3">
                    <div className="col-sm-3 h-100 border-end border-light border-3">
                        <div className="row h-25 border-bottom border-light border-3"><Temperature/></div>
                        <div className="row flex-grow-1">SMD</div>
                    </div>
                    <div className="col-sm-9 h-100">
                        <div className="row h-25 border-bottom border-light border-3">ECG 1</div>
                        <div className="row h-25 border-bottom border-light border-3">ECG 2</div>
                        <div className="row h-25 border-bottom border-light border-3">PLETH</div>
                        <div className="row h-25">CAPNO</div>
                    </div>
                </div>
            </div>
        )
    }
    else if(screen === "Details"){
        return(
            <div>
                <Details setUsersProp={addUser} currentUser={user} setScreenProp={changeScreen} updateCurrentUser={setUser}/>
            </div>
        )
    }
    else if(screen === "Select"){
        return(
            <div>
                <UserSelectScreen allUsers={users} setUsersProp={addUser} setUserProp={changeUser} currentUser={user} setScreenProp={changeScreen}/>
            </div>
        )
    }
}

class Footer extends React.Component{
    constructor(props){
        super(props)
        this.state = {time:0}
        this.screenSetter = props.setScreenProp;
        this.userSelector = props.setUserProp;
        this.user = props.currentUser;
        this.state = {
            time: 0,
            user: props.currentUser // Initialize state with user from props
        }
    };
    componentDidMount(){
        var handle = setInterval(frame, 1);
        var elem = document.getElementById("time")
        function frame(){
            elem.textContent = new Date().toLocaleTimeString()
        }
    }
    componentDidUpdate(prevProps) {
        // Check if currentUser prop has changed
        if (this.props.currentUser !== prevProps.currentUser) {
            // Update state with new user
            this.setState({ user: this.props.currentUser });
        }
    }
    componentWillUnmount(){
        
    }
    render(){
        return(
            <div className="header">
                <div className="bottom" id="time"></div>
                <div className="bottom">
                    {this.state.user.name}
                </div>
                <button onClick={() => this.screenSetter("Details")} className="bottom">Check User Details</button>
                <button onClick={() => this.screenSetter("Select")} className="bottom">Change User</button>
            </div>
        )
    }
}

class Details extends React.Component {
    constructor(props){
        super(props)
        this.screenSetter = props.setScreenProp;
        this.user = props.currentUser;
        this.state = {
            editLock: true,
            user: this.user};
        this.handleEditLock = this.handleEditLock.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleDrugsChange = this.handleDrugsChange.bind(this);
        this.handleIncidentChange = this.handleIncidentChange.bind(this);
    }

    handleEditLock(){
        this.setState(prevState => ({
            editLock: !prevState.editLock
        }), () => {
            // If we are locking the fields after editing, update the currentUser in MyApp
            if (this.state.editLock) {
                this.props.updateCurrentUser(this.state.user);
            }
        });
    }

    handleNameChange(event) {
        this.setState({
            user: { ...this.state.user, name: event.target.value }
        });
    }
    
    handleAgeChange(event) {
        this.setState({
            user: { ...this.state.user, age: event.target.value }
        });
    }
    
    handleDrugsChange(event) {
        this.setState({
            user: { ...this.state.user, drugs: event.target.value }
        });
    }
    
    handleIncidentChange(event) {
        this.setState({
            user: { ...this.state.user, incident: event.target.value }
        });
    }
    componentDidMount(){}
    render(){
        return(
            <div style={{backgroundColor: "#212120"}} className="container-sm d-flex flex-column h-100 border border-info-subtle border-5 position-relative">
                <div className="row h-10 border-bottom border-light border-3"><Footer currentUser={this.state.user} setScreenProp={this.screenSetter}/></div>
                <div className="row align-items-start">
                    <div className = " col-10 user-details">
                        <h1>User Details</h1>
                        <h3>Name: {this.state.editLock ? this.user.name : <input type="text" value={this.state.user.name} onChange={this.handleNameChange} />}</h3>
                        <h3>Age: {this.state.editLock ? this.user.age : <input type="number" value={this.state.user.age} onChange={this.handleAgeChange} />}</h3>
                        <h3>Prescribed Drugs: {this.state.editLock ? this.user.drugs : <input type="text" value={this.state.user.drugs} onChange={this.handleDrugsChange} />}</h3>
                        <h3>Incident: {this.state.editLock ? this.user.incident : <input type="text" value={this.state.user.incident} onChange={this.handleIncidentChange} />}</h3>
                    </div>
                    <div className ="col-2 text-end p-2" >
                    <button onClick={this.handleEditLock} className="edit-button home-button"> {this.state.editLock ? 'Unlock' : 'Lock'}</button>
                    </div>
                </div>
                <div style={{textAlign: "center", paddingTop: "10%"}}>
                        <button className="home-button" onClick={() => this.screenSetter("Dashboard")}>Home</button>
                </div>
            </div>
        )
    }
}

class UserSelectScreen extends React.Component {
    constructor(props){
        super(props)
        this.screenSetter = props.setScreenProp;
        this.user = props.currentUser;
        this.allUsers = props.allUsers;
        this.userSetter = props.setUserProp;
        this.usersSetter = props.setUsersProp;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.state = {}
    }
    componentDidMount(){}
    handleSubmit(event){
        //this.userSetter({name: event.target[0]?.value, age: event.target[1]?.value, drugs: event.target[2]?.value, incident: event.target[3]?.value})
        event.preventDefault();
        this.usersSetter({name: event.target[0]?.value, age: event.target[1]?.value, drugs: event.target[2]?.value, incident: event.target[3]?.value})
        this.userSetter({name: event.target[0]?.value, age: event.target[1]?.value, drugs: event.target[2]?.value, incident: event.target[3]?.value})
        this.screenSetter("Dashboard")
    }
    handleUserChange(event){
        // if(event.target.value === undefined){
        //     console.log("undefined")
        // }
        // this.userSetter(event.target.value)
        this.userSetter(this.allUsers.find(user => user.name === event.target.value))
        this.screenSetter("Dashboard")
    }
    render(){
        return(
            <div style={{backgroundColor: "#212120"}} className="container-sm d-flex flex-column h-100 border border-info-subtle border-5">
                <div className="row h-10 border-bottom border-light border-3"><Footer currentUser={this.user} setScreenProp={this.screenSetter}/></div>
                <div className="create-user">
                    <h1>Create a User</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name: 
                            <input type="text" name="name" />
                        </label>
                        <label>
                            Age: 
                            <input type="text" name="age" />
                        </label>
                        <label>
                            Prescribed Drugs: 
                            <input type="text" name="drugs" />
                        </label>
                        <label>
                            Incident: 
                            <input type="text" name="incident" />
                        </label>
                        <div style={{paddingTop: "1%"}}>
                            <input className="submit-button" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
                <div className="change-user">
                    <h1>Change User</h1>
                    <select value={this.user.name} onChange={this.handleUserChange}>
                        {this.allUsers.map((user) => <option style={{padding: "100px"}}value={user.name}>{user.name}</option>)}
                    </select>
                    <div style={{textAlign: "center", paddingTop: "20%"}}>
                        <button className="home-button" onClick={() => this.screenSetter("Dashboard")}>Home</button>
                    </div>
                </div>
            </div>
        )
    }
}

class Temperature extends React.Component{
    constructor(props){
        super(props)
        this.state = {temp: 95, bpm: 90};
    }
    componentDidMount(){
        this.interval = setInterval(this.temp, 3000)
        this.interval2 = setInterval(this.bpm, 1000)
    }
    componentWillUnmount(){
    }
    temp = () => {
        let temp = Math.floor(Math.random() * (100 - 95) + 95);
        this.setState({temp: temp})
    }
    bpm = () => {
        let bpm = Math.floor(Math.random() * (120 - 90) + 90);
        this.setState({bpm: bpm})
    }
    render(){
        return(
            <div>
                <h4>Temperature</h4>
                <h5>{this.state.temp} F</h5>
                <hr></hr>
                <h4>HeartRate</h4>
                <h5>{this.state.bpm} BPM</h5>
            </div>
        )
    }
}

//
// Jose this is the class that you made. Not sure what it is supposed to do but brought it over to this new file
//
class monitor extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(<div>
                <UseCanvas />
            </div>
        );
    }
}

function UseCanvas(props) {
    const [canvas, setCanvas] = React.useState(null);
    React.useEffect(() => {
        if(canvas != null){
            const ctx = canvas.getContext("2d");
            drawToCanvas(ctx);
        }
    } , [canvas]);
    return(
        <div className="canvas-container" col="9">
            <canvas ref={setCanvas}/>
        </div>
    );
}