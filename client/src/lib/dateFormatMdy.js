export const dateFormatMdy = (dateStr) => {
    if (!dateStr) return ''

    const [year, month, day] = dateStr.split('-')
    return `${month}-${day}-${year}`
}