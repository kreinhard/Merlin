// Later Webpack, Context etc. should be used instead.

global.server = 'http://localhost:8042';
global.restBaseUrl = global.server + '/rest';

export function getRestServiceUrl(restService) {
    return global.restBaseUrl + '/' + restService;
}

export function getResponseHeaderFilename(contentDisposition) {
    var regex = /filename[^;=\n]*=(UTF-8(['"]*))?(.*)/;
    var matches = regex.exec(contentDisposition);
    var filename;
    if (matches != null && matches[3]) {
        filename = matches[3].replace(/['"]/g, '');
    }
    return filename ? decodeURI(filename) : "download";
}