function FluigOAuthAPI(config) {
    /**
     * Parâmetro construtor da classe FluigOAuthAPI
     * 
     * @param config: [Objeto]
     *  this.config.consumerPublic: [String]
     *  this.config.consumerSecret: [String]
     *  this.config.tokenPublic: [String]
     *  this.config.tokenSecret: [String]
     *  this.config._url: [String]
     *  this.config.forceRefresh: [Boolean]
     */
    
    this.consumerPublic = config.consumerPublic || "",
    this.consumerSecret = config.consumerSecret || "",
    this.tokenPublic = config.tokenPublic || "",
    this.tokenSecret = config.tokenSecret || "",
    this._url = config.url || "",
    this.forceRefresh = config.forceRefresh || false,

    // DatasetServiceRest
    this.dataset = {
        standardDatasetValues: function(datasetId, filters) {
            /**
             * @param datasetId [String]: Identificador do dataset
             * @param filters [Objeto]: Coleção de filtros no formato {
             *      chaveCampo1: valorCampo1, 
             *      ..., 
             *      chaveCampoN: valorCampoN
             * }
             * 
             * Exemplo de uso: FLUIGOAuthAPI.standardDatasetValues("colleague", {adminUser:true});
             * ---
             */
            var APIData = {
                url: '/api/public/ecm/dataset/standardDatasetValues',
                method: 'POST',
                content: {
                    "datasetId": datasetId,
                    "filter": filters
                }
            }

            return restAPICall(APIData);
        },
        
        availableDatasets: function() {
            var APIData = {
                url: '/api/public/ecm/dataset/availableDatasets',
                method: 'GET'
            }
            
            // Faz chamada AJAX configurada
            return restAPICall(APIData);
        },

        datasetStructure: function(datasetId) {
            var APIData = {
                url: '/api/public/ecm/dataset/datasetStructure/' + datasetId,
                method: 'GET'
            }
            
            // Faz chamada AJAX configurada
            return restAPICall(APIData);
        },

        get: function(nameDataset,fields = null, constraint = null, ordem = null){
            var content = {
                constraints: constraint,
                fields: fields,
                name: nameDataset,
                order: ordem
            }
            var APIData = {
                url: '/api/public/ecm/dataset/datasets/',
                method: 'POST',
                content: content
            }

            return restAPICall(APIData);
        },

        search: function(payload) {
            var content = {
                datasetId: payload.datasetId,
                searchField: payload.searchField,
                searchValue: payload.searchValue,
                filterFields: payload.filterFields,
                resultFields: payload.resultFields,
                likeField: payload.likeField,
                likeValue: payload.likeValue,
                limit: payload.limit || 0,
                orderBy: payload.orderBy
            }
            var APIData = {
                url: '/api/public/ecm/dataset/search/',
                method: 'POST',
                content: content
            }
            
            // Faz chamada AJAX configurada
            return restAPICall(APIData);
        },

        synchronizeDataset(datasetId) {
            var APIData = {
                url: '/api/public/ecm/dataset/search/',
                method: 'POST',
                content: {
                    datasetId: datasetId
                }
            }
            
            // Faz chamada AJAX configurada
            return restAPICall(APIData);
        }
    },

    // DocumentServiceRest
    this.document = {
        listDocument: function(folderId) {
            var APIData = {
                url: '/api/public/ecm/document/listDocument/' + folderId,
                method: 'GET'
            }

            return restAPICall(APIData);
        }
    },

    // Funções abstratas para requisições AJAX
    getOAuthConfig = function() {
        // Instancia a classe para acessar propriedades e métodos de parentes (Javascript 5.1 fix)
        this.FluigOAuthAPI(config);

        // Limpa os cookies da sessão
        if(this.forceRefresh) {
            this.removeCookies();
        }

        // Ajusta propriedades do Header Authorization do OAuth
        var oauth = OAuth({
            consumer: {
                'public': this.consumerPublic, 
                'secret': this.consumerSecret
            },
            signature_method: 'HMAC-SHA1',
            parameter_seperator: ",",
            nonce_length: 6
        }); 

        var token = {
            'public': this.tokenPublic,
            'secret': this.tokenSecret
        };

        // Retorna Header OAuth formatado
        return {
            oauth: oauth,
            token: token,
            url: this._url
        }
    },
    
    restAPICall = function(APICall) {
        // Configura a requisição com os dados passados durante a construção da classe
        var request = this.getOAuthConfig();        
        var requestData = {
            url: request.url + APICall.url, 
            method: APICall.method,
            content: APICall.method == "POST" ? APICall.content : ''                  
        };

        // Configura headers da requisição com autenticação
        var auth = request.oauth.toHeader(request.oauth.authorize(requestData, request.token));
        var header = {
            'Access-Control-Allow-Origin'   : '*',
            'Access-Control-Allow-Methods'  : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers'  : 'Origin, Content-Type, X-Auth-Token',
            Authorization: auth.Authorization
        }

        // Ajusta payload da requisição de acordo com o método escolhido
        var requestBody = (APICall.method == "POST") ? JSON.stringify(APICall.content) : requestData.ajaxData;
        var response = '';

        // Realiza, de fato, a requisição
        $.ajax({
            url: requestData.url,
            type: requestData.method,
            async: false,
            data: requestBody,
            contentType: "application/json",
            headers: header
        })
        .done(function(data) {       
            response = data.content;
        })
        .fail(function(err) {
            console.log(err);
        });

        return response;
    },

    removeCookies = function () {
        document.cookie = "JSESSIONID=;EXPIRES=-1;" + "; path=/";
        document.cookie = "JSESSIONIDSSO=;EXPIRES=-1;" + "; path=/";
        document.cookie = "JSESSIONID=;EXPIRES=-1;" + "; path=/hiring";
        document.cookie = "JSESSIONID=;EXPIRES=-1;" + "; path=/style-guide";
    }

    return this;
}