"use client"
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import useLogin from "@/helper/hook/useLogin";
import { authPaths } from "@/util/const";
import { usePathname } from "next/navigation";


export default function CustomLayout({ children }) {

    const pathName = usePathname();

    const { userInfo } = useLogin();

    // const router=useRouter();

    // useEffect(() => {
    //   if((pathName === "/login") && userInfo?.data?._id){
    //    router.push("/")
    //   }
    // }, [pathName])

    // console.log("pathName",pathName,userInfo?.data?._id)

    return (
        <div>
            {(pathName === authPaths.login || pathName === authPaths.register) ?
                <>
                    <Header />
                    {children}
                </> :
                <>
                    <Header />
                    {children}
                    <Footer />
                </>
            }
        </div>
    );
}
