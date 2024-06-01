import { useEffect, useState } from 'react'
import { getPatient } from '../../lib/actions';
import { 
    FaCalendar,
    FaShield,
    FaPhone,
    FaMarsStrokeUp,
    FaDownload
  } from 'react-icons/fa6';
import './sideBarInfo.css'

type Props = {
  name: string
}

const SideBarInfo = (paraName: Props) => {
  const [patient, setPatient] = useState<any>([]) // State variable to store patient data
  const  [labResults, setLabResults]  = useState<any>([]) // State variable to store lab results
  const { name } = paraName // Destructure the name from props
  let itemKey = 1; // Counter to assign unique keys to each lab result item

   // useEffect to fetch patient data on component mount or when the name prop changes
  useEffect(() => {
    const fetchPatient = async (pName: string) => {
      const result = await getPatient(pName);  // Fetch patient data
      setPatient(result); // Update state with fetched patient data
      setLabResults(result.lab_results); // Update state with fetched lab results

    }

    fetchPatient(name); // Call the fetch function with the patient name
  }, [name])

  // JSX structure for the SideBarInfo component
  return (
    <div className='side-bar-cont'>
      <div className='patient-info-ontainer'>
        <div className='image-container'>
          <img
              src={patient.profile_picture}
              alt='profile'
          />
          <h1>{patient.name}</h1>
        </div>
        <div className='pInfo'>
          <div className='icon-wrapper'>
              <FaCalendar size={30} />
          </div>
          <div>
              <p>Date of Birth</p>
              <p>{patient.date_of_birth}</p>
          </div>
        </div>
        <div className='pInfo'>
          <div className='icon-wrapper'>
              <FaMarsStrokeUp size={30} />
          </div>
          <div>
              <p>Gender</p>
              <p>{patient.gender}</p>
          </div>
        </div>
        <div className='pInfo'>
          <div className='icon-wrapper'>
              <FaPhone size={30} />
          </div>
          <div>
              <p>Contact Info.</p>
              <p>{patient.phone_number}</p>
          </div>
        </div>
        <div className='pInfo'>
          <div className='icon-wrapper'>
              <FaPhone size={30} />
          </div>
          <div>
              <p>Emmergency Contact</p>
              <p>{patient.emergency_contact}</p>
          </div>
        </div>
        <div className='pInfo'>
          <div className='icon-wrapper'>
              <FaShield size={30} />
          </div>
          <div>
              <p>Insurance Provider</p>
              <p>{patient.insurance_type}</p>
          </div>
        </div>
      </div>
      <div className='download-res-cont'>
        <div>
          <h2>Lab Results</h2>
          <ul className='lab-result-list'>
            {
              labResults.map((resultName:string) => {
                return(
                  <li className='lab-item' key={itemKey++}>
                    {resultName}
                    <button className='download-btn'>
                      <FaDownload size={15} />
                    </button>
                  </li>
                )
              })     
            }
          </ul>
        </div>

      </div>
    </div>
  )
}

export default SideBarInfo