# Como criar a funcionalidade Listar Chaves Disponíveis

## BackEnd


## FrontEnd
### 1 - Dentro da pasta /src crie duas pastas chamadas /components e /pages
### 2 - Dentro da pasta /pages crie o arquivo ListKeys.js
    - Aqui será a página de visualização, vamos criar o component table que terá a tabela.
### 3 - Dentro da pasta /components crie uma pasta chamada /table
    - Dentro da pasta /table crie os arquivos index.js e style.css
    
    - Dentro do arquivo index.js coloque o seguinte código:
```
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
```
    - Dentro do arquivo style.css coloque o seguinte código:
```
    .table-container {
        margin: 20px;
    }
    
    .custom-table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #ddd;
    }

    .custom-table th, .custom-table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    .custom-table th {
        background-color: #f2f2f2;
    }

    .custom-table tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    .custom-table tr:hover {
        background-color: #ddd;
    }
```
### 4 - Dentro da pasta /pages abra o arquivo ListKeys.js e coloque o seguinte código:

```
import Table from '../components/Table/index'

function ListPage(){

    const data = [
        { nome: 'Sala 101', situacao: 'Disponível', status: 'Ativo' },
        { nome: 'Sala 102', situacao: 'Disponível', status: 'Ativo' },
        { nome: 'Sala 103', situacao: 'Disponível', status: 'Ativo' },
      ];

    return(
        <section>
            <h1>Listagem de Chaves Disponíveis</h1>
            <Table data={data}/>
        </section>
        
    );
}

export default ListPage;
```

### 5 - Abra o arquivo index.css que está dentro da pasta /src
        - Dentro da tag body{} coloque a seguinte linha:
`padding: 5vh;`