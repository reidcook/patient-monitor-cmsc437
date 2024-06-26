const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<MyApp />)
function MyApp(){
    var [users, setUsers] = React.useState({name: "Joe Shmo", age: "25", drugs: "Motrin", incident: "fell off bike"}); // will hold all users
    var [user, setUser] = React.useState({name: "Joe Shmo", age: "25", drugs: "Motrin", incident: "fell off bike"}); // will hold current user
    var [screen, setScreen] = React.useState("Dashboard"); // will hold current screen
    const changeScreen = (newScreen) => {
        setScreen(newScreen)
    }
    if(screen === "Dashboard"){
        return(
            <div style={{backgroundColor: "#212120"}} className="container-sm d-flex flex-column h-100 border border-info-subtle border-5">
                <div className="row flex-grow-1 border-bottom border-light border-3">
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
                <div className="row h-10"><Footer currentUser={user} setScreenProp={changeScreen} setUserProp={setUser}/></div>
            </div>
        )
    }
    else if(screen === "Details"){
        return(
            <div>
                df
            </div>
        )
    }
    else if(screen === "Select"){
        return(
            <div>
                fdgjshn
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
        console.log(props)
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