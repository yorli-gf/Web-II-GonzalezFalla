function Alumno({ nombre, materias, calificaciones }) {
    const { useState } = React;
    const [visible, setVisible] = useState(true);

    function toggleInfo() {
        setVisible(!visible);
    }

    return (
        <div className="alumno-container">
            <button className="toggle-btn" onClick={toggleInfo}>
                {visible ? "Ocultar" : "Mostrar"} info de {nombre}
            </button>
            {visible && (
                <div className="info">
                    <h3>{nombre}</h3>
                    <ul>
                        {materias.map((materia, index) => (
                            <li key={index}>
                                {materia}: <strong>{calificaciones[index]}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Alumno;
