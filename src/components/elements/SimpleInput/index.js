import { useState } from "react";

const SimpleInput = ({label,handleSubmit})=>{

    const [inputValue,setInputValue] = useState("")

    const handleSubmitForm = (e)=>{
        e.preventDefault()

        handleSubmit(e.target[0].value)
        setInputValue("")
    }

    return(
        <form onSubmit={handleSubmitForm}>
            <label>{label}</label>
            <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)}></input>
            <button>Submit</button>
        </form>
    )
}

export default SimpleInput