import axios from "axios";

const useFetch = () => {
    const getData = async ({
        url = "",
        type = "get",
        data = "",
        fullUrl = false,
    }) => {
        try {
            const response = await axios[type](
                !fullUrl ? `https://swapi.dev/api/${url}` : url,
                data
            );
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    };
    return { getData };
};

export default useFetch;
