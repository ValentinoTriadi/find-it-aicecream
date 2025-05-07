import { ForgotPasswordForm } from "@/components/form/forgot-password-form";
import { LoginForm } from "@/components/form/login-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-0 bg-white rounded-xl shadow-lg overflow-hidden">
          <CardHeader className="bg-dark-blue p-6 text-white text-center">
            <div className="flex justify-center mb-4 h-12">
              <img src="/images/battletalk-logo.png" />
            </div>
            <h1 className="text-xl font-bold">Forgot Password</h1>
            <p className="text-gray-300">
              Enter your email address to reset your password.
            </p>
          </CardHeader>

          <CardContent className="p-6 px-12">
            <ForgotPasswordForm />
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-dark-blue hover:underline">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
