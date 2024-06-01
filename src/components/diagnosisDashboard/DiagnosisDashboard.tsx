import {useState, useEffect, useRef} from 'react'
import { getDiagnosisForSelectedDate, getPatient } from '../../lib/actions'
import Chart, { GoogleVizEventName, ReactGoogleChartEvent } from 'react-google-charts'
import './diagnosisDashboard.css'
import { 
  FaCircle,
  FaCheck,
  FaSortDown,
  FaSortUp,
} from 'react-icons/fa6'
import heart from '../../assets/heart-icon.png'
import liver from '../../assets/liver-icon.png'
import temp from '../../assets/liver-icon.png'

type Props = {
  name: string
}

const DiagnosisDashboard = (paraName: Props) => {
  // State variables to store diagnosis history, patient data, diagnostic list, and selected diagnosis details
  const  [diagnosisHistory, setDiagnosisHistory] = useState<any>([])
  const  [patientData, setPatientData] = useState<any>([])
  const  [diagnosticList, setDiagnosticList]  = useState<any>([])
  const  [clickedDateDiagnosis, setClickedDateDiagnosis] = useState<any>([])
  const  { name } = paraName
  const  patientNameRef = useRef(name) // A ref to store the latest patient data
  let keyCounter = 1;

   // useEffect hook to fetch patient data when the component mounts or when the name changes
  useEffect(() => {
    const fetchPatient = async (pName: string) => {
      try {
        const result = await getPatient(pName);
        setPatientData(result);
        patientNameRef.current = pName;
        setDiagnosisHistory(result.diagnosis_history);  
        setDiagnosticList(result.diagnostic_list) 

        // Fetch the most recent diagnosis data and display it as the default
        const recentDiagnosis = result.diagnosis_history[0]
        const recentDiagnosisDate = `${recentDiagnosis.month.substring(0, 3)} ${recentDiagnosis.year}`         
        const clickedDateDiagnosis = await getDiagnosisForSelectedDate(pName , recentDiagnosisDate)
        setClickedDateDiagnosis(clickedDateDiagnosis)
       

      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    }

    fetchPatient(name);
  }, [name])

  // Handles chart selection events
  const handleSelect = async ({ chartWrapper }:any) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();

    if (selection.length > 0) {
      const selectedItem = selection[0];
      const dataTable = chartWrapper.getDataTable();
      const row = selectedItem.row;
      const date = dataTable.getValue(row, 0);
      const currentName = patientNameRef.current
      const clickedDateDiagnosis = await getDiagnosisForSelectedDate(currentName, date)
      setClickedDateDiagnosis(clickedDateDiagnosis)
    }
  };
  
  // Create the chart by populating it with data from the 
  // patients diagnosis history
  const LineData = [
    ['x', 'systolic', 'diastolic'],
    ...diagnosisHistory.map((d:any) => {
    const month = d.month.substring(0,3);
    const year = d.year;
    const diastolic = parseInt(d.blood_pressure.diastolic.value);
    const systolic = parseInt(d.blood_pressure.systolic.value);
    return[`${month} ${year}`, systolic, diastolic]
  }) ]

  const LineChartOptions = {
    hAxis: {
      slantedText: false
    },
    series: {
      1: { curveType: 'function', color: '#8C6FE6'},
      0: { curveType: 'function', color: '#E66FD2'},
      3: { color: "#F7992C"},
      4: { color: "#29ABE2" }
    },
    chartArea: {left: 50, top: 100, bottom: 50, right: 0},
    legend: 'none',
    backgroundColor: "none",
    slantedText: false
  }

  const chartEvents: ReactGoogleChartEvent[] = [
    {
      eventName: 'select' as GoogleVizEventName,
      callback: handleSelect,
    },
  ];

  return (
    <div className='diag-dash-container'>
      <div className='diag-container'>
        <h1 className='diag-title'>Diagnosis History</h1>
        <div className='chart-wrapper1'>
          <h2>Blood Pressure</h2>
          <div className='chart-wrapper2'>
            <Chart
              className='chart_graph'
              width={'80%'}
              height={'450px'}
              chartType='LineChart'
              loader={<p className='load_msg'>Updating revenue chart...</p>}
              data={LineData}
              options={LineChartOptions}
              rootProps={{'data-tested': 2}}
              chartEvents={chartEvents}
            />
            {clickedDateDiagnosis.diastolic !=null && clickedDateDiagnosis.systolic !=null && (
              <div className='info-legend'>
                <div className='legend-row'>
                  <div className='indicator-wrapper type-text'>
                    <FaCircle size={13} color='#E66FD2'/>
                    <p>Systolic</p>
                  </div>
                  <p className='systolic-value'>{clickedDateDiagnosis.systolic}</p>
                  <div className='indicator-wrapper'>
                    {clickedDateDiagnosis.systolic_level === 'Lower than Average' && <FaSortDown size={15} />}
                    {clickedDateDiagnosis.systolic_level === 'Higher than Average' && <FaSortUp size={15} />}
                    {clickedDateDiagnosis.systolic_level === 'Normal' && <FaCheck size={15} />}
                    <p>{clickedDateDiagnosis.systolic_level}</p>
                  </div>
                </div>
                <div className='legend-row'>
                  <div className='indicator-wrapper type-text'>
                  <FaCircle size={13} color='#8C6FE6'/>
                  <p>Diastolic</p>
                  </div>
                  <p className='diastolic-value'>{clickedDateDiagnosis.diastolic}</p>
                  <div className='indicator-wrapper'>
                    {clickedDateDiagnosis.diastolic_level === 'Lower than Average' && <FaSortDown size={15} />}
                    {clickedDateDiagnosis.diastolic_level === 'Higher than Average' && <FaSortUp size={15} />}
                    {clickedDateDiagnosis.diastolic_level === 'Normal' && <FaCheck size={15} />}
                    <p>{clickedDateDiagnosis.diastolic_level}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='health-cards-cont'>
          <div className='health-card resp-rate'>
            <img 
              src={liver}
              alt="liver-icon"
            />
            <div>
              <p className='txt-ln1'>Respiratory Rate</p>
              <p className='txt-ln2'>{clickedDateDiagnosis.respiratory_rate && `${clickedDateDiagnosis.respiratory_rate} bpm`} </p>
            </div>
            <p className='txt-ln3'>{clickedDateDiagnosis.respiratory_level && clickedDateDiagnosis.respiratory_level}</p>
          </div>
          <div className='health-card temp'>
            <img 
              src={temp}
              alt="temp-icon"
            />
            <div>
              <p className='txt-ln1'>Temperature</p>
              <p className='txt-ln2'>{clickedDateDiagnosis.temperature && `${clickedDateDiagnosis.temperature}°F`}</p>
            </div>
              <p className='txt-ln3'>{clickedDateDiagnosis.temperature_level && clickedDateDiagnosis.temperature_level}</p>
          </div>
          <div className='health-card heart-rate'>
            <img 
              src={heart}
              alt="heart-icon"
            />
            <div>
              <p className='txt-ln1'>Heart Rate</p>
              <p className='txt-ln2'>{clickedDateDiagnosis.heart_rate && `${clickedDateDiagnosis.heart_rate}bpm`}</p>
            </div>
            <p className='txt-ln3'>{clickedDateDiagnosis.heart_level && clickedDateDiagnosis.heart_level}</p>
          </div>
        </div>
      </div>
      <div className='diag-table-cont'>
        <h1>Diagnostic List</h1>
        <table className='diag-table'>
          <tr>
            <th>Problem/Diagnosis</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
          {
            diagnosticList.map((info:any) => {
              return(
                <tr key = {keyCounter++}>
                  <td>{info.name}</td>
                  <td>{info.description}</td>
                  <td>{info.status}</td>
                </tr>
              )
            })
          }
        </table>
      </div>
    </div>
  )
}

export default DiagnosisDashboard