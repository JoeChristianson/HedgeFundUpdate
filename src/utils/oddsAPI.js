export const testOddsAPIKey = async (API_KEY)=>{
    const data = await getOddsAPIData(API_KEY,"americanfootball_nfl")
    return data
}

export const getOddsAPIData = async (API_KEY,sport)=>{
    const route = getOddsAPIRoute(sport,API_KEY)
    const resp = await fetch(route);
    const data = await resp.json()

    return data
}

export const getOddsAPIRoute=(sport,API_KEY)=>{
    const route = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`
    return route
}
