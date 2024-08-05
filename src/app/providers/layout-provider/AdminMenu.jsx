import { Button, Dropdown } from "antd";
import Link from "next/link";

const AdminMenu = () => {

  const items = [
    {
      key: '1',
      label: <Link href="/admin/templates">Templates</Link>,
    },
    {
      key: '2',
      label: <Link href="/admin/users">Users</Link>,
    },
    {
      key: '3',
      label: <Link href="/admin/subscriptions">Subscriptions</Link>,
    },
  ];

  return <div>
    <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
        <Button className="!bg-primary !text-white p-3">Admin</Button>
    </Dropdown>
  </div>

};

export default AdminMenu;
