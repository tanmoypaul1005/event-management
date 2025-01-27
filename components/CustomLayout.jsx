"use client"
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { authPaths } from "@/util/const";
import { usePathname } from "next/navigation";

export default function CustomLayout({ children }) {

    const pathName = usePathname();

    return (
        <div>
            {(pathName === authPaths.login || pathName === authPaths.register) ?
                <>
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
