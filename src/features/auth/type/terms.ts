import { ReactNode } from 'react'

export interface TermsSection {
    title: string
    content: ReactNode
}

export interface TermsData {
    label: string
    required: boolean
    sections: TermsSection[]
}
