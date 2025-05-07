"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password harus memilki minimal 8 karakter"),
  confirmPassword: z
    .string()
    .min(8, "Password harus memilki minimal 8 karakter"),
});

export const ResetPasswordForm = () => {
  const [isPasswordShown, setPasswordShown] = useState<boolean>(false);
  const [isConfirmPasswordShown, setConfirmPasswordShown] =
    useState<boolean>(false);

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    if (data.password !== data.confirmPassword) {
      alert("Password tidak sama");
      return;
    }

    try {
    } catch (error) {
      console.error("Error signing in:", error);
      return;
    }
  }

  return (
    <Form {...resetPasswordForm}>
      <form
        onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={resetPasswordForm.control}
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
        <FormField
          control={resetPasswordForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormControl>
                <div className="flex w-full relative">
                  <Input
                    id="password"
                    type={isConfirmPasswordShown ? "text" : "password"}
                    placeholder="Enter Your password"
                    {...field}
                  />
                  <Button
                    className="absolute right-0"
                    variant={"ghost"}
                    onClick={() =>
                      setConfirmPasswordShown(!isConfirmPasswordShown)
                    }
                    type="button"
                  >
                    {isConfirmPasswordShown ? (
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
        <Button
          type="submit"
          className="w-full bg-stronger-blue hover:bg-more-stronger-blue text-white"
        >
          Reset Password
        </Button>
      </form>
    </Form>
  );
};
