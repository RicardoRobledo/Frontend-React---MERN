import React, { useState, useContext, useEffect } from 'react';
import { get, useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PathContext } from '../App';
import { useLocation } from "react-router-dom";


const initialForm = {
    name: '',
    status: ''
}


export default function CreateTaskForm() {

    let { state } = useLocation();

    const { register, reset, getValues, handleSubmit, watch, formState: { errors } } = useForm();
    const [form, setForm] = useState(initialForm);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const path = useContext(PathContext);

    const handleItemClick = (value) => {
        form.status = value
    };

    const onSubmit = async (e) => {

        try {

            if (form.status === '') {
                setError('Select status');
            } else {
                await axios.put(`${path}tasks/task?name=${state.name}`, {
                    name: form.name,
                    status: form.status
                }).then(function (response) {

                    if (response.status === 200) {
                        navigate('/home');
                    }

                })
            }

        } catch (err) {
            setError('That task already exists');
        }

        //setForm(initialForm);
        //reset();
    }


    useEffect(() => {
        setForm({
            name: state.name,
            status: ''
          });
    }, []);


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    return (
        <div className="container bg-white mt-5 mb-5 rounded p-3">
            <form className="row g-3 p-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12 bg-success rounded">
                    <h2 className="text-center text-white">Modify Task</h2>
                </div>
                {error ? <div className="alert alert-danger" role="alert">
                    {error}
                </div> : <></>}
                <div className="col-md-4">
                    <label htmlFor="validationServer04" className="form-label">Name</label>
                    <input
                    className="form-control"
                    value={form.name}
                    readOnly
                    />
                </div>
                <label htmlFor="validationServer04" className="form-label">Status</label>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="firstRadio" onClick={() => handleItemClick('To do')} />
                        <label className="form-check-label" htmlFor="firstRadio">To do</label>
                    </li>
                    <li className="list-group-item">
                        <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="secondRadio" onClick={() => handleItemClick('In process')} />
                        <label className="form-check-label" htmlFor="secondRadio">In process</label>
                    </li>
                    <li className="list-group-item">
                        <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="thirdRadio" onClick={() => handleItemClick('Done')} />
                        <label className="form-check-label" htmlFor="thirdRadio">Done</label>
                    </li>
                </ul>
                <div className="col-12 mt-5 text-center">
                    <button className="btn btn-primary w-100" type="submit">Register</button>
                </div>
            </form>
        </div>
    );

}