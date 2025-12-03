import { useDispatch } from 'react-redux'
import { setSocialLoginType } from 'src/features/auth/store/authSlice'
import { openCenteredPopup } from 'src/shared/utils/popup'
import { setGooglePopup } from 'src/features/auth/utils/popupManager'
import ButtonGoogle from 'src/assets/icons/button/bbangle-google-button.svg?react'
import { GOOGLE } from 'src/features/auth/locales/socialLogin'

const GoogleLoginButton = () => {
    const dispatch = useDispatch()

    const openGoogleLoginPopup = () => {
        const queryObject = {
            client_id: GOOGLE.client_id,
            redirect_uri: GOOGLE.redirect_uri,
            response_type: GOOGLE.response_type,
            scope: GOOGLE.scope,
        }

        const query = new URLSearchParams(queryObject as Record<string, string>)
        const url = `${GOOGLE.authUrl}?${query}`

        const popup = openCenteredPopup(url, 'google-login', {
            width: 500,
            height: 650,
        })

        if (!popup) {
            console.error('팝업이 차단되었습니다.')
            return
        }

        setGooglePopup(popup)
        dispatch(setSocialLoginType('GOOGLE'))
    }

    return (
        <ButtonGoogle
            onClick={openGoogleLoginPopup}
            className="cursor-pointer"
        />
    )
}

export default GoogleLoginButton
