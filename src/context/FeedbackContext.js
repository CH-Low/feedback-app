import { createContext, useState, useEffect, useRef} from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });

    const abortControllerRef = useRef(new AbortController())
    useEffect(() => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        
        const url = new URL('/feedback', document.baseURI)
        url.searchParams.set('_sort', 'id')
        url.searchParams.set('_order', 'desc')

        const fetchFeedback = async () => {
            const response = await fetch(url, {signal:abortControllerRef.signal})
            const data = await response.json()
            setFeedback(data)
            setIsLoading(false)
        }
        fetchFeedback()
    }, [abortControllerRef])



    const addFeedback = async (newfeedback) => {
        const response = await fetch(`/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newfeedback)
        })

        const data = await response.json()
        setFeedback([data, ...feedback])
    }

    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure that you want to delete?')) {
            await fetch(`/feedback/${id}`, {
                method: 'DELETE'
            })
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    const editFeedback = async (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })

        const data = await response.json()
        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;