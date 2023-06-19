import Menu from '../components/Menu'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export default function Error404() {

  const navigate = useNavigate();

  function redirect(){

    console.log(sessionStorage.getItem('username'))

    if(sessionStorage.getItem('username')){
        navigate('/home')
    }else{
        navigate('/')
    }
  
  }

  return (
    <>
      <div className="mt-4 mb-4">
        <h2 className='text-center mt-5'>Oops, that page does not exist</h2>
        <button onClick={redirect}>Return</button>
      </div>
    </>
  );

}