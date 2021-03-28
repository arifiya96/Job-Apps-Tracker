import React, {useContext} from 'react';

//UI Components
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//Context
import {ApplicationContext} from '../context/ApplicationContext';

export default function SignUpModal () {
    const [application, SetApplication] = useContext(ApplicationContext);

    return (
        <div>
            <div>
                <button style={{float: 'right'}} onClick={() => SetApplication(prevState => ({...prevState, isOpenSignUp: false}))}>
                    <Close style={{margin: 10}}></Close>
                </button>
            </div>
            <h1 style={{fontWeight: 600, margin: '10px'}}>Sign up here. Many thanks for choosing to use this!</h1>
            <TextField id='standard-basic' label='Email Address' style={{margin: '10px', width: '95%'}} inputMode='email'></TextField><br></br>
            <TextField id='standard-basic' label='Password (min 8 characters)' style={{margin: '10px', width: '95%'}} type='password'></TextField><br></br>
            <TextField id='standard-basic' label='Confirm Password (min 8 characters)' style={{margin: '10px', width: '95%'}} type='password'></TextField><br></br>
            <Button variant='contained' color='primary' style={{margin: '10px'}}>Confirm sign up</Button>
        </div>
    )
}