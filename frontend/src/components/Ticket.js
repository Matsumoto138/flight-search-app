import React, {useState, useEffect} from "react";
import '../style/style.css'




function Ticket() {

    const[selectedOption, setSelectedOption] = useState("one-way")
    const [returnDisabled, setReturnDisabled] = useState("false")
    const [firstMiniData, setFirstMiniData] = useState([])
    const [secondMiniData, setSecondMiniData] = useState([])
    const [firstValue, setFirstValue] = useState("")
 

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
        const input1 = document.getElementById('input1')
        input1.value = name
        setFirstMiniData([])
    }
    
    const chageValueInputTwo = (name) =>{
        const input2 = document.getElementById('input2')
        input2.value = name
        setSecondMiniData([])
    }
    

  return (
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
                <input type="text" id="input1" placeholder="Nereden"  onChange={(e) => {getDataTakeoff(e.target.value)}} />
                <div className='First-Mini-Data-List'>
                    {
                        firstMiniData.map((data,id) => {
                        return <button onClick={() => {chageValueInputOne(data.name)}} key={id}>{data.name}</button>
                        })
                    }
                </div>
            </div>

            <div className="Second-Input-Area">
                <input type="text" id="input2" placeholder="Nereye" onChange={(e) => {getDataArrive(e.target.value)}}/>
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
            <button>Ara</button>
        </div>
    </div>
  )
}

export default Ticket


