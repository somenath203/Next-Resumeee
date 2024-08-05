import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary">
      <SignIn />
    </div>
  )
};

export default Page;