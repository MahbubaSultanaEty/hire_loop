import CompanyForm from "@/components/dashboard/CompnayForm";
import { getUserSession } from "@/lib/core/session";

export default async function RegisterCompanyPage() {
  const user = await getUserSession();

  console.log("user sesion in register company page", user);
  
  return <CompanyForm mode="create" recruiter={user} />;
}