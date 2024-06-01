import React, { useState, useEffect } from 'react';
import './sideBar.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { getPatients } from '../../lib/actions';
import { FaEllipsis } from "react-icons/fa6";

type Prop = {
  setSelectedPatient: React.Dispatch<React.SetStateAction<string>>;
  selectedPatient: any
}

const SideBar: React.FC<Prop> = ({setSelectedPatient, selectedPatient}) => {
    let count = 0; //Counter to assign unique keys to each patient
    const [patientsData, setPatientsData] = useState([]); // State variable to store patient data

    // UseEffect to fetch patients' data on component mount
    useEffect(() => {
        const fetchPatients = async () => {
            const patientsData = await getPatients(); // Fetch patients' data
            setPatientsData(patientsData); // Update state with patients' data
        };

        fetchPatients(); // Call the fetch function
    }, [selectedPatient]); // Ensure this runs once when the components mounts

    // JSX structure for SideBar component
    return (
        <div className='side-bar'>
            <div className='search-div'>
                <h1>Patients</h1>
                <FaMagnifyingGlass size={15} />
            </div>
            <ul className='results-container'>
                {patientsData.map((patient: any) => (
                  <li 
                    key={count++} 
                    className= { 
                      selectedPatient === patient.name? 
                      'selected-patient card-item-container' :  'card-item-container'}
                      onClick={() => setSelectedPatient(patient.name)}
                  > 
                    <div className='card-details'>
                      <img
                        src={patient.profile_picture}
                        alt='patients'
                      />
                      <div className='details-container'>
                        <p className='patients-name'>{patient.name}</p>
                        <div className='additional-details'>
                          <p>{patient.gender}</p>
                          <p>{patient.age}</p>
                        </div>
                      </div>
                    </div>
                    <FaEllipsis size={15}/>
                  </li>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;
