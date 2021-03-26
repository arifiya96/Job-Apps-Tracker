import React, {useEffect, useContext} from 'react';

//UI Components
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Work from '@material-ui/icons/Work';
import Modal from 'react-modal';

//External app components
import columns from '../components/ColumnData';
import useStyles from '../components/ColumnDataStyle';
import AddApplicationModal from '../components/AddApplicationModal';
import UpdateApplicationModal from '../components/UpdateApplicationModal';

//Firestore
import firebase from 'firebase/app';
import 'firebase/firestore';

//Context
import {ApplicationContext} from '../context/ApplicationContext';

export default function Home(){
    //State to store data from useEffect hook
    /*
    const [rows, SetRows] = useState([]);
    */

    //Application state data
    const [application, SetApplication] = useContext(ApplicationContext);

    const classes = useStyles();

    const handleUpdateModal = (id) => {
        SetApplication(prevState => ({...prevState, isOpenUpdate: true}));
        SetApplication(prevState => ({...prevState, application_id: id}));
    }

    useEffect(() => {
        const JobsList = firebase.firestore().collection('applications').onSnapshot(querySnapshot => {
          const jobs_array = [];
          querySnapshot.forEach(documentSnapshot => {
            jobs_array.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          jobs_array.forEach(job => job.timestamp = job.timestamp.toDate())
          SetApplication(prevState => ({...prevState, rows: jobs_array}));
        });
        return () => JobsList();
      }, [SetApplication]);

    return (
        <div> {/*<-- Higher order component*/}
            <h1 style={{textAlign: 'center', fontSize: '40px', fontWeight: 'bold'}}>Job Application Progress</h1>
            <Button variant="contained" color="default" startIcon={<Work></Work>} style={{margin: 5}} onClick={() => SetApplication(prevState => ({...prevState, isOpenAdd: true}))}>Add new application</Button>
            <div style={{height: 500, width: '100%', margin: 5}} className={classes.root}>
                <DataGrid rows={application.rows} columns={columns} onRowClick={(job) => handleUpdateModal(job.row.id)}></DataGrid>
            </div>  
            <Modal isOpen={application.isOpenAdd} onRequestClose={() => SetApplication(prevState => ({...prevState, isOpenAdd: false}))}>
                <AddApplicationModal></AddApplicationModal>
            </Modal>
            <Modal isOpen={application.isOpenUpdate} onRequestClose={() => SetApplication(prevState => ({...prevState, isOpenUpdate: false}))}>
                <UpdateApplicationModal></UpdateApplicationModal>
            </Modal>
        </div>
    )
};