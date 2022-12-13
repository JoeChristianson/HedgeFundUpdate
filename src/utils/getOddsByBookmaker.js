import { checkIfPast } from "./compareTime"

export const getOddsByBookmaker = (game,bookie)=>{
    const bookmaker = game.bookmakers.find(b=>{
        return (b.key===bookie.value)
    })

    const odds = bookmaker?.markets
    return odds
}

export const getSpecificOdds = (odds,home_team,away_team,game,bookie)=>{
    if(!Array.isArray(odds)){
        return {homeLine:"",awayLine:"",homeSpread:"",awaySpread:"",overUnder:""}
    }
    const homeLine = odds.find(o=>o.key==="h2h")?.outcomes.find(o=>o.name===home_team)?.price||""
    const awayLine = odds.find(o=>o.key==="h2h")?.outcomes.find(o=>o.name===away_team)?.price||""
    const homeSpread = odds.find(o=>o.key==="spreads")?.outcomes.find(o=>o.name===home_team)?.point||""
    const awaySpread = odds.find(o=>o.key==="spreads")?.outcomes.find(o=>o.name===away_team)?.point||""
    const overUnder = odds.find(o=>o.key==="totals")?.outcomes.find(o=>o.name==="Over")?.point||""

    const allOdds = {
        homeLine,
        awayLine,
        homeSpread,
        awaySpread,overUnder
    }
    
    // if(checkIfPast(game.commence_time)){
        const pastOddsGame = JSON.parse(localStorage.getItem("pastOdds")).find(g=>g.id===game.id);
        const pastGameOdds = getOddsByBookmaker(pastOddsGame,bookie)
        game.closing_homeLine = pastGameOdds.find(o=>o.key==="h2h")?.outcomes.find(o=>o.name===home_team)?.price||""
        game.closing_awayLine = pastGameOdds.find(o=>o.key==="h2h")?.outcomes.find(o=>o.name===away_team)?.price||""
        game.closing_homeSpread = pastGameOdds.find(o=>o.key==="spreads")?.outcomes.find(o=>o.name===home_team)?.point||""
        game.closing_awaySpread = pastGameOdds.find(o=>o.key==="spreads")?.outcomes.find(o=>o.name===away_team)?.point||""
        game.closing_overUnder = pastGameOdds.find(o=>o.key==="totals")?.outcomes.find(o=>o.name==="Over")?.point||""
    // }
    
    return allOdds
}


export const getPastOddsByBookmaker = ()=>{

}