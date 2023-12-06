import { authOptions } from "@/lib/auth-option";
import { getServerSession } from "next-auth";

async function dashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Email: {session?.user?.email}</p>
      <p>Name: {session?.user?.name}</p>
      {/* TODO: get user role from session */}
      <p>Role: {session?.user.role}</p>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </>
  );
}

export default dashboardPage;
