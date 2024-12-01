import CoursesSection from "../components/CoursesSection";
import NavBar from "../components/NavBar";

export default function CoursesPage() {
    return (
        <div>
            <NavBar />
            <br />
            <div className='container'>
                <CoursesSection />
            </div>
        </div>
    )
}