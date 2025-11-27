import AuthContentWrapper from 'src/features/auth/components/layout/AuthContentWrapper'
import AuthPageContainer from 'src/features/auth/components/layout/AuthPageContainer'
import {
    Section,
    SectionContent,
    SectionHeader,
} from 'src/features/auth/components/layout/AuthPageWrapper'
import { AuthProcessStep } from 'src/features/auth/components/layout/AuthProcessStep'
import FormColumn from 'src/features/auth/components/layout/FormColumn'
import FormRow from 'src/features/auth/components/layout/FormRow'
import FileUploadInput from 'src/shared/components/input/FileUploadInput'
import BgrInput from 'src/shared/components/input/BgrInput'
import BgrActionButtons from 'src/shared/components/button/BgrActionButtons'
import BgrHeader from 'src/shared/layout/BgrHeader'
import BgrInputField from 'src/shared/components/inputField/BgrInputField'

const SellerVerificationPage = () => {
    return (
        <AuthPageContainer>
            <BgrHeader borderBottom={false} />
            <AuthProcessStep currentStep={1} />

            <AuthContentWrapper>
                {/* 필수 서류 등록 */}
                <Section>
                    <SectionHeader
                        title="필수 서류 등록"
                        description="파일은 10MB 이하의 jpg, jpeg, png, pdf만 등록이 가능해요"
                    />
                    <SectionContent>
                        <FileUploadInput
                            label="사업자 등록증"
                            required
                            placeholder="사업자 등록증을 업로드해주세요"
                        />
                        <FileUploadInput
                            label="통신판매업 신고증"
                            required
                            placeholder="통신판매업 신고증을 업로드해주세요"
                        />
                        <FileUploadInput
                            label="즉석식품제조가공업 & 식품제조업"
                            required
                            placeholder="즉석식품제조가공업 & 식품제조업을 업로드해주세요"
                        />
                    </SectionContent>
                </Section>

                {/* 사업자 명의 계좌인증 */}
                <Section>
                    <SectionHeader
                        title="사업자 명의 계좌인증"
                        description="사업자 명의의 통장 사본과 일치하는 계좌번호로 인증해주세요"
                    />
                    <SectionContent>
                        <FileUploadInput
                            label="사업자 명의 통장사본"
                            required
                            placeholder="대표자명 혹은 사업자명의 통장 사본을 업로드해주세요(10MB 이하의 jpg, jpeg, png, pdf)"
                            helperText="예금주는 대표자명 혹은 사업자명과 일치하는 계좌번호만 인증이 가능해요"
                        />

                        <FormRow>
                            <FormColumn>
                                <BgrInput
                                    label="은행명"
                                    placeholder="은행명"
                                    disabled
                                />
                            </FormColumn>

                            <FormColumn>
                                <BgrInputField
                                    label="계좌번호"
                                    placeholder="계좌번호"
                                    buttonText="계좌인증"
                                    onButtonClick={() =>
                                        console.log('계좌인증')
                                    }
                                    disabled
                                />
                            </FormColumn>
                        </FormRow>
                    </SectionContent>
                </Section>
            </AuthContentWrapper>

            <BgrActionButtons
                onNext={() => console.log('다음')}
                nextDisabled={false}
                showBack={false}
            />
        </AuthPageContainer>
    )
}

export default SellerVerificationPage
