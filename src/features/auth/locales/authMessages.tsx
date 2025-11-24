export const AUTH_MESSAGES = {
    LOGIN: {
        TITLE: '🎉 환영합니다',
        DESCRIPTION: (
            <>
                빵그리의 오븐 판매자 채널입니다. <br />
                로그인 또는 회원가입을 진행하시려면 아래 버튼을 눌러주세요.
            </>
        ),
    },
    REGISTER_SUCCESS: {
        TITLE: '🎉 회원가입 완료',
        DESCRIPTION: (
            <>
                빵그리의 오븐 판매자 채널에 가입해 주셔서 진심으로 감사드립니다.
                <br />
                고객님의 가입 정보는 확인 후 승인 절차를 거치게 되며,
                <br />
                승인까지는 영업일 기준 1~2일 정도 소요됩니다.
                <br />
                승인될 때까지 조금만 기다려 주세요.
            </>
        ),
    },
} as const
