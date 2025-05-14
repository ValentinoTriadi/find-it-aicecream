import { LoginForm } from "@/components/form/login-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/context/auth.context";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const auth = useAuth();

  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect") || undefined;

  if (auth.user) {
    window.location.href = redirect || "/";
  }
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-0 bg-white rounded-xl shadow-lg overflow-hidden">
          <CardHeader className="bg-dark-blue p-6 text-white text-center">
            <div className="flex justify-center mb-4 h-12">
              <img src="/images/battletalk-logo.png" />
            </div>
            <h1 className="text-xl font-bold">Welcome Back to BattleTalk</h1>
            <p className="text-gray-300">
              Login to continue your English learning journey
            </p>
          </CardHeader>

          <CardContent className="p-6 px-12">
            <LoginForm redirect={redirect} />

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-stronger-blue hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link to="/" className="text-dark-blue hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
