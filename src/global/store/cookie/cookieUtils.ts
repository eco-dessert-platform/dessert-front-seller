export const setCookie = (name: string, value: string, expires: Date) => {
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

export const getCookie = (name: string): string | null => {
    const matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') +
                '=([^;]*)',
        ),
    )
    return matches ? decodeURIComponent(matches[1]) : null
}

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export const getExpFromToken = (token: string): Date => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return new Date(payload.exp * 1000)
    } catch {
        return new Date(Date.now() + 3600 * 1000)
    }
}
