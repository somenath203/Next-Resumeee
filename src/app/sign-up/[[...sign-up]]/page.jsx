import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary">
      <SignUp />
    </div>
  )
};

export default Page;