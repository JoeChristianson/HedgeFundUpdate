import { useContext, useEffect, useState } from "react"
import { Context } from "../../../context"
import OddsTable from "../../elements/Table"
import SimpleInput from "../../elements/SimpleInput"
import { testOddsAPIKey } from "../../../utils/oddsAPI"
import "./index.css"
import { getLiveData } from "../../../utils/getLiveData"
import { getBookies } from "../../../utils/getBookies"

const Main = ()=>{
    const {setBookies,oddsAPIKey,setOddsAPIKey,liveData,oddsData,setCurrentBookie,bookies}=useContext(Context)
    const [message,setMessage] = useState(null)

    useEffect(()=>{
        if(!bookies){
            return
        }
        if(localStorage.getItem("oddsAPIKey2022")){
            setOddsAPIKey(localStorage.getItem("oddsAPIKey2022"))
        }
        if(localStorage.getItem("oddsAPIBookie2022")){
            const bookieName = localStorage.getItem("oddsAPIBookie2022")
            setCurrentBookie(bookies.find(l=>l.value===bookieName))

        }else{
            // const bookiesFromData = getBookies(oddsData)
            // setBookies(bookiesFromData)
            // setCurrentBookie(bookiesFromData[0])
        }
        
    },[])



    const handleOddsAPISubmit = async (value)=>{
        const res = await testOddsAPIKey(value)
        if(res.message){
            setMessage(res.message)
            return
        }
        localStorage.setItem("oddsAPIKey2022",value)
        setOddsAPIKey(value)
        window.localStorage.setItem("oddsAPIKey",value)
    }




    if(!oddsAPIKey){
        return (<main>
            {message&&<h3>{message}</h3>}
            <SimpleInput
            label="Enter Odds API Key"
            handleSubmit={handleOddsAPISubmit}
            >
            </SimpleInput>
            </main>
        )
    }

    if(!liveData||!oddsData){
        return<></>
    }

    
    return (
        <OddsTable
        testing={true}
        >

        </OddsTable>
    )
}

export default Main