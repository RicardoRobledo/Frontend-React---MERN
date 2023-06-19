import React, { useState,useContext } from 'react';
import { get, useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {PathContext} from '../App';


const initialForm = {
  username: '',
  password: ''
}


export default function RegisterUserForm() {
  const { register, reset, getValues, handleSubmit, watch, formState: { errors } } = useForm();
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const path = useContext(PathContext);

  const onSubmit = async (e) => {

    if(e.password!==e.confirm_password){
      setError('Password doest not match');
    }else{
      try{
        await axios.post(`${path}users/user`, {
          username: form.username,
          password: form.password
        }).then(function (response) {
  
          if(response.status===200){
            navigate('/');
          }

        })
      }catch(err){
        setError('Username in use');
      }

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
      <div className="text-center p-3 bg-secondary rounded">
        <img className="rounded" width="300px" height="300px" src="https://cdn-icons-png.flaticon.com/512/5146/5146927.png" />
      </div>
      <form className="row g-3 p-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 bg-info rounded">
          <h2 className="text-center">Type your data</h2>
        </div>
        {error ? <div className="alert alert-danger" role="alert">
        {error}
        </div>:<></>}

        <div className="col-md-4">
          <label htmlFor="validationServer04" className="form-label">Username</label>
          <input
            placeholder=""
            type="text"
            className="form-control"
            {...register("username", { required: true, minLength: 5, maxLength: 20, pattern: /^[\S]+$/ })}
            onChange={handleChange}
          />
          {errors?.username?.type === "required" && <p className="text-warning">This field is required</p>}
          {errors?.username?.type === "minLength" && <p className="text-danger">Minimum length '5'</p>}
          {errors?.username?.type === "maxLength" && <p className="text-danger">Maximum length '20'</p>}
          {errors?.username?.type === "pattern" && <p className="text-danger">Invalid format, no spaces</p>}
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServer04" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true, minLength: 8, maxLength: 20, pattern: /^[\S]+$/ })}
            onChange={handleChange}
          />
          {errors?.password?.type === "required" && <p className="text-warning">This field is required</p>}
          {errors?.password?.type === "minLength" && <p className="text-danger">Minimum length '8'</p>}
          {errors?.password?.type === "maxLength" && <p className="text-danger">Maximum length '20'</p>}
          {errors?.password?.type === "pattern" && <p className="text-danger">Invalid format, no spaces</p>}
        </div>
        <div className="col-md-4">
          <label htmlFor="validationServer05" className="form-label">Confirm password</label>
          <input
            type="password"
            className="form-control"
            {...register("confirm_password", { required: true, minLength: 8, maxLength: 20, pattern: /^[\S]+$/ })}
            onChange={handleChange}
          />
          {errors?.confirm_password?.type === "required" && <p className="text-warning">This field is required</p>}
          {errors?.confirm_password?.type === "minLength" && <p className="text-danger">Minimum length '8'</p>}
          {errors?.confirm_password?.type === "maxLength" && <p className="text-danger">Maximum length '20'</p>}
          {errors?.confirm_password?.type === "pattern" && <p className="text-danger">Invalid format, no spaces</p>}
        </div>
        <div className="col-12 mt-5 text-center">
          <button className="btn btn-primary w-100" type="submit">Register</button>
        </div>
      </form>
    </div>
  );

}