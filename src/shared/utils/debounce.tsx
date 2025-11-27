export function debounce<Args extends unknown[], R = void>(
    fn: (...args: Args) => R,
    delay: number,
): ((...args: Args) => void) & { cancel: () => void } {
    let timeoutId: ReturnType<typeof setTimeout>

    const debounced = function (...args: Args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            fn(...args)
        }, delay)
    }

    debounced.cancel = () => {
        clearTimeout(timeoutId)
    }

    return debounced
}
