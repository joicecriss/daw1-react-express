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