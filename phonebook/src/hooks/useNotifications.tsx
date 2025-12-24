import { useState } from "react"

export function useNotifications() {
    const [message, setMessage] = useState<string | null>(null) // Fixed: renamed from setErrorMessage
    const [isError, setIsError] = useState(false)


    const showMessage = (msg: string, error = false, duration = 5000) => {
        setMessage(msg)
        setIsError(error)
        setTimeout(() => {
            setMessage(null)
            setIsError(false)
        }, duration)
    }

    return {message, isError, showMessage}
}