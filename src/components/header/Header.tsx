import {useState} from 'react'
import './header.css'
import { 
  FaHouse, 
  FaUsers,
  FaMessage,
  FaCalendar,
  FaCreditCard,
  FaGear,
  FaEllipsisVertical
} from "react-icons/fa6";
import TestIcon from '../../assets/TestLogo.svg'
import DoctorPhoto from '../../assets/doctor.png'

const Header = () => {
  // State variable to keep track of the active tab
  const [activeTab, setActiveTab] = useState<number>(2)

  // JSX structure for the header component
  return (
    <header className='app-header'>
      <img
          src={TestIcon}
          alt='company logo'
          className='company-logo'
      />
      <nav className='nav'>
        <ul className='nav-list'>
          <li 
            className={activeTab === 1? 'nav-item active': 'nav-item'}
            onClick={() => setActiveTab(1)}
          >
            <a href='#'><FaHouse size={15}/>Overview</a>
          </li>
          <li 
            className={activeTab === 2? 'nav-item active': 'nav-item'}
            onClick={() => setActiveTab(2)}
          >
            <a href='#'><FaUsers size={15}/>Patients</a>
          </li>
          <li 
            className={activeTab === 3? 'nav-item active': 'nav-item'}
            onClick={() => setActiveTab(3)}
          >
            <a href='#'><FaCalendar size={15}/>Schedule</a>
          </li>
          <li 
            className={activeTab === 4? 'nav-item active': 'nav-item'}
            onClick={() => setActiveTab(4)}
          >
            <a href='#'><FaMessage size={15}/>Message</a>
          </li>
          <li 
            className= {activeTab === 5? 'nav-item active': 'nav-item'}
            onClick={() => setActiveTab(5)}
          >
            <a href='#'><FaCreditCard size={15}/>Transactions</a>
          </li>
        </ul>
      </nav>
      <div className='doctors-acct'>
        <img
          src={DoctorPhoto}
          alt="doctors-photograph"
          className='doctors-photo'
        />
        <div className='doctors-info'>
          <section className='info-details'>
            <p>Dr. Jose Simmona</p>
            <p>General Practitioner</p>
          </section>
          <section className='info-settings'>
            <FaGear size={15}/>
            <FaEllipsisVertical size={15} />
          </section>
        </div>
      </div>
    </header>
  )
}
export default Header