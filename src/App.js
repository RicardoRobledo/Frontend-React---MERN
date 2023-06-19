import { createContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Search from "./pages/Search";
import CreateTask from "./pages/CreateTask";
import ModifyTask from "./pages/ModifyTask";
import Error404 from "./pages/Error404";


export const PathContext = createContext();

function App() {
  return (
    <>
    <PathContext.Provider value={'https://pine-nice-reaper.glitch.me/api/v1/todo/'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/create-task" element={<CreateTask/>} />
          <Route path="/modify-task" element={<ModifyTask/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="*" element={<Error404/>} />
        </Routes>
      </BrowserRouter>
    </PathContext.Provider>
    </>
  );
}

export default App;
