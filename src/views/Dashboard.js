import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const Dashboard = (props) => {
    const [user, setUser] = useState({});

    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/getLoggedInUser", { withCredentials: true })
            .then(res => {
                console.log(res.data);
                if (res.data.results) {
                    setUser(res.data.results)
                }
            })
            .catch(err => {
                console.log(err);
                history.push("/");
            })
    }, [history])

    const logout = () => {
        axios.get("http://localhost:8000/api/users/logout", { withCredentials: true })
            .then(res => {
                history.push("/");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <h1>Welcome {user.username}!</h1>
            <button onClick={logout} className="btn btn-warning">Logout</button>
        </div>
    )
}

export default Dashboard;