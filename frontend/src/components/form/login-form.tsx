'use client';

import { signInWithEmail } from '@/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { Eye, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useAuth } from '@/context/auth.context';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const LoginForm = () => {
  const [isPasswordShown, setPasswordShown] = useState<boolean>(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      const res = await auth.login({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error('Error signing in:', error);
      return;
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
        ></FormField>
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
                    type={isPasswordShown ? 'text' : 'password'}
                    placeholder="Enter Your password"
                    {...field}
                  />
                  <Button
                    className="absolute right-0"
                    variant={'ghost'}
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
