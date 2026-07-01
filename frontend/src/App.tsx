import { useApplications } from "./hooks/use-applications";

function App() {
  const { data } = useApplications();

  return (
    <>
      <h1 className="font-bold"> Applications count: {data?.total} </h1>
    </>
  );
}

export default App;
