import './App.css';
import { useState, useEffect } from 'react';
import SideBar from './components/sideBar/SideBar';
import Header from './components/header/Header';
import SideBarInfo from './components/sideBarInfo/SideBarInfo';
import DiagnosisDashboard from './components/diagnosisDashboard/DiagnosisDashboard';



function App() {
  const [selectedPatient, setSelectedPatient] = useState<string>("Jessica Taylor")
  
  return (
    <div className="App">
      <Header />
      <main className='main-container'>
        <SideBar selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient}/>
        <DiagnosisDashboard name= {selectedPatient}/>
        <SideBarInfo name= {selectedPatient}/>
      </main>
    </div>
  );
}

export default App;
