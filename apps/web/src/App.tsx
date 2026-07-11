import AppRouter from "./routes/AppRouter";
import { useAuth } from "./contexts/AuthContext";
import SessionWarningOverlay from "./components/common/SessionWarningOverlay";

export default function App() {
  const { sessionWarning, clearSessionWarning } = useAuth();

  return (
    <>
      <AppRouter />
      {sessionWarning && <SessionWarningOverlay message={sessionWarning} onClose={clearSessionWarning} />}
    </>
  );
}
