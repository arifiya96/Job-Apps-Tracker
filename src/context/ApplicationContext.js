import React, {useState, createContext} from 'react';

export const ApplicationContext = createContext();

export const ApplicationProvider = (props) => {
    const [application, SetApplication] = useState({
        position: null,
        company: null,
        yoe: 0,
        industry: null,
        city: null,
        country: null,
        salary: 0,
        status: null,
        application_id: null,
        rows: [],
        isOpenAdd: false,
        isOpenUpdate: false
    });
    return (
        <ApplicationContext.Provider value={[application, SetApplication]}>
            {props.children}
        </ApplicationContext.Provider>
    )
}
