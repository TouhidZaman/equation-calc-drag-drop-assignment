import "./App.css";
import useAlphabets from "./hooks/useAlphabets";

function App() {
    const [alphabets] = useAlphabets(); // getting alphabets using custom hook
    return (
        <div className="App">
            <div className="alphabets-container">
                {alphabets.map((alphabet) => (
                    <div key={alphabet._id} draggable className="alphabet">
                        {alphabet.alphabet}
                    </div>
                ))}
            </div>
            <div className="operators-container">
                <div className="operators-box">
                    <div className="operator">+</div>
                    <div className="operator">-</div>
                    <div className="operator">*</div>
                    <div className="operator">/</div>
                </div>
                <div className="operators-box">
                    <div className="operator">{"<"}</div>
                    <div className="operator">{">"}</div>
                </div>
                <div className="operators-box">
                    <div className="operator">RSH Integer</div>
                </div>
            </div>
            <div className="expression-container"></div>
            <button id="calculate-button">Evaluate Expression</button>
        </div>
    );
}

export default App;
