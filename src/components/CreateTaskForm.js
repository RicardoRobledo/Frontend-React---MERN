import React, { useState, useContext } from 'react';
import { get, useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PathContext } from '../App';


const initialForm = {
    name: '',
    status: ''
}


export default function CreateTaskForm() {
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
                await axios.post(`${path}tasks/task`, {
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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container bg-white mt-5 mb-5 rounded p-3">
            <form className="row g-3 p-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12 bg-info rounded">
                    <h2 className="text-center">Enter Task</h2>
                </div>
                {error ? <div className="alert alert-danger" role="alert">
                    {error}
                </div> : <></>}

                <div className="col-md-4">
                    <label htmlFor="validationServer04" className="form-label">Name</label>
                    <input
                        placeholder=""
                        type="text"
                        className="form-control"
                        {...register("name", { required: true, minLength: 2, maxLength: 100 })}
                        onChange={handleChange}
                    />
                    {errors?.name?.type === "required" && <p className="text-warning">This field is required</p>}
                    {errors?.name?.type === "minLength" && <p className="text-danger">Minimum length '2'</p>}
                    {errors?.name?.type === "maxLength" && <p className="text-danger">Maximum length '20'</p>}
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