import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AccountDashboard } from "./AccountDashboard";
import { LoginPrompt } from "./LoginPrompt";

export const metadata: Metadata = {
  title: "Mi Cuenta | Equilibriate",
  description: "Gestiona tu cuenta, pedidos y preferencias en Equilibriate.",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <LoginPrompt />;
  }

  return <AccountDashboard user={user} />;
}
