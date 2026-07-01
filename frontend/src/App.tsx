import { useHealthCheck } from "./hooks/use-health-check";

function App() {
  const { data: status } = useHealthCheck();

  return (
    <>
      <h1 className="font-bold"> Status from API: {status} </h1>
    </>
  );
}

export default App;
