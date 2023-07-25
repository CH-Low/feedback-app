import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Post from "./components/Post";
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
    return (
        <>
            <FeedbackProvider>
                <BrowserRouter>
                    <Header text="Hello World" />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <FeedbackForm />
                                    <FeedbackStats />
                                    <FeedbackList />
                                </>
                            } />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/post/*" element={<Post />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </FeedbackProvider>
        </>
    )
}

export default App;