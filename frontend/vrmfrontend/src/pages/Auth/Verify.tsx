import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";


const Verify = () => {

    const [vcode, setVcode] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        console.log("Verification code submitted:", vcode);
        navigate("/login");
    }
    return (
        <div className="page">
            <Header/>
            <main
            className="auth-shell"
            style={{ minHeight: "calc(100vh - 65px)" }}
            >
                <div className="auth-card stack">
                    <div className="stack gap-1 text-center">
                        <h1 className="h2 mb-3">Verify your Account</h1>
                        <p className="muted">We have sent you an email with a verification code.</p>
                        <p className="muted font-semibold">Please enter the code below to verify your email address.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="stack">
                        <input type="text" value={vcode} onChange={(e) => setVcode(e.target.value)} placeholder="Verification Code" className="input text-center my-6" maxLength={6} />
                        <button type="submit" className="btn btn-primary">Verify Account</button>
                    </form>
                </div>
            </main>
        </div>
    )


}

export default Verify;