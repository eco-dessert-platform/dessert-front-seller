let kakaoPopup: Window | null = null
let googlePopup: Window | null = null

export const getKakaoPopup = () => kakaoPopup
export const setKakaoPopup = (popup: Window | null) => {
    kakaoPopup = popup
}
export const clearKakaoPopup = () => {
    kakaoPopup = null
}

export const getGooglePopup = () => googlePopup
export const setGooglePopup = (popup: Window | null) => {
    googlePopup = popup
}
export const clearGooglePopup = () => {
    googlePopup = null
}
