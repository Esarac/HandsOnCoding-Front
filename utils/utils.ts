export function camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export function isValidDate(date: Date): boolean {
    if (Object.prototype.toString.call(date) === "[object Date]") {
        if (!isNaN(date.getTime())) {
            return true
        }
    }

    return false
}