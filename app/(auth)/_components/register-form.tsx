"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

import registerUser from "@/actions/user/registerUser";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useRegisterModal from "@/hooks/useRegisterModal";
import {
  RegisterValidatorSchema,
  RegisterValidatorType,
} from "@/lib/validator/registerValidator";

const RegisterForm = () => {
  const registerModal = useRegisterModal();
  const router = useRouter();

  const form = useForm<RegisterValidatorType>({
    resolver: zodResolver(RegisterValidatorSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = form;

  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: async ({
      name,
      username,
      email,
      password,
    }: RegisterValidatorType) => {
      const payload: RegisterValidatorType = {
        name,
        username,
        email,
        password,
      };
      const { data, status } = await axios.post("/api/auth/register", payload);

      if (status === 201) {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        }).then((res) => {
          if (res?.ok && !res.error) {
            registerModal.onClose();
            router.push("/home");
            toast.success("Success");
          }
        });
      }

      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          return toast.error(error.response.data);
        }
        if (error.response?.status === 409) {
          return toast.error(error.response.data);
        }
      }

      return toast.error("Something went wrong");
    },
  });

  const onSubmit = async (values: RegisterValidatorType) => {
    registerUser(values);
  };

  const { pending } = useFormStatus();

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Name" disabled={isLoading} />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Username" disabled={isLoading} />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="Email address"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  placeholder="Password"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button
            size="lg"
            className="w-full rounded-full mt-8 mb-3"
            disabled={isLoading || pending}
          >
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
