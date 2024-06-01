// username and password for basic authentication
let username = "coalition";
let password = "skills-test";

// Encode the username and password using Base64 encoding
let auth = btoa(`${username}:${password}`);

/**
 * Fetches the list of patients from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of patient data.
 */
export const getPatients = async () => {
    try {
        const response = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error!: ${response.status}`);
        }

        const results = await response.json();
        return results;
    } catch (e) {
        console.error(e);
    }
};

/**
 * Fetches the details of a specific patient by name.
 * @param {string} pName - The name of the patient to fetch.
 * @returns {Promise<Object>} A promise that resolves to the matched patient's data.
 */
export const getPatient = async (pName: string) => {
    try{
        const results = await getPatients();
        const matchedPatient = results.find((result: any) => {
            const matchedName = result.name
            const searchedName = pName
            return searchedName === matchedName
        })
        if (matchedPatient){
            return matchedPatient
        }
    } catch (e) {
        console.error(e)
    }
}

/**
 * Fetches the diagnosis data for a specific patient and date.
 * @param {string} pName - The name of the patient.
 * @param {string} date - The date of the diagnosis to fetch.
 * @returns {Promise<Object>} A promise that resolves to the diagnosis data for the specified date.
 */
export const getDiagnosisForSelectedDate = async (pName: string, date: string) => {
    try{
        const result = await getPatient(pName);
        const matchedDiagnosis = result.diagnosis_history.find((diagnosis:any) => {
                const month = diagnosis.month.substring(0,3);
                const year = diagnosis.year;
                const dateValue = date;
                return `${month} ${year}`=== dateValue 
        })
        if (matchedDiagnosis){
            const neededData = {
            heart_rate: matchedDiagnosis.heart_rate.value, 
            heart_level: matchedDiagnosis.heart_rate.levels,
            temperature: matchedDiagnosis.temperature.value,
            temperature_level: matchedDiagnosis.temperature.levels,
            respiratory_rate: matchedDiagnosis.respiratory_rate.value,
            respiratory_level: matchedDiagnosis.respiratory_rate.levels,
            diastolic: matchedDiagnosis.blood_pressure.diastolic.value,  
            diastolic_level:matchedDiagnosis.blood_pressure.diastolic.levels,
            systolic: matchedDiagnosis.blood_pressure.systolic.value,
            systolic_level: matchedDiagnosis.blood_pressure.diastolic.levels    
            }
            return (neededData)
        }
    } catch (e) {
        console.error(e)
    }

}
