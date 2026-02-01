import { Metadata } from "next";
import { PasswordRecoveryForm } from "./PasswordRecoveryForm";

export const metadata: Metadata = {
  title: "Recuperar Contrasena | Equilibriate",
  description: "Recupera tu contrasena de Equilibriate",
};

export default function PasswordRecoveryPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-md px-4 lg:px-8">
        <PasswordRecoveryForm />
      </div>
    </div>
  );
}
