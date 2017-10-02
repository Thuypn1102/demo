const fetchData = async (URL_API, body) => {
    console.log(URL_API)
    try {
        let response = await fetch(URL_API, {
            method: 'POST',
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        )
        let responseJson = await response.json();
        return responseJson;
    } catch (e) {
        console.error(e)
    }
}
export default fetchData;

