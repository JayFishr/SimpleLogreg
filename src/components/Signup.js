import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPass: ""
    });
    const [errors, setErrors] = useState({});

    const history = useHistory();

    const onChangeHandler = (event) =>{
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();

        axios.post("http://localhost:8000/api/users/register", form, { withCredentials: true })
            .then(res=>{
                console.log(res.data);
                if(res.data.errors){
                    setErrors(res.data.errors)
                } else{
                    history.push("/dashboard");
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }

    return(
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={onSubmitHandler} className="m-3">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input onChange={onChangeHandler} type="text" name="username" className="form-control" />
                    <span className="alert-danger">{errors.username?.message}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={onChangeHandler} type="email" name="email" className="form-control" />
                    <span className="alert-danger">{errors.email?.message}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={onChangeHandler} type="password" name="password" className="form-control" />
                    <span className="alert-danger">{errors.password?.message}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPass">Confirm Password</label>
                    <input onChange={onChangeHandler} type="password" name="confirmPass" className="form-control" />
                    <span className="alert-danger">{errors.confirmPass?.message}</span>
                </div>
                <input type="submit" value="Signup" className="btn btn-primary" />
            </form>
        </div>
    )
}
export default Signup;