import DropDownsCont from "../../elements/DropDownsCont"
import Button from "../../elements/Button"
import "./index.css"
import { useContext, useEffect, useState } from "react"
import { Context } from "../../../context"
import {convertSeconds,convertDate} from "../../../utils/convertDate"

function Header(){
    const {refreshOdds,setOddsAPIKey,setLiveData,oddsAPIKey,currentLeague,setOddsData,setBookies,bookies,currentBookie,setCurrentBookie,currentInterval,lastRefreshed,setlastRefreshed} = useContext(Context)
    const [timeRemaining,setTimeRemaining] = useState(3600)
    const [additionalClass,setAdditionalClass] = useState("")

    useEffect(()=>{
        refreshOdds()
    },[currentLeague])

    useEffect(()=>{
        if(currentInterval?.value){
            setTimeRemaining(currentInterval.value)
        }
    },[currentInterval])

    useEffect(()=>{
        if(timeRemaining<0){
            setAdditionalClass("flash")
            setTimeout(()=>setAdditionalClass(""),500)
            setlastRefreshed(Date.now())
            setTimeRemaining(currentInterval.value)
            refreshOdds()
        }
        const intervalSet = setInterval(()=>{
            setTimeRemaining(timeRemaining-1)
        },1000)
        return ()=>clearInterval(intervalSet)

    },[timeRemaining])

    useEffect(()=>{
        if(oddsAPIKey){
            refreshOdds()
        }
    },[oddsAPIKey])

    const handleResetKey = ()=>{
        setOddsAPIKey(undefined)
    }

    

    return(
        <header className={`d-flex ${additionalClass}`}>
        <h1 className="px-4">Hedge Fund</h1>
        <DropDownsCont></DropDownsCont>
        <Button
        text="Refresh"
        handleClick={()=>refreshOdds(currentLeague)}
        additionalClasses="success"
        ></Button>
  <div id="refresh-data">
        <h4>Refreshing in: {convertSeconds(timeRemaining)}<span id="seconds-to-refresh"></span></h4>
        <h4>Last Refreshed: {lastRefreshed&&convertDate(new Date(lastRefreshed))}<span className="last-refreshed"></span></h4>
  </div>

          <button onClick={handleResetKey} id="reset-key-btn" className="danger">Reset Key</button>
      </header>
    )
}

export default Header