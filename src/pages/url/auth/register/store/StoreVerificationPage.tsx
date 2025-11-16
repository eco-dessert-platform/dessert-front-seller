import AuthContentWrapper from 'src/features/auth/components/layout/AuthContentWrapper'
import AuthPageContainer from 'src/features/auth/components/layout/AuthPageContainer'
import {
    Section,
    SectionContent,
    SectionHeader,
} from 'src/features/auth/components/layout/AuthPageWrapper'
import { AuthProcessStep } from 'src/features/auth/components/layout/AuthProcessStep'
import FormColumn from 'src/features/auth/components/layout/FormColumn'
import { ProfileUpload } from 'src/features/auth/components/ProfileUpload'
import {
    TermsAllAgree,
    TermsCheckbox,
    TermsContentSection,
} from 'src/features/auth/components/ui/check/TermsCheckbox'
import AddressInput from 'src/shared/components/inputs/AddressInput'
import EmailInput from 'src/shared/components/inputs/EmailInput'
import FormInput from 'src/shared/components/inputs/FormInput'
import FormInputWithButton from 'src/shared/components/inputs/FormInputWithButton'
import {
    PRIVACY_POLICY,
    TERMS_OF_SERVICE,
} from 'src/features/auth/data/termsMockData.tsx'
import BgrActionButtons from 'src/shared/components/button/BgrActionButtons'
import BgrHeader from 'src/shared/layout/BgrHeader'

const StoreVerificationPage = () => {
    return (
        <AuthPageContainer>
            <BgrHeader borderBottom={false} />
            <AuthProcessStep currentStep={2} />

            <AuthContentWrapper>
                {/* 스토어 정보 등록 */}
                <Section>
                    <SectionHeader title="스토어 정보 등록" />
                    <SectionContent>
                        <FormInputWithButton
                            label="스토어명"
                            required
                            placeholder="스토어를 검색해주세요"
                            buttonText="검색"
                            onButtonClick={() => console.log('검색')}
                            disabled
                        />
                    </SectionContent>

                    {/* 프로필 + 연락처/이메일/주소 */}
                    <div className="flex items-start self-stretch pb-4">
                        {/* 프로필 */}
                        <div className="flex h-[398px] flex-col items-start gap-2 px-5 py-2.5">
                            <ProfileUpload />
                            <FormInput
                                label="한줄소개"
                                placeholder="스토어 소개를 작성해주세요"
                                className="w-[220px]"
                            />
                        </div>

                        {/* 연락처/이메일/주소 */}
                        <div className="items- flex flex-1/2 flex-col items-start justify-center self-stretch">
                            {/* 연락처 */}
                            <div className="flex items-start gap-4 self-stretch px-5">
                                <FormColumn>
                                    <FormInput
                                        label="연락처"
                                        required
                                        placeholder="하이픈(-) 없이 입력해주세요"
                                        helperText="연락처는 주문서 혹은 상품 페이지 하단에서 고객이 확인할 수 있어요"
                                    />
                                </FormColumn>

                                <FormColumn>
                                    <FormInput
                                        label="추가 연락처"
                                        placeholder="하이픈(-) 없이 입력해주세요"
                                    />
                                </FormColumn>
                            </div>

                            {/* 이메일 */}
                            <div className="flex items-end gap-4 self-stretch px-5 py-2.5">
                                <EmailInput label="이메일" required />
                            </div>

                            {/* 주소 */}
                            <AddressInput
                                onPostalCodeSearch={() =>
                                    console.log('우편번호 검색')
                                }
                                onDetailAddressChange={(value) =>
                                    console.log(value)
                                }
                            />
                        </div>
                    </div>
                </Section>

                {/* 이용 약관 동의 */}
                <Section className="w-[1048px]">
                    <div className="flex items-center justify-between self-stretch px-5 py-4">
                        <p className="text-heading-20-sb w-[128px] text-gray-900">
                            이용 약관 동의
                        </p>
                    </div>

                    <div className="flex flex-col items-start self-stretch px-5 py-3">
                        <div className="flex flex-col items-start gap-4 self-stretch">
                            <TermsAllAgree
                                checked={false}
                                onChange={(checked) => console.log(checked)}
                            />

                            <TermsCheckbox
                                label={TERMS_OF_SERVICE.label}
                                required={TERMS_OF_SERVICE.required}
                                checked={false}
                                onChange={(checked) => console.log(checked)}
                                content={
                                    <>
                                        {TERMS_OF_SERVICE.sections.map(
                                            (section, index) => (
                                                <TermsContentSection
                                                    key={index}
                                                    title={section.title}
                                                >
                                                    {section.content}
                                                </TermsContentSection>
                                            ),
                                        )}
                                    </>
                                }
                            />

                            <TermsCheckbox
                                label={PRIVACY_POLICY.label}
                                required={PRIVACY_POLICY.required}
                                checked={false}
                                onChange={(checked) => console.log(checked)}
                                content={
                                    <>
                                        {PRIVACY_POLICY.sections.map(
                                            (section, index) => (
                                                <TermsContentSection
                                                    key={index}
                                                    title={section.title}
                                                >
                                                    {section.content}
                                                </TermsContentSection>
                                            ),
                                        )}
                                    </>
                                }
                            />
                        </div>
                    </div>
                </Section>
            </AuthContentWrapper>

            <BgrActionButtons
                onBack={() => console.log('뒤로가기')}
                onNext={() => console.log('다음')}
            />
        </AuthPageContainer>
    )
}

export default StoreVerificationPage
