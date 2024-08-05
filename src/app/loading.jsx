// loading.jsx is a special file name which will show this loader automatically till the data is 
// being fetched from backend in server side component(not client side) i.e. in page.jsx for
// this app folder only i.e. page.jsx

import Spinner from "@/app/_components/Spinner";

const Loading = () => {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <Spinner />
    </div>
  )
}

export default Loading;