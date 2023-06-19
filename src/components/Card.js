import React from 'react';

import { Link } from "react-router-dom";


export default class Card extends React.Component{

  render(){
    const { name, status } = this.props;

    return(
      <div className="card p-3">
        <div className="card-body text-center">
          <h4 className="card-title">{name}</h4>
          {status==='To do'?(
              <p className="card-text text-primary">{status}</p>
            ):(
              <></>
            )}
            {status==='In process'?(
              <p className="card-text text-warning">{status}</p>
            ):(
              <></>
            )}
            {status==='Done'?(
              <p className="card-text text-success">{status}</p>
            ):(
              <></>
            )}
        </div>
        <div className="text-center">
          <Link to='/modify-task' state={{ name:name, status:status }}
          style={{ color: 'white', textDecoration: 'none', fontSize: '15px', marginRight:'20px'}}>
            <button className="btn btn-primary">Modify</button>
          </Link>
        </div>
      </div>

    );
  }

}