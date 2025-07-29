import {
    BgrTabs,
    BgrTabsList,
    BgrTabsTrigger,
    BgrTabsContent,
} from 'src/shared/components/tab/BGRtab.tsx'

const Orders = () => {
    const data = {
        전체: '10',
        결제완료: '5',
    }

    return (
        <BgrTabs defaultValue="account" className="w-[400px]">
            <BgrTabsList>
                <BgrTabsTrigger number={1} value="account">
                    Account
                </BgrTabsTrigger>
                <BgrTabsTrigger value="password">Password</BgrTabsTrigger>
            </BgrTabsList>
            <BgrTabsContent value="account">
                Make changes to your account here.
            </BgrTabsContent>
            <BgrTabsContent value="password">
                Change your password here.
            </BgrTabsContent>
        </BgrTabs>
    )
}

export default Orders
