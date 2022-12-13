import { useContext } from "react"
import { Context } from "../../../context"
import Selector from "../Selector";


const DropDownsCont = ()=>{
    const {refreshOdds,leagues,currentLeague,setCurrentLeague,bookies,currentBookie,setCurrentBookie,intervals,currentInterval,setCurrentInterval} = useContext(Context)
    
    const handleSetLeague = (e)=>{
      const newLeague = leagues.find(l=>l.value===e.target.value)

      setCurrentLeague(newLeague)

      setTimeout(()=>{
        refreshOdds(newLeague)},500)

    }

    const handleSetBookie = (e)=>{
      setCurrentBookie(bookies.find(l=>l.value===e.target.value))
    }

    const handleSetInterval = (e)=>{

      setCurrentInterval(intervals.find(l=>l.value===parseInt(e.target.value)))
    }

    return (
        <div className="dropdowns-cont">
          <Selector
            label="League"
            selected={currentLeague}
            options={leagues}
            onChange={handleSetLeague}
          ></Selector>
            {currentBookie&&        <Selector
            label="Bookmaker"
            selected={currentBookie}
            options={bookies}
            onChange={handleSetBookie}
          ></Selector>}
{currentInterval&&intervals&&            <Selector
            label="Refresh Interval"
            selected={currentInterval}
            options={intervals}
            onChange={handleSetInterval}
          ></Selector>}
      </div>
    )
}

export default DropDownsCont