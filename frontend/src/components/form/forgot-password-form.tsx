"use client";

import { forgetPassword } from "@/api/auth";
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

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const ForgotPasswordForm = () => {
  const ForgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    try {
      await forgetPassword(data.email);
    } catch (error) {
      if (error instanceof Error && error.message) {
        console.error(error.message);
      } else {
        console.error("An error occurred while sending the reset link.");
      }
    }
  }

  return (
    <Form {...ForgotPasswordForm}>
      <form
        onSubmit={ForgotPasswordForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={ForgotPasswordForm.control}
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
        <Button
          type="submit"
          className="w-full bg-stronger-blue hover:bg-more-stronger-blue text-white"
        >
          Send Reset Link
        </Button>
      </form>
    </Form>
  );
};
