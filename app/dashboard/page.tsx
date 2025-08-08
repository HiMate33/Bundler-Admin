import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
//import AddAdminForm from "../component/AddAdminForm";
//import AdminList from "../component/AdminList";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
      Hello how are you doing hoping to seeing you very soon 
      {/*
      <AddAdminForm />
      <AdminList />
   
      */}
       </div>
  );
}
