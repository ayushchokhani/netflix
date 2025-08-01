
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface AccountMenuProps {
  visible ?: boolean
}

const AccountMenu: React.FC<AccountMenuProps> = ({visible}) => {

  const {data} = useCurrentUser()
  if(!visible) return null


  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800 ">
      <div className="flex flex-col gap-3 ">
        <div className="px-3 group/items flex flex-row gap-3 items-center w-full justify-center">
          {/* <img
            className="w-8 rounded-md"
            src="/images/default-blue.png"
            alt=""
          /> */}
          <Image
            className="w-8 rounded-md"
            src="/images/default-blue.png"
            alt=""
            height={50}
            width={50}
          />
          <p className="text-white text-sm group-hover/items: underline">
            {data?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  )
}
 
export default AccountMenu;