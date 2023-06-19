import React, { Fragment } from 'react';
import ModifyTaskForm from '../components/ModifyTaskForm'
import Menu from '../components/Menu'


export default class ModifyTask extends React.Component {

  render(){
    return (
      <Fragment>
        <Menu />
        <ModifyTaskForm />
      </Fragment>
    );
  }

}