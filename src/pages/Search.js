import React, { Fragment, useEffect, useState, useContext } from 'react';
import Menu from '../components/Menu'
import Card from '../components/Card'
import axios from 'axios';
import { PathContext } from '../App';
import { useLocation } from "react-router-dom";


export default function Search() {

    let { state } = useLocation();
    const path = useContext(PathContext);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(false);

    const getTasks = async () => {

        if (state.name === '' && state.status === '') {
            setError(true);
        } else {
            let url = `${path}/tasks/task`

            if (state.name && state.status) {
                url = `${path}/tasks/task?name=${state.name}&status=${state.status}`
            } else if (state.name) {
                url += `?name=${state.name}`
            } else if (state.status) {
                url += `?status=${state.status}`
            }
            const response = await axios.get(url);

            if(response.data['task'].length===0){
                console.log(response.data['task'].length)
                setError(true);
            }else{
                setTasks(response.data['task'])
            }
        }

    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <Fragment>
            <Menu />
            {error?(
            <div className="text-center m-5">
                <h3>There aren't tasks related</h3>
            </div>):(
            <div>
                <div className="col mt-4 mb-4">
                {tasks.map((task) => (
                    <div key={task.name} className="m-5">
                        <Card name={task.name} status={task.status} />
                    </div>
                ))}
            </div>
            </div>)}
        </Fragment>
    );

}