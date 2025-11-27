export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number,
): T & { cancel: () => void } {
    let timeoutId: ReturnType<typeof setTimeout>

    const debounced = function (this: any, ...args: Parameters<T>) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    } as T & { cancel: () => void }

    debounced.cancel = () => {
        clearTimeout(timeoutId)
    }

    return debounced
}
