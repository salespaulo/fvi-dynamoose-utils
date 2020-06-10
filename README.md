# fvi-dynamoose-utils

-   `npm run compile`: Executa a limpeza dos arquivos e diretorios.
-   `npm run debug-test`: Executa os testes unitários com o DEBUG ativo.
-   `npm run test`: Executa os testes unitários.
-   `npm run debug-dev`: Executa os testes unitários e espera por alterações com o DEBUG ativo.
-   `npm run dev`: Executa os testes unitários e espera por alterçãoes.
-   `npm run prod`: Executa o código com NODE_ENV=production.
-   `npm run coverage`: Executa os testes unitários e retorna a cobertura dos códigos através do [nyc](https://github.com/istanbuljs/nyc/)
-   `npm run release`: Inicia uma nova release de versão incrementando o **patch**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:minor`: Inicia uma nova release de versão incrementando o **minor**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:major`: Inicia uma nova release de versão incrementando o **major**, [git flow](https://github.com/nvie/gitflow/) release start.
-   `npm run release:finish`: Finaliza a release, ou seja, realiza o [git flow](https://github.com/nvie/gitflow/) release finish.

## FVI - Dynamoose Utilities

Projeto que disponibiliza uma biblioteca utilitária na criação de _schemas_ e outras funcionalidades na biblioteca [dynamoose](https://github.com/dynamoosejs/dynamoose) ou [fvi-dynamoose-repository](https://console.aws.amazon.com/codesuite/codecommit/repositories/fvi-dynamoose-repository/browse?region=us-east-1).

### Utilities

Ferramentas utilitárias para realizarmos consultas no DynamoDB ou criar um Schema no Dynamoose.

```javascript
const {
    toDbLastKey,
    toLastKey,
    all,
    optionalObject,
    requiredObject,
    requiredInt,
    optionalInt,
    requiredString,
    optionalString,
    requiredEnumString,
    optionalEnumString,
    requiredArrayString,
    optionalArrayString,
    hashKeyString,
    rangeKeyString,
    globalIndexString,
} = require('fvi-dynamoose-repository/app/utils')
```

-   **.toDbLastKey(obj: Object)**: Recebe um _Object_ javascript padrão e retorna um _Object_ no formato dynamoose, ou DynamoDB que representa uma _lastKey_ para ser enviada na próxima requisição de uma listagem paginada.
-   **.toLastKey**: Recebe um _Object_ no formato DynamoDB e retorna um _Object_ javascript padrão.
-   **.all(model, start, limit)**: Realiza um _Model.scan_ com o _model_ passado configurando a consulta para repeitar o parêmetro _start_ que é a última chave recebida da última consulta realizada da paginação.
-   **.hashKeyString()**: Retorna um _Object_ com as propriedades necessárias para a criação de um campo no modelo que seja a _Dynamo.HashKey_.
-   **.rangeKeyString()**: Retorna um _Object_ com as propriedades necessárias para a criação de um campo no modelo que seja a _Dynamo.RangeKey_.
-   **.globalIndexString(name, rangeKey, project, throughput)**: Retorna um _Object_ com as propriedades necessárias para a criação de um campo no modelo que seja a _Dynamo.GlobalIndexKey_.
-   **.required...(defaultValue)**: Retorna um _Object_ com as propriedades necessárias para a criação de um campo obrigatório do tipo `...` com um valor _default_, caso seja passado um valor como parâmetro.
-   **.optional...(defaultValue)**: Retorna um _Object_ com as propriedades necessárias para a criação de um campo não obrigatório do tipo `...` com um valor _default_, caso seja passado um valor como parâmetro. Esta opção deve ser considerada, já que para campos no Schema opicionais no DynamoDB não precisamos informar nada, _schemaless_.
-   **.requiredEnumString**: Retorna um _Object_ com as propriedades necessárias para a criação de um campo obrigatório do tipo _Dynamoose.Enum_.
-   **.optionalEnumString**: Retorna um _Object_ com as propriedades necessárias para a criação de um campo não obrigatório do tipo _Dynamoose.Enum_.
