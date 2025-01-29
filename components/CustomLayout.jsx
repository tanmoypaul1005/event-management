
import Header from "@/components/header/Header";
import Footer from "./footer/Footer";

export default function CustomLayout({ children }) {

    return (
        <div>
            <Header />
            {children}
            <Footer/>
        </div>
    );
}
