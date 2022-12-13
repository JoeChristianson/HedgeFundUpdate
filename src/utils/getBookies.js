export const getBookies = (oddsData)=>{
    const bookies = oddsData[0].bookmakers.map(bookmaker=>{
        return{value:bookmaker.key,text:bookmaker.title}})
    return bookies
}