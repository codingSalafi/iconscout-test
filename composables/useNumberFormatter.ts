export function useNumberFormatter(locale = 'en-US', options: Intl.NumberFormatOptions = {}) {
    const formatter = new Intl.NumberFormat(locale, options)

    
    function format(value: number | string): string {
        const num = typeof value === 'number'
            ? value
            : parseFloat(value.toString().replace(/,/g, ''))

        if (!isFinite(num)) {
            return value.toString()
        }

        return formatter.format(num)
    }

    return { format }
}
