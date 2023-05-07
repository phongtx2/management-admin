import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GuardRoute({ isPrivate = false, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const isAuth = localStorage.getItem("isAuth");
      if (!isAuth && isPrivate) {
        navigate("/login", {
          replace: true,
        });
      }
      if (isAuth && !isPrivate) {
        navigate("/", {
          replace: true,
        });
      }
    })();
  }, []);

  return children;
}

export default GuardRoute;
