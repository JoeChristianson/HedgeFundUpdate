export const getBookies = (oddsData)=>{
    if(!oddsData[0]){
        alert("No games")
        return []
    }
    const bookies = oddsData[0].bookmakers.map(bookmaker=>{
        return{value:bookmaker.key,text:bookmaker.title}})
    return bookies
}