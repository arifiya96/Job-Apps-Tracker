import React from 'react';

//UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Login(){
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${process.env.PUBLIC_URL + '/background.jpeg'})`, height: '100vh', backgroundSize: '100%'}}> {/*Higher order components div*/}
            <div style={{width: '30%', marginTop: '25%', borderRadius: '10px', marginBottom: '25%', backgroundColor: 'white', borderStyle: 'outset'}}>{/*Card element for login*/}<br></br>
                <h1 style={{fontWeight: 600, margin: '10px'}}>A personalized job app tracker</h1>
                <details style={{margin: '10px'}}>
                    <summary>Click to expand</summary>
                    <p>A simple way for you to track the jobs that you apply to. Log in or sign up.</p>
                </details>
                <TextField id='standard-basic' label='Email Address' style={{margin: '10px', width: '95%'}}></TextField><br></br>
                <TextField id='standard-basic' label='Password' style={{margin: '10px', width: '95%'}}></TextField><br></br>
                <Button variant='contained' color='primary' style={{margin: '10px'}}>Login</Button>
                <Button variant='contained' color='primary' style={{margin: '10px'}}>Sign Up</Button>
            </div>
        </div>
    )
}

