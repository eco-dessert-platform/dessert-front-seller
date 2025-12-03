import { useDispatch } from 'react-redux'
import { setSocialLoginType } from 'src/features/auth/store/authSlice'
import { openCenteredPopup } from 'src/shared/utils/popup'
import { setKakaoPopup } from 'src/features/auth/utils/popupManager'
import ButtonKakao from 'src/assets/icons/button/bbangle-kakao-button.svg?react'
import { KAKAO } from 'src/features/auth/locales/socialLogin'

const KakaoLoginButton = () => {
    const dispatch = useDispatch()

    const openKakaoLoginPopup = () => {
        const queryObject = {
            client_id: KAKAO.client_id,
            redirect_uri: KAKAO.redirect_uri,
            response_type: KAKAO.response_type,
        }

        const query = new URLSearchParams(queryObject as Record<string, string>)
        const url = `${KAKAO.authUrl}?${query}`

        console.log('Redirect URI:', KAKAO.redirect_uri)
        console.log('팝업 URL:', `${KAKAO.authUrl}?${query}`)

        const popup = openCenteredPopup(url, 'kakao-login', {
            width: 400,
            height: 650,
        })

        if (!popup) {
            console.error('팝업이 차단되었습니다.')
            return
        }

        setKakaoPopup(popup)
        dispatch(setSocialLoginType('KAKAO'))
    }

    return (
        <ButtonKakao onClick={openKakaoLoginPopup} className="cursor-pointer" />
    )
}

export default KakaoLoginButton
