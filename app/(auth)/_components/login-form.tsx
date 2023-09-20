"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  LoginValidatorSchema,
  LoginValidatorType,
} from "@/lib/validator/loginValidator";

const LoginForm = () => {
  const registerModal = useRegisterModal();

  const form = useForm<LoginValidatorType>({
    resolver: zodResolver(LoginValidatorSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = async (values: LoginValidatorType) => {
    console.log(values);

    // Todo: Login User
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Email or username"
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button
            className="w-full rounded-full mt-8 mb-3"
            disabled={isSubmitting}
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
