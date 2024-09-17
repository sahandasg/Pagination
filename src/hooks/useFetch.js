import {useEffect, useState} from 'react';
import {BaseConfig} from "../config";
import axios from "axios";

function useFetch(method = "GET", url = "", param = "") {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            const instance = axios.create({
                baseURL: BaseConfig.domain,
                method: method,
            });
            await instance(url + param)
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    setError(err)
                }).finally(() => setLoading(false));
        }

        fetchData();

    }, [method, url, param])
    return {data, loading, error};
}

export default useFetch;