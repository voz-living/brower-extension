function _http(method, url, data, _ref={}) {
    return new Promise(function(resolve, reject) {
        var ajaxObject = {
            method: method,
            url: url,
        }
        if(method !== 'GET'){
            ajaxObject.data = JSON.stringify(data);
        }
        _ref.jqXHR = $.ajax(ajaxObject).done(function(data) {
            resolve(data)
        }).fail(function(jx, status, error) {
            reject({
                status: status,
                statusCode: jx.status,
                error: jx.responseJSON
            })
        })
    });
}

async function POST     (url, data, _ref) { return _http('POST'   , url, data, _ref)};
async function GET      (url, _ref)       { return _http('GET'    , url, {}, _ref)};
async function PUT      (url, data, _ref) { return _http('PUT'    , url, data, _ref)};
async function DELETE   (url, data, _ref) { return _http('DELETE' , url, _ref)};

var http = {
    post: POST,
    delete: DELETE,
    put: PUT,
    get: GET
}

export default http;
export var POST;
export var GET;
export var DELETE;
export var PUT;
