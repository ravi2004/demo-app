class baseApi {
    async fetchData(url, option) {
        return await fetch(process.env.REACT_APP_REST_URL + '/' + url, option)
            .then((res) => {
                return res.json();
            })
    }
}

export default baseApi;

