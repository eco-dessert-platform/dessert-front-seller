import { Button } from 'src/shared/lib/shadcn/components/ui/button.tsx'
import { useNavigate } from 'react-router'

const SampleIdPage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Button
                title={'페이지 이동'}
                onClick={() => {
                    navigate("/sample")
                }}
            >
                이전
            </Button>
        </div>
    )
}

export default SampleIdPage
