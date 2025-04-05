import { useState } from 'react';

export default function Calculadora(){
    const [numero_1, setNumero_1] = useState(0);
    const [numero_2, setNumero_2] = useState(0);
    const [total, setTotal] = useState(0);
    const [operador, setOperador] = useState("");

    function sumar () {
        const total_suma = numero_1 + numero_2;
        setTotal(total_suma);
    }

    function restar (){
        const total_resta = numero_1 - numero_2;
        setTotal(total_resta);
    }

    return (
        <div>
            <h2>Total {total} </h2>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div>0</div>
            <div>+</div>
            <div>-</div>
            <div>=</div>
        </div>
    )
}