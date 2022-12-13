export function convertDate(dateString) {
    let date;
    if (typeof dateString === "string") {
        date = new Date(dateString)
    } else {
        date = dateString
    }

    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.getDate()
    const hour = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12
    let minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes.toString()
    }
    const merd = date.getHours() < 12 ? "A.M" : "P.M."
    const reformatted = `${month} ${day} ${hour}:${minutes} ${merd}`
    return reformatted
}

export function convertSeconds(time){
    const minutes = Math.floor(time/60)
    const seconds = time%60
    return `${minutes}:${seconds<10?"0"+seconds:seconds}`
}