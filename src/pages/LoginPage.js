import LoginSection from "../components/LoginSection";
import imageLogin from "../images/imageLogin.png";

export default function LoginPage() {
    return (
        <div className='login-page-main'>
            <div className="d-flex align-items-center">
                <div className="image-section">
                    <img src={imageLogin} alt="Login Illustration" className="img-fluid" />
                </div>
                <div>
                    <LoginSection />
                </div>
            </div>
        </div>
    )
}
