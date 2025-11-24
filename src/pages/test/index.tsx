import BgrButton from 'src/shared/components/button/BgrButton'
import BgrInput from 'src/shared/components/input/BgrInput'
import BgrInputField from 'src/shared/inputField/BgrInputField'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogHeader,
    AlertDialogTrigger,
} from 'src/shared/lib/shadcn/components/ui/alert-dialog'

export default function Test() {
    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-4 text-center">
                <div className="flex flex-col items-center gap-4">
                    <BgrButton size="sm" title="primary-filled sm" />
                    <BgrButton size="md" title="primary-filled md" />
                    <BgrButton size="lg" title="primary-filled lg" />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <BgrButton
                        size="sm"
                        title="primary-outlined sm"
                        variant="primary-outlined"
                    />
                    <BgrButton
                        size="md"
                        title="primary-outlined md"
                        variant="primary-outlined"
                    />
                    <BgrButton
                        size="lg"
                        title="primary-outlined lg"
                        variant="primary-outlined"
                    />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <BgrButton
                        size="sm"
                        title="secondary sm"
                        variant="secondary-filled"
                    />
                    <BgrButton
                        size="md"
                        title="secondary md"
                        variant="secondary-filled"
                    />
                    <BgrButton
                        size="lg"
                        title="secondary lg"
                        variant="secondary-filled"
                    />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <BgrButton
                        size="sm"
                        title="secondary-outlined sm"
                        variant="secondary-outlined"
                    />
                    <BgrButton
                        size="md"
                        title="secondary-outlined md"
                        variant="secondary-outlined"
                    />
                    <BgrButton
                        size="lg"
                        title="secondary-outlined lg"
                        variant="secondary-outlined"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4 text-center">
                <div className="flex flex-col items-center gap-4">
                    <BgrButton
                        size="sm"
                        title="primary-filled sm"
                        roundedFull
                    />
                    <BgrButton
                        size="md"
                        title="primary-filled md"
                        roundedFull
                    />
                    <BgrButton
                        size="lg"
                        title="primary-filled lg"
                        roundedFull
                    />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <BgrButton
                        size="sm"
                        title="primary-outlined sm"
                        variant="primary-outlined"
                        roundedFull
                    />
                    <BgrButton
                        size="md"
                        title="primary-outlined md"
                        variant="primary-outlined"
                        roundedFull
                    />
                    <BgrButton
                        size="lg"
                        title="primary-outlined lg"
                        variant="primary-outlined"
                        roundedFull
                    />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <BgrButton
                        size="sm"
                        title="secondary sm"
                        variant="secondary-filled"
                        roundedFull
                    />
                    <BgrButton
                        size="md"
                        title="secondary md"
                        variant="secondary-filled"
                        roundedFull
                    />
                    <BgrButton
                        size="lg"
                        title="secondary lg"
                        variant="secondary-filled"
                        roundedFull
                    />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <BgrButton
                        size="sm"
                        title="secondary-outlined sm"
                        variant="secondary-outlined"
                        roundedFull
                    />
                    <BgrButton
                        size="md"
                        title="secondary-outlined md"
                        variant="secondary-outlined"
                        roundedFull
                    />
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <BgrButton
                                size="lg"
                                title="secondary-outlined lg"
                                variant="secondary-outlined"
                                roundedFull
                            />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Alert Dialog
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Alert Dialog Description
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <BgrInputField
                label="Label"
                helperText="helperText"
                required
                placeholder="placeholder"
                buttonText="buttonText"
                onButtonClick={() => {}}
            />

            <BgrInputField
                label="Label"
                helperText="helperText"
                required
                error={true}
                errorMessage="errorMessage"
                placeholder="placeholder"
                buttonText="buttonText"
                onButtonClick={() => {}}
            />
        </div>
    )
}
