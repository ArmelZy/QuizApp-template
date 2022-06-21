import React from 'react';
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigateTo = useNavigate();

    const goToQuiz = () => {
        navigateTo("/quiz");
    }
    const goToAdmin = () => {
        navigateTo("/admin");
    }

    return (
        <div className="grid grid-nogutter surface-section text-800">
            <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                <section>
                    <span className="block text-6xl font-bold mb-1">It is the time!</span>
                    <div className="text-6xl text-primary font-bold mb-3">Let's Quiz wow quizzes</div>
                    <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                    <Button label="Let's Quiz" className="mr-3 p-button-raised" onClick={goToQuiz}/>
                    <Button label="Admin" className="p-button-outlined" onClick={goToAdmin}/>
                </section>
            </div>
            <div className="col-12 md:col-6 overflow-hidden">
                <img src="/images/quiz.jpg" alt="Hero quiz" className="md:ml-auto block md:h-full"
                     style={{clipPath: "circle(50% at 50% 50%)", width:"100%"}}/>
            </div>
        </div>
    )
}

export default Home;
