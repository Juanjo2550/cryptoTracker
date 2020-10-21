class Http {
    static instance = new Http();
    get = async (url) => {
        try {
            const req = await fetch(url);
            return await req.json();
        } catch (err) {
            console.error(err);
            throw new Error(err);
        }
    };

    post = async (url, body) => {
        try {
            const req = await fetch(url, {
                method: 'POST',
                body,
            });
            return await req.json();
        } catch (err) {
            console.error(err);
            throw new Error(err);
        }
    };
}

export default Http;
