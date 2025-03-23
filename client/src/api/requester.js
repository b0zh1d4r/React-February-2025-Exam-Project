async function requester (method, url, data){

    const options = {
        method,
        credentials: 'include', 
        headers: {}
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    if (response.status === 204){
        return
    } 

    const result = await response.json();
    if (!response.ok){
        throw result;
    }

    return result;
}

requester.get = (url) => requester('GET', url);
requester.post = (url, data) => requester('POST', url, data);
requester.put = (url, data) => requester('PUT', url, data);
requester.delete = (url) => requester('DELETE', url);

export default requester;