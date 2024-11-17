import AuthPage from "./Pages/Auth";
import useLocalStorage from "./hooks/useLocalstorage";
import { Routes, Route, Navigate } from "react-router-dom";
import { notification } from "antd";
import HomePage from "src/Pages/Home"

function App() {
  const [user, setUser] = useLocalStorage("user", null);
  const [usersCollection, setUsersCollection] = useLocalStorage("users", {
    users: [],
  });
  const [notificationApi, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={user?.isUserAvailable ? "/home" : "/auth"} replace />
          }
        />
        <Route
          path="/auth"
          element={
            user?.isUserAvailable ? (
              <Navigate to="/home" replace />
            ) : (
              <AuthPage
                setUser={setUser}
                usersCollection={usersCollection}
                setUsersCollection={setUsersCollection}
                notificationApi={notificationApi}
              />
            )
          } 
        />
        <Route
          path="/home"
          element={
            user?.isUserAvailable ? (
              <HomePage
                user={user}
                setUser={setUser}
                notificationApi={notificationApi}
              />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
