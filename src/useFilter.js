import { useState, useEffect } from 'react';
import { calculateAge } from './util.js'
import get from 'lodash/get'

const useFilter = (value) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://hapi.fhir.org/baseR4/Patient?_pretty=true");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                const entries = get(jsonData, 'entry', []);
                var filteredDataValues = []
                if (entries.length > 0) {
                    setData(entries)
                    filteredDataValues = entries.filter((obj) => {
                        const date = get(obj, 'resource.birthDate', "")
                        var age = 0
                        if (date !== "") {
                            age = calculateAge(date)
                            obj.age = age
                        }
                        return date !== "" && age <= value[1] && age >= value[0]
                    })
                }
                setFilteredData(filteredDataValues)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filteredDataValues = data.filter((obj) => {
            const age = get(obj, 'age', "")
            return age !== "" && age <= value[1] && age >= value[0]
        })
        setFilteredData(filteredDataValues)
    }, [...value]);

    return { filteredData, loading, error }
}

export default useFilter;