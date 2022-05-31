import {useState, useEffect, useCallback} from "react";


interface InputFormProps {
    defaultValue?: string;
    props?: string;
}

const storageFormKey = 'inputValue';


export const InputForm = (props?: InputFormProps) => {
    const [displayError, setDisplayError] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('pusta wartość')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const formReadyToSubmit = !(displayError || !inputValue);

    const handleInputChange = (event: any) => {
        const messageLength = event.target.value.length;
        setInputValue(event.target.value);
        if (messageLength < 3 || messageLength > 20) {
            if (messageLength < 3) {
                setErrorMessage('User name is to short')
            }

            if (messageLength > 20) {
                setErrorMessage('User name is to long')
            }

            setDisplayError(true)
        } else {
            setDisplayError(false)
            setErrorMessage('')
        }
    }

    const handleSubmit = useCallback(() => {
        if (formReadyToSubmit) {
            localStorage.setItem(storageFormKey, inputValue)
        }
    }, [inputValue, formReadyToSubmit])

    useEffect(() => {
        let valueToSet = '';
        const localStorageData = localStorage.getItem(storageFormKey)
        if (!!localStorageData) {
            valueToSet = localStorageData;
        } else {
            if (!!props?.defaultValue) {
                valueToSet = props.defaultValue;
            }
        }

        setInputValue(valueToSet);
    }, [props])

    return <div style={{display: "flex", flexDirection: 'column'}}>
        {displayError && <div style={{color: 'red' }}>{errorMessage}</div>}
        <div>User name:</div><br/>
        <input onInput={handleInputChange} value={inputValue} type="text"/>
        <br/>
        <button onClick={handleSubmit} disabled={!formReadyToSubmit}>Log in</button>
    </div>
}
export {}