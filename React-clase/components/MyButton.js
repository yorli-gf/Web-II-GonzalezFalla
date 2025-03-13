function MyButton ({titulo, onClick, contador, setContador}) {
    
    function sumar (params) {
        setContador(contador + 1);
    }
    return (
        <button onClick={sumar}>{titulo}</button>
    )
}

window.MyButton = MyButton;