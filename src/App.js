import logo from "./logo.svg";
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import Tone from "./pages/Tone";
import Infi from "./pages/Infi";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <HomePage /> */}
      {/* <TestPage /> */}
      <Tone />
      <Infi />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
