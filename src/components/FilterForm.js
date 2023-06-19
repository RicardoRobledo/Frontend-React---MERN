import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";
import {PathContext} from '../App';


export default function FilterForm() {

    const { register, reset, getValues, handleSubmit, watch, formState: { errors } } = useForm();
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");

    return (
        <div className="card m-5 p-3">

            <form className="row g-3 p-3">
                <div className="text-center">
                  <h2>Search task</h2>
                </div>

                <div className="text-center">
                  <h6 className="text-primary">Name</h6>
                  <input className="form-control text-center" {...register("name")} onChange={e=>setName(e.target.value)}></input>
                </div>

                <div className="text-center">
                  <h6 className="text-primary">Status</h6>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="firstRadio" onClick={() => setStatus('To do')} />
                        <label className="form-check-label" htmlFor="firstRadio">To do</label>
                    </li>
                    <li className="list-group-item">
                        <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="secondRadio" onClick={() => setStatus('In process')} />
                        <label className="form-check-label" htmlFor="secondRadio">In process</label>
                    </li>
                    <li className="list-group-item">
                        <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="thirdRadio" onClick={() => setStatus('Done')} />
                        <label className="form-check-label" htmlFor="thirdRadio">Done</label>
                    </li>
                </ul>
                <div className="text-center pt-3">
                  <Link to="/search" style={{ textDecoration: 'none', fontSize: '15px' }} state={{ name:name, status:status }}>
                    <button className="btn btn-warning">Search</button>
                  </Link>
                </div>
            </form>

        </div>
    );

}