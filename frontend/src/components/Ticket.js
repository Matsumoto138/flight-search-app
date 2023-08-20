import React, {useState, useEffect} from "react";
import '../style/style.css'




function Ticket() {

    const[selectedOption, setSelectedOption] = useState("one-way")
    const [returnDisabled, setReturnDisabled] = useState("false")
    const [firstMiniData, setFirstMiniData] = useState([])
    const [secondMiniData, setSecondMiniData] = useState([])
    const [firstValue, setFirstValue] = useState("")
    const [secondValue, setSecondValue] = useState("")
    const [allData, setAllData] = useState([]) 

    const getResult = async (value) =>{
        fetch('http://localhost:8000/flight')
        .then((response) => response.json())
        .then((json) => {
            const results = json.filter((flight) => {
                return value && flight && flight.take_off_city && flight.take_off_city.toLowerCase().includes(value)
            })
            setAllData(results)
        })
        if(allData == []){
            fetch('http://localhost:8000/flight')
        .then((response) => response.json())
        .then((json) => {
            setAllData(json)
        })
        }
    }
    
    const getDataTakeoff = async (value) =>{
    
        fetch('http://localhost:8000/airports')
        .then((response) => response.json())
        .then((json) => {
            const results = json.filter((airports) => {
                return value && airports && airports.name && airports.name.toLowerCase().includes(value)
            })
            setFirstMiniData(results)
        })
        
    } 
    
    const getDataArrive = async (value) =>{
    
        fetch('http://localhost:8000/airports')
        .then((response) => response.json())
        .then((json) => {
            const results = json.filter((airports) => {
                return value && airports && airports.name && airports.name.toLowerCase().includes(value)
            })
            setSecondMiniData(results)
        })
       
    }

    const chageValueInputOne = (name) =>{
        setFirstValue(name)
        setFirstMiniData([])
    }
    
    const chageValueInputTwo = (name) =>{
        setSecondValue(name)
        setSecondMiniData([])
    }
    

  return (
    <div className="Big-Table">
    <div className="Ticket">
        <div className="Choose-Way">
            <div className="Way-Group">
            <input 
                type="radio" 
                name="choose-way" 
                id="one-way" 
                value="one-way"
                defaultChecked
                onChange={(e)=>{
                    setSelectedOption(e.target.value)
                    setReturnDisabled(true)
                }}
                />
            <label>Tek Yön</label>
            </div>
                <div className="Way-Group">
                <input 
                type="radio" 
                name="choose-way" 
                value="roundtrip" 
                id="roundtrip" 
                onChange={(e)=>{
                    setSelectedOption(e.target.value)
                    setReturnDisabled(false)
                }}
                />
                <label>Gidiş-Dönüş</label>
            </div>
            
        
        </div>
        <div className="Choose-Airport">
            <div className="First-Input-Area">
                <input type="text" id="input1" value={firstValue} placeholder="Nereden"  onChange={(e) => {getDataTakeoff(e.target.value); setFirstValue(e.target.value)}} />
                <div className='First-Mini-Data-List'>
                    {
                        firstMiniData.map((data,id) => {
                        return <button onClick={() => {chageValueInputOne(data.name)}} key={id}>{data.name}</button>
                        })
                    }
                </div>
            </div>

            <div className="Second-Input-Area">
                <input type="text" id="input2" value={secondValue} placeholder="Nereye" onChange={(e) => {getDataArrive(e.target.value); setSecondValue(e.target.value)}}/>
                <div className='Second-Mini-Data-List'>
                    {
                        secondMiniData.map((data,id) => {
                        return <button onClick={() => {chageValueInputTwo(data.name)}} key={id}>{data.name}</button>
                        })
                    }
                </div>
            </div>
        
        
        
        </div>
        
        <div className="Choose-Date">
        <input type="date" name="" placeholder="Gidiş" id="leave" />
        <input type="date" name="" placeholder="Dönüş" id="return" disabled={returnDisabled} />
                
        </div>
        <div className="Search-Button">
            <button onClick={() =>getResult(firstValue)}>Ara</button>
        </div>
    </div>
    <div className="Table">
        <table>
            <tr>
                <th>Kod</th>
                <th>Kalkış Yeri</th>
                <th>Varış Yeri</th>
                <th>Gidiş Tarihi</th>
                <th>Dönüş Tarihi</th>
                <th>Uçuş Süresi</th>
                <th>Ücret</th>
            </tr>
            {allData.map((data,id) => {
                return (
                    <tr>
                        <td>{data.id}</td>
                        <td>{data.take_off_city}</td>
                        <td>{data.arrival_city}</td>
                        <td>{data.take_of_date}</td>
                        <td>{data.return_date}</td>
                        <td>{data.flight_length}</td>
                        <td>{data.price}</td>
                    </tr>
                )
            })}
        </table>
    </div>
    </div>
  )
}

export default Ticket


