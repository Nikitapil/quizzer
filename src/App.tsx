import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { FinalPage } from "./components/pages/FinalPage";
import { MainPage } from "./components/pages/MainPage";
import { QuestionPage } from "./components/pages/QuestionPage";
import { initializeApp } from "firebase/app";
import "./styles/App.scss";
import { firebaseConfig } from "./fbconfig";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserId } from "./redux/actionCreators";
import { useDispatch } from "react-redux";
import { Profile } from "./components/pages/Profile";
import { Info } from "./components/pages/Info";
import { CreateQuiz } from "./components/pages/CreateQuiz";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const uid = user?.uid || null;
    dispatch(getUserId(uid));
  }, [loading]);

  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/questions" element={<QuestionPage />} />
        <Route path="/finalpage" element={<FinalPage />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="info" element={<Info />} />
          <Route path="create" element={<CreateQuiz />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
