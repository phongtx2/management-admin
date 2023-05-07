import { Routes, Route } from "react-router-dom";
import GuardRoute from "./components/GuardRoute";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
// import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <GuardRoute>
              <Login />
            </GuardRoute>
          }
        />
        <Route
          path="/*"
          element={
            <GuardRoute isPrivate>
              <PrivateRoute />
            </GuardRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
