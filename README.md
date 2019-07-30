# Fluig OAuth API

Uma classe `FluigOAuthAPI` que serve para realizar requisições AJAX de maneira genérica dos serviços disponíveis na plataforma FLUIG.

## Configuração
Para usar a classe e a API de serviços, é necessário criar e configurar um [OAuth provider](http://tdn.totvs.com/display/public/HF/OAuth+provider) e [OAuth Application](http://tdn.totvs.com/display/public/HF/Oauth+application) no Painel de Controle do Fluig.

## Inicie a classe
```javascript
var config = {
	consumerPublic: "SEU_CONSUMER_KEY",
	consumerSecret: "SEU_CONSUMER_SECRET",
	tokenPublic: "USUARIO_APLICATIVO_ACCESS_TOKEN",
	tokenSecret: "USUARIO_APLICATIVO_TOKEN_SECRET",
	url: "HOST[:PORTA]"
}
var FluigOAuthAPI = new FluigOAuthAPI(config);

FluigOAuthAPI.dataset.availableDatasets();  // retorna todos os datasets do servidor
```

## Métodos disponíveis

### Serviços de Dataset
- `dataset.standardDatasetValues(<datasetId>, <filters>)`
- `dataset.availableDatasets()`
- `dataset.datasetStructure(<datasetId>, <filters>)`
- `dataset.get(<nameDataset>, [fields], [constraint], [ordem])`
- `dataset.search(<payload>)`
- `dataset.synchronizeDataset(<datasetId>)`

### Serviços de Documentos
- `document.listDocument(<folderId>)`
