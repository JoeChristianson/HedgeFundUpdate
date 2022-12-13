export const checkIfPast = (incomingDateString)=>{
    const incomingDate = new Date(incomingDateString)
    const currentDate = new Date()
    const incomingTime = incomingDate.getTime()
    const currentTime = currentDate.getTime()
    const hoursTill = (incomingTime-currentTime)/1000/60/60
    if(hoursTill<0){
        return true
    }
    else{
        return false
    }
}



// const incomingDate = "2022-12-11T18:00:00Z"
// checkIfPast(incomingDate)