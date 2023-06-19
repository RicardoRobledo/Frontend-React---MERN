import React, { Fragment } from 'react';
import CreateTaskForm from '../components/CreateTaskForm'
import Menu from '../components/Menu'


export default class CreateTask extends React.Component {

  render(){
    return (
      <Fragment>
        <Menu />
        <CreateTaskForm />
      </Fragment>
    );
  }

}