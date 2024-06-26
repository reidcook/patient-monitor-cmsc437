const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<MyApp />)
function MyApp(){
    var [users, setUsers] = React.useState([{name: "Joe Shmo", age: "25", drugs: "Motrin", incident: "fell off bike"}]); // will hold all users
    var [user, setUser] = React.useState({name: "Joe Shmo", age: "25", drugs: "Motrin", incident: "fell off bike"}); // will hold current user
    var [screen, setScreen] = React.useState("Dashboard"); // will hold current screen
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
        console.log(users)
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
                <Details setUsersProp={addUser} currentUser={user} setScreenProp={changeScreen}/>
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
    };
    componentDidMount(){
        var handle = setInterval(frame, 1);
        var elem = document.getElementById("time")
        function frame(){
            elem.textContent = new Date().toLocaleTimeString()
        }
    }
    componentWillUnmount(){
        
    }
    render(){
        return(
            <div className="header">
                <div className="bottom" id="time"></div>
                <div className="bottom">
                    {this.user.name}
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
    }
    componentDidMount(){}
    render(){
        return(
            <div style={{backgroundColor: "#212120"}} className="container-sm d-flex flex-column h-100 border border-info-subtle border-5">
                <div className="row h-10 border-bottom border-light border-3"><Footer currentUser={this.user} setScreenProp={this.screenSetter}/></div>
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
        this.state = {}
    }
    componentDidMount(){}
    handleSubmit(event){
        //this.userSetter({name: event.target[0]?.value, age: event.target[1]?.value, drugs: event.target[2]?.value, incident: event.target[3]?.value})
        this.usersSetter({name: event.target[0]?.value, age: event.target[1]?.value, drugs: event.target[2]?.value, incident: event.target[3]?.value})
        event.preventDefault();
    }
    handleUserChange(event){
        console.log(event)
        this.userSetter(event.target.value)
    }
    render(){
        return(
            <div style={{backgroundColor: "#212120"}} className="container-sm d-flex flex-column h-100 border border-info-subtle border-5">
                <div className="row h-10 border-bottom border-light border-3"><Footer currentUser={this.user} setScreenProp={this.screenSetter}/></div>
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
                    <input type="submit" value="submit" />
                </form>
                <h1>Change User</h1>
                <select onChange={this.handleUserChange}>
                    {this.allUsers.map((user) => <option value={user}>{user.name}</option>)}
                </select>
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