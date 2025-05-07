"use client";

import { useAuth } from "@/context/auth.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const LoginForm = () => {
  const [isPasswordShown, setPasswordShown] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const auth = useAuth();
  const navigate = useNavigate();
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setErrorMessage(null); // Reset error sebelum submit
    try {
      await auth.login({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    }
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="flex w-full relative">
                  <Input
                    id="password"
                    type={isPasswordShown ? "text" : "password"}
                    placeholder="Enter Your password"
                    {...field}
                  />
                  <Button
                    className="absolute right-0"
                    variant={"ghost"}
                    onClick={() => setPasswordShown(!isPasswordShown)}
                    type="button"
                  >
                    {isPasswordShown ? (
                      <EyeOffIcon className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="flex justify-start">
          <Link
            to="/forgot-password"
            className="text-sm hover:text-more-stronger-blue text-stronger-blue hover:underline"
          >
            Forgot password?
          </Link>
        </div> */}

        {errorMessage && (
          <div className="text-red-500 text-sm text-center">{errorMessage}</div>
        )}
        <Button
          type="submit"
          className="w-full bg-stronger-blue hover:bg-more-stronger-blue text-white"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};
