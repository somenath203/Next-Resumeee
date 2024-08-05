import UsersTable from "./_components/UsersTable";
import { getAllUsers } from "@/server-actions/users";

const Page = async () => {

  const allUsers = await getAllUsers();

  if(!allUsers?.success) {
    return;
  }

  return (
    <div>

      <h1 className="text-primary text-lg font-bold uppercase">Users</h1>

      <UsersTable allUsers={allUsers?.data} />

    </div>
  )
};

export default Page