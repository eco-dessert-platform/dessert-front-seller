export function debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number,
): T & { cancel: () => void } {
    let timeoutId: ReturnType<typeof setTimeout>

    const debounced = function (this: unknown, ...args: Parameters<T>) {
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
