import { useState } from "react";
import "./App.css";
import useAlphabets from "./hooks/useAlphabets";

function App() {
    const operators = [
        { _id: 100, operator: "+" },
        { _id: 101, operator: "-" },
        { _id: 102, operator: "*" },
        { _id: 103, operator: "/" },
    ];

    const [alphabets] = useAlphabets(); // getting alphabets using custom hook

    // Data about a things id, origin, and destination
    const [dragData, setDragData] = useState({});
    const [droppedData, setDroppedData] = useState([]);

    const [action, setAction] = useState(null);
    const [rsh, setRSH] = useState(null);

    // To handle RSH Integer Input
    const handlerRSH = () => {
        // alert("Allah");
        const rshInteger = window.prompt("What should be the RSH Integer?");
        setRSH(rshInteger);
    };

    // Drag and Drop will not work without this.
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // onDragStart we setDragData.
    // useState instead of e.dataTransfer so we can transfer more data
    const handleDragStart = (e, _id, item, type) => {
        setDragData({ _id, item, type });
    };

    const handleDrop = (e) => {
        const selected = dragData._id;
        const item = dragData.item;
        const data = [...droppedData, dragData];
        setDroppedData(data);
        console.log(selected, item);
    };

    const handleEvaluate = () => {
        alert("Evaluating")
    }

    return (
        <div className="App">
            <div className="alphabets-container">
                {alphabets.map((alphabet) => (
                    <div
                        key={alphabet._id}
                        draggable
                        className="alphabet"
                        onDragStart={(e) =>
                            handleDragStart(
                                e,
                                alphabet._id,
                                alphabet.alphabet,
                                "alphabet"
                            )
                        }
                    >
                        {alphabet.alphabet}
                    </div>
                ))}
            </div>
            {/* operator section  */}
            <div className="operators-container">
                <div className="operators-box">
                    {operators.map((operator) => (
                        <div
                            key={operator._id}
                            draggable
                            onDragStart={(e) =>
                                handleDragStart(
                                    e,
                                    operator._id,
                                    operator.operator,
                                    "operator"
                                )
                            }
                            className="operator"
                        >
                            {operator.operator}
                        </div>
                    ))}
                </div>
                <div className="operators-box">
                    <div onClick={() => setAction("<")} className="operator">
                        {"<"}
                    </div>
                    <div onClick={() => setAction(">")} className="operator">
                        {">"}
                    </div>
                </div>
                <div className="operators-box">
                    <div onClick={handlerRSH} className="operator">
                        RSH Integer
                    </div>
                </div>
            </div>

            {/* Expression container section  */}
            <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e)}
                className="expression-container"
            >
                {droppedData.map((data) => (
                    <div key={data._id} className={`${data.type}`}>
                        {data.item}
                    </div>
                ))}
                {action && <div className={`operator`}>{action}</div>}
                {rsh && <div className={`rsh-integer`}>{rsh}</div>}
            </div>
            <button onClick={handleEvaluate} id="calculate-button">Evaluate Expression</button>
        </div>
    );
}

export default App;
