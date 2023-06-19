import React, { useRef, useEffect, useState, useContext } from 'react';
import Menu from '../components/Menu'
import Card from '../components/Card'
import FilterForm from '../components/FilterForm'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {PathContext} from '../App';


export default function Home() {

  const navigate = useNavigate();
  const path = useContext(PathContext);
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const response = await axios.get(`${path}/tasks/tasks`);
    setTasks(response.data['task']);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <Menu />

      <FilterForm />

      <hr></hr>

      <div className='text-center m-5'>
        <Link to="/create-task" style={{ textDecoration: 'none', fontSize: '20px'}}><button className='btn btn-success'>Create task</button></Link>
      </div>
      
      <div className="col mt-4 mb-4">
        {tasks.map((task) => (
          <div key={task.name} className="m-5">
            <Card name={task.name} status={task.status}/>
          </div>
        ))}
      </div>
    </>
  );

}