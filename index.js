const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<MyApp />)
function MyApp(){
    return(
    <div className="screen">
        <Header/>
        <Temperature/>
    </div>)
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