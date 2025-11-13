export const timeFormat12h = (time24) => {
    const [hourStr, minute] = time24.split(':')
    let hour = parseInt(hourStr, 10)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12
    if (hour === 0) hour = 12
    return `${hour}:${minute} ${ampm}`
}