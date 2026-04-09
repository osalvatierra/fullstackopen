import { createContext, useContext, useState, ReactNode } from "react"

interface NotificationContexType {
    message: string | null
    isError: boolean
    showMessage: (msg: string, error?: boolean, duration?: number) => void
}

const NotificationContext = createContext<NotificationContexType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState<string | null>(null)
    const [isError, setIsError] = useState(false)

    const showMessage = (msg: string, error = false, duration = 5000) => {
        setMessage(msg)
        setIsError(error)
        setTimeout(() => {
            setMessage(null)
            setIsError(false)
        }, duration)
    }

    return (
        <NotificationContext.Provider value={{ message, isError, showMessage }}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotifications() {
    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error('useNotifications must be used within NotificationProvider')
    }
    return context
}