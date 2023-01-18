import logos from "../assets/logos";
import { convertDate } from "./convertDate"
import { getOddsByBookmaker,getSpecificOdds } from "./getOddsByBookmaker";

export const convertTableData = (oddsData,bookie,liveData)=>{
    if(!bookie){
        return []
    }
    const newOddsData = []
    oddsData.forEach(game=>{
        game.odds = getOddsByBookmaker(game,bookie)
        game.startTime = convertDate(game.commence_time)
        const specificOdds = getSpecificOdds(game.odds,game.home_team,game.away_team,game,bookie)
        game = {...game,...specificOdds}
        game.awayLogo = logos?.[game.sport_title]?.[game.away_team]
        game.homeLogo = logos?.[game.sport_title]?.[game.home_team]

        if(liveData){

            liveData.events.forEach(liveGame=>{
                if (liveGame.name.includes(game.home_team) && liveGame.name.includes(game.away_team)) {

                    const homeTeam = liveGame.competitions[0].competitors.find(c => c.homeAway === "home")
                    const awayTeam = liveGame.competitions[0].competitors.find(c => c.homeAway === "away")
                    game.homeScore = homeTeam.score
                    game.awayScore = awayTeam.score
                    game.clock = liveGame.status.displayClock
                    game.period = liveGame.status.period
                    game.situation = liveGame.competitions[0]?.situation?.downDistanceText
                    game.homeLogo = homeTeam.team.logo
                    game.awayLogo = awayTeam.team.logo
                    game.broadcast = liveGame.competitions[0]?.broadcasts?.[0]?.names?.[0]
                }
            })
        }

        newOddsData.push(game)
    })

    return newOddsData
}