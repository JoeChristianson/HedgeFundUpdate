import { checkIfPast } from "./compareTime"
const saveClosingOdds = (newOdds)=>{
    const pastOdds = JSON.parse(localStorage.getItem("pastOdds"))||[]
    for(let game of newOdds){
        if(!pastOdds.find(pastOdd=>(pastOdd.id)===game.id)){
            pastOdds.push(game)
        }else if(!checkIfPast(game.commence_time)){
            const pastOddsGame = pastOdds.find(pastOdd=>(pastOdd.id)===game.id)
            pastOddsGame.bookmakers = game.bookmakers
        }
    }
    const stringifiedOdds = JSON.stringify(pastOdds)
    localStorage.setItem("pastOdds",stringifiedOdds)
}

export default saveClosingOdds