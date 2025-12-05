import { useDispatch } from 'react-redux'
import { openCenteredPopup } from 'src/shared/utils/popup'
import { setGooglePopup } from 'src/features/auth/utils/popupManager'
import ButtonGoogle from 'src/assets/icons/button/bbangle-google-button.svg?react'
import { GOOGLE } from 'src/features/auth/locales/socialProvider'
import { authAction } from 'src/features/auth/store/authReducer'

const GoogleLoginButton = () => {
    const dispatch = useDispatch()

    const openGoogleLoginPopup = () => {
        const queryObject = {
            client_id: GOOGLE.client_id,
            redirect_uri: GOOGLE.redirect_uri,
            clientsecret: GOOGLE.clientsecret,
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
            return
        }

        setGooglePopup(popup)
        dispatch(authAction.setSocialLoginType('GOOGLE'))
    }

    return (
        <ButtonGoogle
            onClick={openGoogleLoginPopup}
            className="cursor-pointer"
        />
    )
}

export default GoogleLoginButton
