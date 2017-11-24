export default function(json) {
    if (json.code !== 0) {
        var err = new Error('code is not zero but ' + json.code + ':' + json.message);
        err.response = json;
        throw err;
    }

    return json.result;
}