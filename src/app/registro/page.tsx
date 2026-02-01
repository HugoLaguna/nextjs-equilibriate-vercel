import { Metadata } from "next";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Crear Cuenta | Equilibriate",
  description: "Crea tu cuenta en Equilibriate",
};

export default function RegisterPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-md px-4 lg:px-8">
        <RegisterForm />
      </div>
    </div>
  );
}
