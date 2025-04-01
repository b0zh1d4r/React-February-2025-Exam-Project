async function requester (method, url, data){
    // Създаване на обект с настройки за заявката
    const options = {
        method,
        credentials: 'include', // Включва бисквитките в заявката
        headers: {}
    };

    // Ако има предоставени данни, добавяме Content-Type и ги прикачаме към тялото на заявката
    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    // Изпращане на заявката с fetch
    const response = await fetch(url, options);
    
    if (response.status === 204){
        return;
    }

    const result = await response.json();
    
    if (!response.ok){
        throw result;
    }

    return result;
}

// Създаване на shorthand методи за улеснение
requester.get = (url) => requester('GET', url);
requester.post = (url, data) => requester('POST', url, data);
requester.put = (url, data) => requester('PUT', url, data);
requester.delete = (url) => requester('DELETE', url);

export default requester;
