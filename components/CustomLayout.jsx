
import Header from "@/components/header/Header";

export default function CustomLayout({ children }) {

    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
