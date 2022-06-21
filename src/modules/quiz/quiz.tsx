import React, {useEffect, useState} from 'react';
import './quiz.css';
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {IQuiz} from "../../model/quiz.model";
import {getQuizzes} from "../../services/QuizService";

export const Quiz = () => {

    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);

    useEffect(() => {
        getQuizzes().then(data => {
            setQuizzes(data);
        });
    }, []);

    const handleQuizSubmit = (answer: string) => {
        // logic to handle answer
        alert(answer);
    }

    return (
        <>
            <div className="grid justify-content-center">
                <div className="text-3xl text-800 font-bold">Let's Quiz</div>
            </div>
            <div className="grid justify-content-center">
                {quizzes.map((quiz, i) => (
                    <div key={i} className="surface-card p-4 mt-6 shadow-2 border-round quiz">
                        <div className="text-lg font-medium text-900 mb-3">{quiz.question}</div>
                        <InputTextarea rows={5} cols={43} />
                        <Button label="Submit" className="mt-3" onClick={() => handleQuizSubmit(`Quiz ${i+1} Submitted`)} />
                    </div>
                    ))}
            </div>
        </>
    )
}
