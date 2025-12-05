import { authAction } from 'src/features/auth/authReducer.ts'
import { openCenteredPopup } from 'src/shared/utils/popup'
import { setKakaoPopup } from 'src/features/auth/utils/popupManager'
import ButtonKakao from 'src/assets/icons/button/bbangle-kakao-button.svg?react'
import { KAKAO } from 'src/features/auth/locales/socialLogin'
import { useAppDispatch } from 'src/global/store/redux/reduxHooks'
import { toast } from 'react-toastify'

const KakaoLoginButton = () => {
    const dispatch = useAppDispatch()

    const openKakaoLoginPopup = () => {
        const queryObject = {
            client_id: KAKAO.client_id,
            redirect_uri: KAKAO.redirect_uri,
            response_type: KAKAO.response_type,
        }

        const query = new URLSearchParams(queryObject as Record<string, string>)
        const url = `${KAKAO.authUrl}?${query}`

        const popup = openCenteredPopup(url, 'kakao-login', {
            width: 400,
            height: 650,
        })

        if (!popup) {
            toast.error('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.')
            return
        }

        setKakaoPopup(popup)
        dispatch(authAction.setSocialLoginType('KAKAO'))
    }

    return (
        <ButtonKakao onClick={openKakaoLoginPopup} className="cursor-pointer" />
    )
}

export default KakaoLoginButton
