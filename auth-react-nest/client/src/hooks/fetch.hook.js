import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from '../helper/helper'

//axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
axios.defaults.baseURL = 'http://localhost:3000'

/** custom hook */
export default function useFetch(query){
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true}));

                const { userId } = !query ? await getUsername() : '';
                
                const { data, status } = !query ? await axios.get(`/api/auth/user/${userId}`) : await axios.get(`/api/auth${query}`);
                console.log(data);
                console.log(status);

                if(status === 201){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }
                if(status === 200){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }

                setData(prev => ({ ...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}