"use client"

import { ReactNode } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

type ModalProps = {
    open: boolean
    onClose: () => void
    title: string
    description?: string
    children: ReactNode
}

export default function Modal({
    open,
    onClose,
    title,
    description,
    children,
}: ModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    )
}
