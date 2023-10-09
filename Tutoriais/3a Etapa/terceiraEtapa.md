### Chave
```
class Chave {
  constructor(id, nome, situacao, status) {
    this.id = id;
    this.nome = nome;
    this.situacao = situacao;
    this.status = status;
  }
}
```

### Servidor
```
class Servidor {
  constructor(id, nome, cpf, contato, nascimento, status) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.contato = contato;
    this.nascimento = nascimento;
    this.status = status;
  }
}
```

### Emprestimo
```
class Emprestimo {
  constructor(id, dataHoraEmprestimo, datHoraDevoluvao, status) {
    this.id = id;
    this.dataHoraEmprestimo = dataHoraEmprestimo;
    this.datHoraDevoluvao = datHoraDevoluvao;
    this.status = status;
  }
}
```

### Atribuindo objetos Chave e Servidor
```
Emprestimo.Chave = Chave;
Emprestimo.servidorDevolveu = Servidor;
Emprestimo.servidorRetirou = Servidor;
```