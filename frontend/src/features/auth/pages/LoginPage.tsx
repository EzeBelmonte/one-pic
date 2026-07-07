import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="titleSection mt-10">Ingresar</h1>

      <div className="w-full px-5 mt-10">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;