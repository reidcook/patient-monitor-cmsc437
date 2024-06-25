const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<MyApp />)
function MyApp(){
    return(
        <div class="container-sm d-flex flex-column h-100 border border-info-subtle border-5">
            <div class="row flex-grow-1 border-bottom border-light border-3">
                <div class="col-sm-3 h-100 border-end border-light border-3">
                    <div class="row h-25 border-bottom border-light border-3">Temperature</div>
                    <div class="row flex-grow-1">SMD</div>
                </div>
                <div class="col-sm-9 h-100">
                    <div class="row h-25 border-bottom border-light border-3">ECG 1</div>
                    <div class="row h-25 border-bottom border-light border-3">ECG 2</div>
                    <div class="row h-25 border-bottom border-light border-3">PLETH</div>
                    <div class="row h-25">CAPNO</div>
                </div>
            </div>
            <div class="row h-10">Information Bar</div>
        </div>
    )
}

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {time:0}
    };
    componentDidMount(){
        var handle = setInterval(frame, 1);
        var elem = document.getElementById("time")
        function frame(){
            elem.textContent = new Date().toLocaleTimeString()
        }
    }
    componentWillUnmount(){
        clearInterval(handle)
    }
    render(){
        return(
            <div className="header">
                <div id="time">
                    sedfgdsgf
                </div>
                <span className="spacer"></span>
                <div className="user">
                    Current User
                </div>
            </div>
        )
    }
}

class Temperature extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){}
    componentWillUnmount(){}
    render(){
        return(
            <div className="container-fluid">
                <div className="row quarter-height">
                    <div className="col-4 px-0 component">
                        Temperature
                    </div>
                    <div className="col-8 px-0 component">
                        ECG1
                    </div>
                </div>
                <div className="row three-quarter-height">
                    <div className="col-4 px-0 component">
                            SMD
                    </div>
                    <div className="col-8 px-0 component">
                        <div className="third-height">
                            ECG2
                        </div>
                        <div className="third-height">
                            PLETH
                        </div>
                        <div className="third-height">
                            CAPNO
                        </div>
                    </div>
                </div>
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