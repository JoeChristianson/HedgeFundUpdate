import {createContext,useState} from "react"
import { oddsAPIData,demoLiveData } from "../demo/data"
import { getOddsAPIData } from "../utils/oddsAPI"
import {getBookies} from "../utils/getBookies"
import {getLiveData} from "../utils/getLiveData"
import saveClosingOdds from "../utils/savePastOdds"

export const Context = createContext()

export function ContextProvider({children}){

// For Leagues
   const leagues = [{value:"nfl",text:"NFL",oddsAPIKey:"americanfootball_nfl",espnSport:"football",espnLeague:"nfl"},{value:"ncaaf",text:"NCAAF",oddsAPIKey:"americanfootball_ncaaf",espnSport:"football",espnLeague:"college-football"},{value:"nba",oddsAPIKey:"basketball_nba",text:"NBA",espnSport:"basketball",espnLeague:"nba"}]
   const [currentLeague,setCurrentLeague] = useState(leagues.find(l=>l.value==="nfl"))

// For Bookies
    const [bookies,setBookies] = useState()
    const [currentBookie,setCurrentBookie] = useState()

// Fur Timers
    const intervals = [
        {value:5,text:"5 seconds"},
        {value:30,text:"30 seconds"},
        {value:60,text:"One Minute"},
        {value:120,text:"Two Minutes"},
        {value:300,text:"Five Minutes"},
        {value:600,text:"Ten Minutes"},
        {value:1800,text:"Half Hour"},
        {value:3600,text:"Hour"},
    ]
    const [currentInterval,setCurrentInterval] = useState(intervals.find(l=>l.value===3600))


    // For API_Keys
    const [oddsAPIKey,setOddsAPIKey] = useState(null)

    const [oddsData,setOddsData]=useState(null)
    const [liveData,setLiveData] = useState(null)
    const [lastRefreshed,setlastRefreshed] = useState(null)

    const refreshOdds = async (passedLeague)=>{
        const league = passedLeague||currentLeague
        // const league = currentLeague
        const oddsData = await getOddsAPIData(oddsAPIKey,league.oddsAPIKey)
        saveClosingOdds(oddsData)
        const newBookies = getBookies(oddsData)
        setBookies(newBookies)
        setCurrentBookie(newBookies[0])
        setOddsData(oddsData)
        const liveData = await getLiveData(currentLeague.espnSport,currentLeague.espnLeague)
        setLiveData(liveData)
    }

    return(
        <Context.Provider value={{refreshOdds,liveData,setLiveData,leagues,currentLeague,setCurrentLeague,bookies,setBookies,currentBookie,setCurrentBookie,intervals,currentInterval,setCurrentInterval,oddsAPIKey,setOddsAPIKey,oddsData,setOddsData,lastRefreshed,setlastRefreshed,refreshOdds}}>
            {children}
        </Context.Provider>
    )
}
