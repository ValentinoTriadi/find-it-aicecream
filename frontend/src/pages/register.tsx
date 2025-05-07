import { RegisterForm } from "@/components/form/register-form";
import { useAuth } from "@/context/auth.context";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const auth = useAuth();
  if (auth.user) {
    window.location.href = "/";
  }
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-dark-blue p-6 text-white text-center">
            <div className="flex justify-center mb-4 h-12">
              <img src="/images/battletalk-logo.png" />
            </div>
            <h1 className="text-heading font-bold">Join BattleTalk</h1>
            <p className="text-gray-300 mt-2">
              Create an account to start your English learning journey
            </p>
          </div>

          <div className="p-6">
            <RegisterForm />

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-stronger-blue hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-dark-blue hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
