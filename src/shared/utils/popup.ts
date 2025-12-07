interface PopupOptions {
    width?: number
    height?: number
}

export const openCenteredPopup = (
    url: string,
    title: string = '_blank',
    options: PopupOptions = {},
): Window | null => {
    const { width = 400, height = 650 } = options

    const dualScreenLeft = window.screenLeft ?? window.screenX
    const dualScreenTop = window.screenTop ?? window.screenY

    const screenWidth =
        window.innerWidth ??
        document.documentElement.clientWidth ??
        screen.width
    const screenHeight =
        window.innerHeight ??
        document.documentElement.clientHeight ??
        screen.height

    const systemZoom = screenWidth / window.screen.availWidth
    const left = (screenWidth - width) / 2 / systemZoom + dualScreenLeft
    const top = (screenHeight - height) / 2 / systemZoom + dualScreenTop

    const features = `
        width=${width},
        height=${height},
        top=${top},
        left=${left},
        toolbar=no,
        location=no,
        directories=no,
        status=no,
        menubar=no,
        scrollbars=yes,
        resizable=yes,
        copyhistory=no
    `.replace(/\s/g, '')

    return window.open(url, title, features)
}
