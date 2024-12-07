import React, { useEffect } from "react";
import LoginSection from "../components/LoginSection";
import imageLogin from "../images/imageLogin.png";

export default function LoginPage() {
    useEffect(() => {
        // Desabilita o scroll ao carregar a página
        document.body.style.overflow = "hidden";

        // Restaura o scroll ao desmontar a página
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="login-page-main">
            <div className="d-flex align-items-center">
                {/* Seção de imagem */}
                <div className="image-section">
                    <img
                        src={imageLogin}
                        alt="Login Illustration"
                        className="img-fluid"
                    />
                </div>

                {/* Seção de Login */}
                <div>
                    <LoginSection />
                </div>
            </div>
        </div>
    );
}
