import React from 'react';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

const Main = (props) => {
    return(
        <div>
            <div className="row">
                <div className="col">
                    <Signup/>
                </div>
                <div className="col">
                    <Signin/>
                </div>
            </div>
        </div>
    )
}

export default Main;