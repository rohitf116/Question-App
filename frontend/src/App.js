import "./App.css";
import LoginComponent from "./Screen/LoginComponent/LoginComponent";
import RegisterScreen from "./Screen/RegisterScreen/RegisterScreen";
import RegisterAdminScreen from "./Screen/RegisterScreen/RegisterAdmin";
import QuestionComponent from "./components/QuestionComponent/Question";
import LoginAdmin from "./Screen/LoginComponent/LoginAdmin";
import QuestionDisplayComponent from "./components/QuestionDisplayComponent/QuestionDisplayComponent";
import ExamScreen from "./Screen/ExamScreen";
import HomeScreen from "./Screen/HomeScreen";
import ResultScreen from "./Screen/ResultScreen";
import Header from "./components/header/Header";
import StartExamScreen from "./Screen/StartExamScreen";
import AdminPanel from "./Screen/AdminPanel";
import AllQuestionScreen from "./Screen/AllQuestionScreen";
import EditQuestionScreen from "./Screen/EditQuestionScreen";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Header />}>
          <Route index path="/" exact element={<StartExamScreen />} />
          <Route path="homescreen" element={<HomeScreen />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="startexam" element={<ExamScreen />} />

          <Route path="result" element={<ResultScreen />} />
          {/* admin related */}
          <Route path="admin/register" element={<RegisterAdminScreen />} />
          <Route path="admin/login" element={<LoginAdmin />} />
          <Route path="adminpanel/question" element={<QuestionComponent />} />
          <Route
            path="adminpanel/question/:id"
            element={<QuestionDisplayComponent />}
          />
          <Route path="adminpanel" element={<AdminPanel />} />
          <Route path="questionall" element={<AllQuestionScreen />} />
          <Route path="questionall/edit" element={<EditQuestionScreen />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
