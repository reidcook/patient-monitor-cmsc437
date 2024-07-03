import { drawToECG1 } from "./ECG1.js";
import { drawToECG2 } from "./ECG2.js";
import { drawToPleth } from "./PLETH.js";
import { drawToCapno } from "./CAPNO.js";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<MyApp />)
function MyApp(){
    var [users, setUsers] = React.useState([{name: "Joe Shmo", age: "25", drugs: "Motrin", incident: "fell off bike"}]); // will hold all users
    var [user, setUser] = React.useState({name: "Joe Shmo", age: "25", drugs: "Motrin", incident: "fell off bike"}); // will hold current user
    var [screen, setScreen] = React.useState("Dashboard"); // will hold current screen
    var [power, setPower] = React.useState(false);
    console.log(user)
    const changeScreen = (newScreen) => {
        setScreen(newScreen);
    }
    const changeUser = (newUser) => {
        setUser(newUser);
    }
    const addUser = (newUser) => {
        let newUsersList = [];
        for(let i = 0; i< users.length; i++){
            newUsersList.push(users[i])
        }
        newUsersList.push(newUser);
        setUsers(newUsersList);
    }
    const handleButtonClick = () => {
        setPower(!power);
    }
    if(screen === "Dashboard"){
        return(
                <div style={{backgroundColor: "#212120"}} className="container-sm flex-column border border-info-subtle border-5 rounded-3">
                    <div className="row h-10"><Footer currentUser={user} setScreenProp={changeScreen} setUserProp={setUser}/></div>
                    <div className="row h-90 border-top border-light border-3">
                        <div className="col-sm-3 border-end border-light border-3 justify-content-center align-items-center text-center">
                            <div className="row h-25 border-bottom border-light border-3"><Temperature power={power}/></div>
                            <div className="row h-30"><SMD power={power}/></div>
                            <br></br>
                            <div className="row h-25 d-flex justify-content-center align-items-center">                              
                                <button onClick={handleButtonClick} style={{width: "150px", height: "150px"}} 
                                    className="btn btn-danger btn-lg rounded-circle 
                                    d-flex justify-content-center align-items-center btn-outline-light text-center">POWER</button>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="row border-bottom border-light border-3" style={{width: "983px", height: "280px"}}><ECG1 power={power}/></div>
                            <div className="row border-bottom border-light border-3" style={{width: "983px", height: "280px"}}><ECG2 power={power}/></div>
                            <div className="row border-bottom border-light border-3" style={{width: "983px", height: "280px"}}><PLETH power={power}/></div>
                            <div className="row " style={{width: "983px", height: "280px"}}><CAPNO power={power}/></div>
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
            <div style={{backgroundColor: "#212120"}} className="container-sm d-flex flex-column h-100 border border-info-subtle border-5 justify-content-center">
                <div className="row h-10 border-bottom border-light border-3"><Footer currentUser={this.state.user} setScreenProp={this.screenSetter}/></div>
                <div className="row align-items-center p-5">
                    <div className="col-2"></div>
                    <div className = "col-8 user-details text-center">
                        <h1>User Details</h1>
                        <h3>Name: {this.state.editLock ? this.state.user.name : <input type="text" value={this.state.user.name} onChange={this.handleNameChange} />}</h3>
                        <h3>Age: {this.state.editLock ? this.state.user.age : <input type="number" value={this.state.user.age} onChange={this.handleAgeChange} />}</h3>
                        <h3>Prescribed Drugs: {this.state.editLock ? this.state.user.drugs : <input type="text" value={this.state.user.drugs} onChange={this.handleDrugsChange} />}</h3>
                        <h3>Incident: {this.state.editLock ? this.state.user.incident : <input type="text" value={this.state.user.incident} onChange={this.handleIncidentChange} />}</h3>
                    </div>
                    <div className="col-2"></div>
                </div>
                <div className ="text-center p-3">
                    <button onClick={this.handleEditLock} className="edit-button home-button"> {this.state.editLock ? 'Unlock' : 'Lock'}</button>
                </div>
                <div className="change-user mt-auto" style={{textAlign: "center"}}>
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
                <div className="change-user d-flex flex-column h-100">
                    <h1>Change User</h1>
                    <select value={this.user.name} onChange={this.handleUserChange} style={{padding: "10px", margin: "30px 0 0 0"}}>
                        {this.allUsers.map((user) => <option value={user.name}>{user.name}</option>)}
                    </select>
                    <div className="mt-auto" style={{textAlign: "center"}}>
                        <button className="home-button" onClick={() => this.screenSetter("Dashboard")}>Home</button>
                    </div>
                </div>
            </div>
        )
    }
}

class Temperature extends React.Component{
    constructor(props){
        super(props);        
        this.state = {temp: this.props.power ? 95 :0, 
                        bpm: this.props.power ? 90 : 0}; 
        this.tempInterval = null;
        this.bpmInterval = null;
    }
    componentDidMount(){
        this.startMonitor();
    }
    componentWillUnmount(){
        this.stopMonitor();
    }
    componentDidUpdate(prevProps) {
        if(prevProps.power !== this.props.power) {
            if(this.props.power){
                this.startMonitor();
            }
            else{
                this.stopMonitor();
            }
        }
    }
    startMonitor = () => {
        this.tempInterval = setInterval(this.temp, 3000);
        this.bpmInterval = setInterval(this.bpm, 2000)
    }
    stopMonitor = () => {
        clearInterval(this.tempInterval);
        clearInterval(this.bpmInterval);
        this.setState({temp: 0});
        this.setState({bpm: 0});
    }
    temp = () => {
        if(this.props.power){
            let temp = Math.floor(Math.random() * (100 - 95) + 95);
            this.setState({temp});
        }       
    }
    bpm = () => {
        if(this.props.power){
            let bpm = Math.floor(Math.random() * (120 - 90) + 90);
            this.setState({bpm});
        }
    }
    render(){
        return(
            <div>
                <h4>Temperature</h4>
                <h5>{this.state.temp} &#176;F</h5>
                <hr></hr>
                <h4>HeartRate</h4>
                <h5>{this.state.bpm} BPM</h5>
            </div>
          
        )
    }
}


class ECG1 extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(<div className="flex-sm-row d-flex">
                <div className="text-success fw-bold fs-4 d-flex flex-sm-column col-sm-2 text-center">ECG1</div>
                <div className="col-sm-10 h-270 w-900">{this.props.power ? <GraphECG1 widthProp = "800" heightProp = "270"/> : null}</div>
            </div>
        );
    }
}

function GraphECG1(props) {
    const [canvas, setCanvas] = React.useState(null);
    React.useEffect(() => {
        if(canvas != null){
            const ctx = canvas.getContext("2d");
            drawToECG1(ctx);
        }
    } , [canvas]);
    return(<canvas width={props.widthProp} height={props.heightProp} ref={setCanvas}/>
    );
}

class ECG2 extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(<div className="flex-sm-row d-flex">
                <div className="text-success-emphasis fw-bold fs-4 d-flex flex-sm-column col-sm-2 text-center">ECG2</div>
                <div className="col-sm-10 h-270 w-900">{this.props.power ? <GraphECG2 widthProp = "800" heightProp = "270"/> : null}</div>
            </div>
        );
    }
}

function GraphECG2(props) {
    const [canvas, setCanvas] = React.useState(null);
    React.useEffect(() => {
        if(canvas != null){
            const ctx2 = canvas.getContext("2d");
            drawToECG2(ctx2);
        }
    } , [canvas]);
    return(<canvas width={props.widthProp} height={props.heightProp} ref={setCanvas}/>
    );
}

class PLETH extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(<div className="flex-sm-row d-flex mw=100">
                <div className="text-info-emphasis fw-bold fs-4 d-flex flex-sm-column col-sm-2 text-center">PLETH</div>
                <div className="col-sm-10 h-270 w-900">{this.props.power ? <GraphPLETH widthProp = "800" heightProp = "270"/> : null}</div>
            </div>
        );
    }
}

function GraphPLETH(props) {
    const [canvas, setCanvas] = React.useState(null);
    React.useEffect(() => {
        if(canvas != null){
            const ctx3 = canvas.getContext("2d");
            drawToPleth(ctx3);
        }
    } , [canvas]);
    return(<canvas width={props.widthProp} height={props.heightProp} ref={setCanvas}/>
    );
}

class CAPNO extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(<div className="flex-sm-row d-flex mw-100">
                <div className="text-warning-emphasis fw-bold fs-4 d-flex flex-sm-column col-sm-2 text-center">CAPNO</div>
                <div className="col-sm-10 h-270 w-900">{this.props.power ? <GraphCAPNO widthProp = "800" heightProp = "270"/> : null}</div>
            </div>
        );
    }
}

function GraphCAPNO(props) {
    const [canvas, setCanvas] = React.useState(null);
    React.useEffect(() => {
        if(canvas != null){
            const ctx4 = canvas.getContext("2d");
            drawToCapno(ctx4);
        }
    } , [canvas]);
    return(<canvas width={props.widthProp} height={props.heightProp} ref={setCanvas}/>
    );
}

class SMD extends React.Component{
    constructor(props){
        super(props)
        this.state = {S: 0, M: 0, D: 0, interval: 1, power: 0, buttonText: "START"};
    }
    componentDidMount(){ 
        if(this.state.power === 1){
            this.changeIntervals();
        }        
    }
    componentWillUnmount(){
        this.clearAllIntervals();
    }
    changeIntervals = () => { 
        this.clearAllIntervals();
        this.interval = setInterval(this.S, this.state.interval * 1000)
        this.interval2 = setInterval(this.D, this.state.interval * 1000)
        this.interval3 = setInterval(this.M, this.state.interval * 1000)
    }
    clearAllIntervals = () => {
        clearInterval(this.interval);
        clearInterval(this.interval2);
        clearInterval(this.interval3);
    }
    S = () => {
        if(this.state.power === 1){
            let s = Math.floor(Math.random() * (130 - 115) + 115);
            this.setState({S: s});
        }
    };
    D = () => {
        if(this.state.power === 1){
            let d = Math.floor(Math.random() * (95 - 75) + 75);
            this.setState({D: d});
        }
    };
    M = () => {
        if(this.state.power === 1){
            this.setState((prevState) => ({
                M: Math.round((prevState.S + prevState.D) / 2),
            }));
        }
    };
    handleIntervalChange = (e) => {
        if(this.state.power === 1){
            let newInterval = this.state.interval;
            if (e.target.classList.contains('increment-btn')) {
                newInterval += 1;
                this.setState({ Interval: newInterval}, this.changeIntervals);
            } else if (e.target.classList.contains('decrement-btn')) {
                newInterval = Math.max(1, newInterval - 1);
                this.setState({ Interval: newInterval}, this.changeIntervals);
            } else {
                let value = e.target.value;
                try{
                    let value = parseInt(e.target.value);
                }catch(e){
                    value = 1;
                }
                newInterval = Math.max(1, Math.min(60,value));
                this.setState({ Interval: newInterval}, this.changeIntervals);
            }
            this.setState({ interval: newInterval }, this.changeIntervals);
        }
    };
    componentDidUpdate = (prevProps) => {
        if(prevProps.power != this.props.power){
            if(this.props.power) {
                this.changePowerState;
            }
            else{
                this.setState({power: 0});
                this.setState({interval: 1});
                this.setState({S: 0});
                this.setState({M: 0});
                this.setState({D: 0});
                this.setState({buttonText: "START"});
                this.changeIntervals();
            }
        }
    }
    changePowerState = () => {
        let powerState = this.state.power;
        if(powerState == 0 && this.props.power){
            this.setState({power: 1});
            this.setState({interval: 1});
            this.setState({buttonText: "STOP"});
            this.changeIntervals();
        }
        else if(powerState == 0 && !this.props.power) {
            this.setState({power: 0});
            this.setState({interval: 1});
            this.setState({S: 0});
            this.setState({M: 0});
            this.setState({D: 0});
            this.setState({buttonText: "START"});
            this.changeIntervals();
        }
        else if((powerState == 1 && !this.props.power) || powerState == 1 && this.props.power){
            this.setState({power: 0});
            this.componentWillUnmount;
            this.setState({S: 0});
            this.setState({M: 0});
            this.setState({D: 0});
            this.setState({buttonText: "START"});
        }
       
    }
    render(){
        return(<div className="border-bottom border-light border-3">
            <div className="d-flex flex-sm-col col-12 text-primary fw-bold fs-2 ">
                <div className="col-sm-4">
                    <span className="flex-sm-row d-flex justify-content-center">S</span>
                    <span className="flex-sm-row d-flex justify-content-center">M</span>
                    <span className="flex-sm-row d-flex justify-content-center">D</span>
                </div>
                <div className="col-sm-8">
                    <span className="flex-sm-row d-flex justify-content-center">{this.state.S}</span>
                    <span className="flex-sm-row d-flex justify-content-center">{this.state.M}</span>
                    <span className="flex-sm-row d-flex justify-content-center">{this.state.D}</span>
                    <span className="flex-sm-row d-flex justify-content-center fw-bold fs-4">mmHg</span>
                </div>
            </div>
            <div className="justify-content-center d-flex flex-sm-row text-primary fw-bold fs-4">Auto - {this.state.interval} Sec</div>
            <br></br>
            <div className="justify-content-center d-flex flex-sm-row text-primary fw-bold fs-6">
                <div className="d-flex align-items-center">
                    <button className="interval-btn decrement-btn" onClick={this.handleIntervalChange}>-</button>
                    <input type="number" value={this.state.interval} onChange={this.handleIntervalChange} className="interval-input col-sm-5"/>
                    <button className="interval-btn increment-btn" onClick={this.handleIntervalChange}>+</button>
                </div>
                <button id="interval" onClick={this.changeIntervals} className="interval-btn col-sm-7">
                    Change Measure Time min: 1 max: 60
                </button>
            </div>
            <br></br>
            <button onClick={this.changePowerState} className="power col-sm-12"
                    style={{backgroundColor:this.state.buttonText.includes('START') ? 'green':this.state.buttonText.includes('STOP') ? 'red':'transparent', height:"50px"}}>
                    {this.state.buttonText}
            </button>
            <br></br>
            <br></br>
        </div>
        )
    }
}