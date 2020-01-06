function FluigOAuthAPI(config) {
    /**
     * Parâmetro construtor da classe DsOAuth
     * 
     * @param config: [Objeto]
     *  this.config.consumerPublic: [String] = "GET";
     *  this.config.consumerSecret: [String]= "GET";
     *  this.config.tokenPublic: [String] = "3be98caa-edfb-4f34-bcb4-27944544e6bb";
     *  this.config.tokenSecret: [String] = "7a95f0ae-270f-4ceb-ab3c-41934eec81232b1e9f42-34d7-428e-9ab4-6da386ba528f";
     *  this.config._url: [String] = "http://fluighml.totvsrs.com.br:8080";
     *  this.config.forceRefresh: [Boolean]
     */
    
    this.consumerPublic = config.consumerPublic || "",
    this.consumerSecret = config.consumerSecret || "",
    this.tokenPublic = config.tokenPublic || "",
    this.tokenSecret = config.tokenSecret || "",
    this._url = config.url || "",
    this.forceRefresh = config.forceRefresh || false,
	
	// WorkflowServiceRest (V2 API)
	this.workflow = {
    	startProcess: function(cardData, processId) {

            var data = {
	    		  "targetState": cardData.targetState,
	    		  "comment": cardData.comment,
	    		  "formFields": cardData.formFields
            }
        
            var APIData = {
                url: '/process-management/api/v2/processes/'+processId+'/start',
                method: 'POST',
                Accept: 'text/html',
                content: data
            }

            return restAPICall(APIData);
    	}
    },

    // CardServiceRest
    this.card = {
        create: function(cardData) {
            var version = cardData.version || 1000;

            var data = {
                "parentDocumentId": cardData.documentId,
                "version": version,        
                "formData": cardData.formData
            }
        
            var APIData = {
                url: '/api/public/2.0/cards/create',
                method: 'POST',
                Accept: 'text/html',
                content: data
            }

            return restAPICall(APIData);
        }
    },

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
        activeDocument: function(documentId) {
            var APIData = {
                url: '/api/public/ecm/document/activedocument/' + documentId,
                method: 'GET'
            }

            return restAPICall(APIData);
        }, 
        
        allDocumentsHits: function(documentId) {
            var APIData = {
                url: '/api/public/ecm/document/allDocumentsHits/' + documentId,
                method: 'GET'
            }

            return restAPICall(APIData);
        },
        
        chunkedUploadURL: function() {
            var APIData = {
                url: '/api/public/ecm/document/chunkedUploadURL/',
                method: 'GET'
            }

            return restAPICall(APIData);
        },    

        createDocument: function(description, parentId, attachments) {
            var APIData = {
                url: '/api/public/ecm/document/createDocument/',
                method: 'POST',
                content: {
                    description: description,
                    parentId: parentId,
                    attachments: attachments
                }
            }

            return restAPICall(APIData);
        },

        createFolder: function(description, parentId) {
            var APIData = {
                url: '/api/public/ecm/document/createFolder/',
                method: 'POST',
                content: {
                    description: description,
                    parentId: parentId
                }
            }

            return restAPICall(APIData);
        },
        
        documentHitsByVersion: function(documentId, version) {
            var APIData = {
                url: '/api/public/ecm/document/documentHitsByVersion/' + documentId + "/" + version,
                method: 'GET'
            }

            return restAPICall(APIData);
        },

        documentFileThumbnail: function(documentId, version, thumbnail) {
            var APIData = {
                url: '/api/public/ecm/document/documentFileThumbnail/' + documentId + "/" + version + "/" + thumbnail,
                method: 'GET'
            }

            return restAPICall(APIData);
        },

        documentFileWithoutZip: function(documentId, version) {
            var APIData = {
                url: '/api/public/ecm/document/documentFileWithoutZip/' + documentId + "/" + version,
                method: 'GET'
            }

            return restAPICall(APIData);
        },

        downloadURL: function(documentId) {
            var APIData = {
                url: '/api/public/ecm/document/downloadURL/' + documentId,
                method: 'GET'
            }

            return restAPICall(APIData);
        },    

        get: function(documentId, version) {
            var APIData = {
                url: '/api/public/ecm/document/' + documentId + "/" + version,
                method: 'GET'
            }

            return restAPICall(APIData);
        },

        getDocumentByDatasetName: function(datasetName) {
            var APIData = {
                url: '/api/public/ecm/document/getDocumentByDatasetName/' + datasetName,
                method: 'GET'
            }

            return restAPICall(APIData);
        },

        getLastVersionNonDraft: function(documentId) {
            var APIData = {
                url: '/api/public/ecm/document/getLastVersionNonDraft/' + documentId,
                method: 'GET'
            }

            return restAPICall(APIData);
        },


        lastDocument: function(documentId) {
            var APIData = {
                url: '/api/public/ecm/document/lastDocument/' + documentId,
                method: 'GET'
            }

            return restAPICall(APIData);
        },
        
        listDocument: function(documentId) {
            var APIData = {
                url: '/api/public/ecm/document/listDocument/' + documentId,
                method: 'GET'
            }

            return restAPICall(APIData);
        },

        listDocumentWithChildren: function(documentId) {
            var APIData = {
                url: '/api/public/ecm/document/listDocumentWithChildren/' + documentId,
                method: 'GET'
            }

            return restAPICall(APIData);
        },

        maxUploadSize: function(unity) {
            var APIData = {
                url: '/api/public/ecm/document/maxUploadSize/',
                method: 'GET'
            }

            var response = restAPICall(APIData);
            if(unity === undefined) {
                return response;
            }
            else {
                switch(unity.toLowerCase()) {
                    default:
                    case 'b':   return response;
                    case 'kb':  return (response / 1024);
                    case 'mb':  return (response / 1024 / 1024);
                    case 'gb':  return (response / 1024 / 1024 / 1024);
                }
            }
        },

        permissions: function(documentIdList) {
            var APIData = {
                url: '/api/public/ecm/document/permissions/',
                method: 'POST',
                content: documentIdList
            }

            return restAPICall(APIData);
        },

        remove: function(documentId) {
            var APIData = {
                url: '/api/public/ecm/document/remove/',
                method: 'POST',
                content: {
                    id: documentId
                }
            }

            return (restAPICall(APIData) == "OK");
        },

        updateDescription: function(id, description) {
            var APIData = {
                url: '/api/public/ecm/document/updateDescription/',
                method: 'POST',
                content: {
                    id: id,
                    description: description
                }
            }

            return restAPICall(APIData);
        },

        updateDocumentFolder: function(documentId, newParentId) {
            var APIData = {
                url: '/api/public/ecm/document/updateDocumentFolder/',
                method: 'POST',
                content: {
                    id: documentId,
                    parentId: newParentId
                }
            }

            return restAPICall(APIData);
        },

        uploadURL: function() {
            var APIData = {
                url: '/api/public/ecm/document/uploadURL/',
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