import { useState } from "react";
import "./App.css";
import useAlphabets from "./hooks/useAlphabets";

function App() {
    const operators = [
        { _id: 100, operator: "+", value: "+" },
        { _id: 101, operator: "-", value: "-" },
        { _id: 102, operator: "*", value: "*" },
        { _id: 103, operator: "/", value: "/" },
    ];

    const [alphabets] = useAlphabets(); // getting alphabets using custom hook

    // Data about a things id, origin, and destination
    const [dragData, setDragData] = useState({});
    const [droppedData, setDroppedData] = useState([]);

    const [action, setAction] = useState(null);
    const [rsh, setRSH] = useState(null);

    // To handle RSH Integer Input
    const handlerRSH = () => {
        const rshInteger = window.prompt("What should be the RSH Integer?");
        setRSH(rshInteger);
    };

    // Drag and Drop will not work without this (Preventing default behavior).
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // onDragStart we setDragData and get the current drag data.
    // useState instead of e.dataTransfer so we can transfer more data
    const handleDragStart = (e, item, value, type) => {
        setDragData({ id: droppedData.length + 1, item, value, type });
    };

    //Inserting Items to droppedData based on onDrop event
    const handleDrop = (e) => {
        const data = [...droppedData, dragData];
        setDroppedData(data);
    };

    //To Remove Dropped item
    const removeDroppedItemHandler = (itemId) => {
        const remainingDroppedItems = droppedData.filter((data) => data.id !== itemId);
        setDroppedData(remainingDroppedItems);
    };

    //To handle expression evaluation
    const handleEvaluate = () => {
        const rowData = droppedData.map((data) => data.value);
        rowData.push(action);
        rowData.push(rsh);
        const expression = rowData.join(" ");
        console.log(expression);
        try {
            // eslint-disable-next-line
            const result = eval(expression);
            console.log(result);
            alert(result);
        } catch (error) {
            alert("This is not a valid equation");
        }
    };

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
                                // alphabet._id,
                                alphabet.alphabet,
                                alphabet.value,
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
                                    // operator._id,
                                    operator.operator,
                                    operator.value,
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
                    <div key={data.id} className={`item ${data.type}`}>
                        {data.item}
                        <button
                            onClick={() => removeDroppedItemHandler(data.id)}
                            className="btn-delete"
                        >
                            X
                        </button>
                    </div>
                ))}
                {action && (
                    <div className={`item operator`}>
                        {action}
                        <button onClick={() => setAction(null)} className="btn-delete">
                            X
                        </button>
                    </div>
                )}
                {rsh && (
                    <div className={`item rsh-integer`}>
                        {rsh}
                        <button onClick={() => setRSH(null)} className="btn-delete">
                            X
                        </button>
                    </div>
                )}
            </div>
            <button onClick={handleEvaluate} id="calculate-button">
                Evaluate Expression
            </button>
        </div>
    );
}

export default App;
