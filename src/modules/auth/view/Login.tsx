"use client";

import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "@/components/ui/password-input";
import { Button, Card, Container, Input, Field } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { loginSchema } from "../login.shema";
import { authService } from "../auth.service";
import { useDispatch } from "react-redux";
import { ValidationMessage } from "@/helpers/ValidationMessage";

const Login = () => {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof form;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    startTransition(async () => {
      const payload = { email: form.email, password: form.password };
      const loginResult = await authService.store(payload, dispatch);
      // console.log(loginResult);

      if (loginResult.error) {
        setErrors({ password: loginResult.error });
        toaster.create({
          title: "Login Failed",
          description: loginResult.error,
          type: "error",
          duration: 3000,
        });
        return;
      }

      toaster.create({
        title: "Login Successful",
        description: loginResult.message,
        type: "success",
        duration: 3000,
      });

      navigate("/dashboard");
    });
  };

  return (
    <Container
      height="100vh"
      centerContent
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card.Root width="320px">
        <Card.Body gap="2">
          <Card.Title mt="2">Login</Card.Title>
          <Card.Description>
            Login to your account to access all features.
          </Card.Description>

          <Field.Root invalid={!!errors.email}>
            <Field.Label htmlFor="email">Email</Field.Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <Field.ErrorText>{errors.email}</Field.ErrorText>}
            <ValidationMessage field={"email"} />
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label htmlFor="password">Password</Field.Label>
            <PasswordInput
              id="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e: any) => handleChange("password", e.target.value)}
            />
            {errors.password && (
              <Field.ErrorText>{errors.password}</Field.ErrorText>
            )}
            <ValidationMessage field={"password"} />
          </Field.Root>
        </Card.Body>

        <Card.Footer justifyContent="flex-end">
          <Button onClick={handleSubmit} loading={isPending}>
            LOGIN
          </Button>
        </Card.Footer>
      </Card.Root>
    </Container>
  );
};

export default Login;
