export const getLiveData = async (sportKey,leagueKey)=>{
    const route = `https://site.api.espn.com/apis/site/v2/sports/${sportKey}/${leagueKey}/scoreboard`
    const resp = await fetch(route)
    const data = await resp.json()
    console.log(`live data for ${leagueKey} ${sportKey}`,data)
    return data
}