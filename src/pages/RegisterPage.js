import RegisterSection from "../components/RegisterSection";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();

    return (
        <div>
            <div >
                <RegisterSection />
                
            </div>
        </div>
    );
}
