import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
  const [currentData, setCurrentData] = useState({
    name:"",
    age:0,
    job:"",
  });
  const [records, setRecords] = useState([]);
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form data", currentData);
    sendRequest();
  }

  async function getPersons() {
    try {
      const response = await axios.get("http://localhost:4000/person/get-persons")
      if(await response.status === 200){
        console.log(response);
        setRecords(response.data.persons)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log("MY RECRDS", records);
  async function sendRequest() {
    try {
      const response = await axios.post("http://localhost:4000/person/add-person", currentData);
      console.log(response)
      if(response.status === 200){
        await getPersons();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        {/* <button onClick={()=>{setCount((prev)=>{return prev+1}); console.log(count)}}>click</button> */}
        {/* <p>{count}</p> */}
        <form className='border-2 border-emerald-500 flex flex-col p-[10px] bg-slate-100 '  onSubmit={handleSubmit}>
          <label htmlFor="">Name</label>
          <input type="text" onChange={(e)=>{setCurrentData((prev)=>{return {...prev, name:e.target.value}})}} name="" id="" />
          <label htmlFor="">Age</label>
          <input type="number" onChange={(e)=>{setCurrentData((prev)=>{return {...prev, age:e.target.value}})}} name="" id="" />
          <label htmlFor="">Job</label>
          <input type="text" onChange={(e)=>{setCurrentData((prev)=>{return {...prev, job:e.target.value}})}} name="" id="" />
          <input className='bg-sky-700 text-white p-[10px] mt-[10px] hover:bg-sky-500 transition-all' type="submit" />
        </form>
        <div>
          <table className='w-full border-[1px] border-black'>
            <thead>
              <th>Name</th>
              <th>age</th>
              <th>job</th>
            </thead>
            <tbody>
              { records.length > 0 ? 
                records.map(item => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.job}</td>
                  </tr>
                ))
              :(
                <tr>
                <td colspan="3">No data yet</td>
                </tr>
              ) }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
