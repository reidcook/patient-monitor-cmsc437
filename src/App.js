import { drawToCanvas} from './Component.js';

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
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<monitor />);