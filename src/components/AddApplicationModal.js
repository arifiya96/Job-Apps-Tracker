import React, {useContext} from 'react';

//UI Components
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import PostAdd from '@material-ui/icons/PostAdd';

//Context
import {ApplicationContext} from '../context/ApplicationContext';

//Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export default function AddApplicationModal() {
    const [application, SetApplication] = useContext(ApplicationContext);

    const handleSubmit = () => {
        if (application.position === null || application.company === null || application.yoe === 0 || application.industry === null || application.city === null || application.country === null || application.salary === 0 || application.status === null ){
            alert('Please fill in all fields');
        } else {
            firebase.firestore().collection(localStorage.getItem('uid')).add({
                position: application.position,
                company: application.company,
                yoe: application.yoe,
                industry: application.industry,
                city: application.city,
                country: application.country,
                salary: application.salary,
                status: application.status,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                window.location.reload();
            })
        }
    }

    return (
        <div style={{margin: 5}}>
            <h1>New Job Application</h1>
            <TextField id="standard-basic" label="Position" style={{width: 300, margin: 5}} value={application.position} onChange={(event) => SetApplication(prevState => ({...prevState, position: event.target.value}))}></TextField>
            <TextField id="standard-basic" label="Company Name" style={{width: 300, margin: 5}} value={application.company} onChange={(event) => SetApplication(prevState => ({...prevState, company: event.target.value}))}></TextField><br></br>
            <FormControl style={{width: 300, margin: 5}}>
                <InputLabel>Years of Experince</InputLabel>
                <Select value={application.yoe} onChange={(event) => SetApplication(prevState => ({...prevState, yoe: event.target.value}))}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                </Select>
            </FormControl>
            <TextField id="standard-basic" label="Industry" style={{width: 300, margin: 5}} value={application.industry} onChange={(event) => SetApplication(prevState => ({...prevState, industry: event.target.value}))}></TextField><br></br>
            <TextField id="standard-basic" label="City" style={{width: 300, margin: 5}} value={application.city} onChange={(event) => SetApplication(prevState => ({...prevState, city: event.target.value}))}></TextField>
            <FormControl style={{width: 300, margin: 5}}>
                <InputLabel>Country</InputLabel>
                <Select value={application.country} onChange={(event) => SetApplication(prevState => ({...prevState, country: event.target.value}))}>
                    <MenuItem value={'United Kingdom 🇬🇧'}>United Kingdom 🇬🇧 </MenuItem>
                    <MenuItem value={'United States 🇺🇸'}>United States 🇺🇸</MenuItem>
                    <MenuItem value={'Japan 🇯🇵'}>Japan 🇯🇵</MenuItem>
                    <MenuItem value={'Singapore 🇸🇬'}>Singapore 🇸🇬</MenuItem>
                    <MenuItem value={'Indonesia 🇮🇩'}>Indonesia 🇮🇩</MenuItem>
                    <MenuItem value={'Malaysia 🇲🇾'}>Malaysia 🇲🇾</MenuItem>
                    <MenuItem value={'Hong Kong 🇭🇰'}>Hong Kong 🇭🇰</MenuItem>
                    <MenuItem value={'EU 🇪🇺'}>EU 🇪🇺</MenuItem>
                </Select>
            </FormControl><br></br>
            <FormControl style={{width: 300, margin: 5}}>
                <InputLabel>Salary</InputLabel>
                <Select value={application.salary} onChange={(event) => SetApplication(prevState => ({...prevState, salary: event.target.value}))}>
                    <MenuItem value={'Withheld'}>Cheeky bastards won't say</MenuItem>
                    <MenuItem value={20000}>£20,000</MenuItem>
                    <MenuItem value={22500}>£22,500</MenuItem>
                    <MenuItem value={25000}>£25,000</MenuItem>
                    <MenuItem value={27500}>£27,500</MenuItem>
                    <MenuItem value={30000}>£30,000</MenuItem>
                    <MenuItem value={32500}>£32,500</MenuItem>
                    <MenuItem value={35000}>£35,000</MenuItem>
                    <MenuItem value={37500}>£37,500</MenuItem>
                    <MenuItem value={40000}>£40,000</MenuItem>
                    <MenuItem value={42500}>£42,500</MenuItem>
                    <MenuItem value={45000}>£45,000</MenuItem>
                    <MenuItem value={47500}>£47,500</MenuItem>
                    <MenuItem value={50000}>£50,000</MenuItem>
                </Select>
            </FormControl>
            <FormControl style={{width: 300, margin: 5}}>
                <InputLabel>Status</InputLabel>
                <Select value={application.status} onChange={(event) => SetApplication(prevState => ({...prevState, status: event.target.value}))}>
                    <MenuItem value={'Application Submitted'}>Application Submitted</MenuItem>
                    <MenuItem value={'Passed Initial Screening, ongoing'}>Passed Initial Screening, ongoing</MenuItem>
                    <MenuItem value={'Straight rejection'}>Straight rejection</MenuItem>
                    <MenuItem value={'Rejected after initial screening'}>Rejected after initial screening</MenuItem>
                    <MenuItem value={'Offer Recieved'}>Offer Recieved</MenuItem>
                </Select>
            </FormControl><br></br>
            <Button variant="contained" color="default" startIcon={<PostAdd></PostAdd>} style={{margin: 5}} onClick={() => handleSubmit()}>Add Application</Button>
        </div>
    )
}