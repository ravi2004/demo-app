class baseApi {
    async fetchData(url:any, option:any) {
        const baseUrl=(process.env.REACT_APP_REST_URL||"/api");
        console.log(baseUrl, url);
        return await fetch((baseUrl + '/' + url), option)
            .then((res) => {
                return res.json();
            })
    }
}

export default baseApi;

