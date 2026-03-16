import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"

const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <main>
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default layout