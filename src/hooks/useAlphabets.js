import { useEffect, useState } from "react";

const useAlphabets = () => {
    const [alphabets, setAlphabets] = useState([]);
    const [loading, setLoading] = useState(true); //To handle loading state
    useEffect(() => {
        const getAlphabets = async () => {
            await fetch("https://drag-and-drop-calculator.herokuapp.com/alphabets")
                .then((response) => response.json())
                .then((data) => {
                    setAlphabets(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
        };
        getAlphabets();
    }, []);
    return [alphabets, loading];
};

export default useAlphabets;
