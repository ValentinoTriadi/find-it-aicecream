'use client';

import { signUpNewUser } from '@/api/auth';
import { useAuth } from '@/context/auth.context';
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

const registerSchema = z.object({
  fullName: z.string().min(1, 'Nama lengkap harus diisi'),
  email: z.string().email('Email yang dimasukkan salah'),
  password: z.string().min(8, 'Password harus memilki minimal 8 karakter'),
  confirmPaswsword: z
    .string()
    .min(8, 'Password harus memilki minimal 8 karakter'),
});

export const RegisterForm = () => {
  const [isPasswordShown, setPasswordShown] = useState<boolean>(false);
  const [isConfirmPasswordShown, setConfirmPasswordShown] =
    useState<boolean>(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    console.log(data);
    if (data.password !== data.confirmPaswsword) {
      alert('Password tidak sama');
      return;
    }

    try {
      await auth.register({
        email: data.email,
        password: data.password,
        name: data.fullName,
      });
    } catch (error) {
      console.error('Error signing in:', error);
      return;
    }
  }
  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={registerForm.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input
                  id="full-name"
                  type="fullName"
                  placeholder="Masukkan nama lengkap kamu"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email kamu"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={registerForm.control}
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
        <FormField
          control={registerForm.control}
          name="confirmPaswsword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormControl>
                <div className="flex w-full relative">
                  <Input
                    id="password"
                    type={isConfirmPasswordShown ? 'text' : 'password'}
                    placeholder="Enter Your password"
                    {...field}
                  />
                  <Button
                    className="absolute right-0"
                    variant={'ghost'}
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
          Register
        </Button>
      </form>
    </Form>
  );
};
