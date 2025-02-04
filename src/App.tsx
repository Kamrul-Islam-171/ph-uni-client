import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <>

     {/* undefined dichi jate first time login charao home page e jete pare */}
      <ProtectedRoute role={undefined}> 
        <MainLayout></MainLayout>
      </ProtectedRoute>
    </>
  );
}

export default App;
