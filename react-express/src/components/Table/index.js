import React from 'react';
import './style.css'

function Table({data}) {

    return (
        <section>
            <table className="custom-table">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Situação</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                    <td>{item.nome}</td>
                    <td>{item.situacao}</td>
                    <td>{item.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}

export default Table;