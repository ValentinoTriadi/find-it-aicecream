import { ResetPasswordForm } from "@/components/form/reset-password-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-0 bg-white rounded-xl shadow-lg overflow-hidden">
          <CardHeader className="bg-dark-blue p-6 text-white text-center">
            <div className="flex justify-center mb-4 h-12">
              <img src="/images/battletalk-logo.png" />
            </div>
            <h1 className="text-xl font-bold">Reset Password</h1>
            <p className="text-gray-300">Enter your new password.</p>
          </CardHeader>

          <CardContent className="p-6 px-12">
            <ResetPasswordForm />
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

export default ResetPasswordPage;
