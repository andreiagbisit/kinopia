export const dateFormat = (date) => {
    return new Date(date).toLocaleString('en-PH', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}