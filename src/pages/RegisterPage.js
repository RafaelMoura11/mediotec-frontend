import RegisterSection from "../components/RegisterSection";
import NavBar from "../components/NavBar";

export default function RegisterPage() {
    return (
        <div>
             <NavBar />
            <div className='container'>
            <RegisterSection />
            </div>
        </div>
    )
}
