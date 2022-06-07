import { useState, useEffect} from "react"
import Airtable from "airtable"

interface InputFormProps {
    defaultValue?: string
}

const storageFromKey = 'inputValue'

// interface RMRResponseItem {
//     created: string;
//     episode: Array<string>
//     gender: string
//     id: number | string
//     image: string;
//     location: {name: string, url: string}
//     name: string
//     origin: {name: string, url: string}
//     species: string
//     status: string
//     type: string
//     url: string
// }

//const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY
//const dbId = process.env.REACT_APP_AIRTABLE_API_TEST_DB_ID
const tableName = 'Name'
//const base = new Airtable({apiKey}).base('%dbId');
const base = new Airtable({apiKey: 'key8xHK0JJ1qJPS8H'}).base('app0vDSvjkiTMxXEv');

export const InputForm = (props?: InputFormProps) => {
    const [displayError, setDisplayError] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [names, setNames]=useState<Array<string>>([])

    const formReadyToSubmit = !displayError || inputValue

    const handleInputChange= (event: any) => {
        const messageLength = event.target.value.length
        setInputValue(event.target.value)
        if (messageLength < 3 || messageLength >20) {
            if (messageLength < 3) {
                setErrorMessage('User name is too short')
            }
            if (messageLength > 20) {
                setErrorMessage('User name is too long')
            }
            setDisplayError(true)
        } else {
            setDisplayError(false)
            setErrorMessage('')
        }
    }

    const handleSubmit = () => {
        if (formReadyToSubmit) {
            handleSetNewRecord();
        }
    }

    const handleSetNewRecord = () => {
        base(tableName).create([
            {
                fields: {
                    Name: inputValue
            
                }
            },
        ], function (TableError, records: any){
            if (TableError){
                console.error(TableError);
                return;
            }
            // records.forEach(function (record: any){
            //     console.log(record);
            // });
            alert('Value saved in db, value: {records[0].Name}')
            setInputValue('')
            handleGetAllRecords()
        });
    }

    const handleGetAllRecords = () => {
            base(tableName)
            .select({})
            .eachPage(function page(records, fetchNextPage) {
                setNames(records.map(item=>item.fields.Name) as Array<string>)
                //console.log(records.map(item=>item.fields.Name))
                // records.forEach(function(record) {
                //     console.log('Retreived', record.get('Name'));
                // });
                fetchNextPage();
            }, function done(CallbackError) {
                if (CallbackError) {console.error(CallbackError); return;}
            });
        };

    // const handleAirtable = () => {
    //     base(tableName)
    //     .select({})
    //     .eachPage(function page(records, fetchNextPage) {
    //         records.forEach(function(record) {
    //             console.log('Retreived', record.get('Name'));
    //         });
    //         fetchNextPage();
    //     }, function done(CallbackError) {
    //         if (CallbackError) {console.error(CallbackError); return;}
    //     });
    // };
    // handleAirtable();

    useEffect(() => {
        let valueToSet =''
        const localStorageData = localStorage.getItem(storageFromKey)
        if (!!localStorageData) {
            valueToSet = localStorageData
        } else {
            if (!!props?.defaultValue) {
                valueToSet = props?.defaultValue
            }
        }
        setInputValue(valueToSet);
        handleGetAllRecords()
    }, [props])

    console.log(names)
    //key={'${index}-${item}'}

    return <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
        {displayError && <div style={{color: 'red'}}>{errorMessage}</div>}
        <div>User name:</div>
        <input onInput={handleInputChange} value={inputValue} type='text'></input>
        <button onClick={handleSubmit} disabled={!formReadyToSubmit}>Submit</button>
        <br></br>
        <ul>{names.map((item: string, index: number)=><li>{item}</li>)}</ul>
    </div>
}