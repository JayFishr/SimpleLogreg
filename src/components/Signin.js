import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signin = (props) => {
    const [form, setForm] = useState({
        email: "",
        password: ""
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

        axios.post("http://localhost:8000/api/users/login", form, { withCredentials: true })
            .then(res=>{
                console.log(res.data);
                history.push("/dashboard");
            })
            .catch(err=>{
                console.log(err);
                setErrors({email: "Invalid credentials"})
            })
    }

    return(
        <div>
            <h1>Sign In</h1>
            <form onSubmit={onSubmitHandler} className="m-3">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={onChangeHandler} type="email" name="email" className="form-control" />
                    <span className="alert-danger">{errors?.email}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={onChangeHandler} type="password" name="password" className="form-control" />
                </div>
                <input type="submit" value="Signin" className="btn btn-primary" />
            </form>
        </div>
    )
}
export default Signin;