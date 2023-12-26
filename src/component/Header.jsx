import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';

const Header = () => {
  const useAppstate = useContext(Appstate)
  return (
    <div className="text-3xl flex justify-between text-green-400 border-gray-400 p-3 border-b-2 font-bold">
        <Link to={'/'}><span>Filmy<span className="text-white">Verse</span></span></Link>
        {useAppstate.login ?
        <Link to={'/add'}>
        <Button>
        <h1 className='text-white flex items-center text-lg'>
            <AddIcon className='mr-2' color='inherit'/>Add New
        </h1>
        </Button>
        </Link>
        :
        <Link to={'/login'}>
        <Button className='bg-green-400'>
        <h1 className='text-white bg-green-500 p-2 flex items-center text-lg'>
            Login
        </h1>
        </Button>
        </Link>
        }
    </div>
  )
}

export default Header



