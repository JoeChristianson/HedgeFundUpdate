import { useContext, useEffect } from "react"
import { Context } from "../../../context"
import { oddsAPIData } from "../../../demo/data"
import { convertTableData } from "../../../utils/covertTableData"
import { getBookies } from "../../../utils/getBookies"
import "./index.css"

const OddsTable = ({testing,data})=>{
    const {currentBookie,setBookies,setCurrentBookie,oddsData,liveData} = useContext(Context)

    useEffect(()=>{
        const bookiesFromData = getBookies(oddsData)
        setBookies(bookiesFromData)
        setCurrentBookie(bookiesFromData[0])
    },[])
    const tableData = convertTableData(oddsData,currentBookie,liveData)
    return(
        <table cellPadding="0" cellSpacing="0">
        <thead>
        <tr>
        <th colSpan="7"></th>

        <th colSpan="3">Spread</th>
        <th colSpan="3">Money Line</th>
        <th colSpan="3">Over/Under</th>
        </tr>
            <tr>
        <th>Start Time</th>
        <th>Matchup</th>
        <th>Period</th>
        <th >Clock</th>
        <th >Situation</th>
        <th >Score</th>
        <th >Total Points</th>
        <th>Current</th>
        <th>Closing</th>
        <th>Change</th>
        <th>Current</th>
        <th>Closing</th>
        <th>Change</th>
        <th>Current</th>
        <th>Closing</th>
        <th>Change</th>
        </tr>
        </thead>
        <tbody>
        {tableData.map((row,key)=>{
            console.log("row",row)
            return(
                <tr key={key}>
                <td>{row.startTime}<br></br>{row.broadcast}</td>
                <td  className="name-and-logo">
                <img src={row.awayLogo}></img>
                {row.away_team} at
                <img src={row.homeLogo}></img>
                {row.home_team}</td>
                <td>{row.period}</td>
                <td>{row.clock}</td>
                <td>{row.situation}</td>
                <td>{row.awayScore} - {row.homeScore}</td>
                <td>{row.awayScore!==undefined?(parseInt(row.awayScore)+parseInt(row.homeScore)):"-"}</td>
                <td>{row.awaySpread}<br></br>{row.homeSpread}</td>
                <td>{row.closing_awaySpread}<br></br>{row.closing_homeSpread}</td>
                <td>{row.closing_awaySpread-row.awaySpread}<br></br>{row.closing_homeSpread-row.homeSpread}</td>
                <td>{row.awayLine}<br></br>{row.homeLine}</td>
                <td>{row.closing_awayLine}<br></br>{row.closing_homeLine}</td>
                <td>{row.closing_awayLine-row.awayLine}<br></br>{row.closing_homeLine-row.homeLine}</td>
                <td>{row.overUnder}</td>
                <td>{row.closing_overUnder}</td>
                <td>{row.closing_overUnder-row.overUnder}</td>
                </tr>
            )}
        )}
        </tbody>
        </table>
    )
}

export default OddsTable