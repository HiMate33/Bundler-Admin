import Main from "./components/landing/main";
import AuthProvider from "./components/AuthProvider"
import RequireAuth from "./components/RequireAuth"

export default function Home() {
  return (
    <div>
     
        <RequireAuth>
          <Main />
        </RequireAuth>
     
    </div>
  );
}
