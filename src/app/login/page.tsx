import { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Iniciar Sesion | Equilibriate",
  description: "Inicia sesion en tu cuenta de Equilibriate",
};

export default function LoginPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-md px-4 lg:px-8">
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

function LoginFormSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4" />
        <div className="h-8 bg-muted rounded w-48 mx-auto mb-2" />
        <div className="h-4 bg-muted rounded w-64 mx-auto" />
      </div>
      <div className="bg-muted/50 rounded-2xl p-6 lg:p-8 border border-border space-y-4">
        <div className="h-10 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
        <div className="h-12 bg-muted rounded-full" />
      </div>
    </div>
  );
}
