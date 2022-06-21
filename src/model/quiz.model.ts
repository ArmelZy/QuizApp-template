
export interface IQuiz {
    id?: string;
    question?: string;
    answer?: string;

}
export const defaultValue: Readonly<IQuiz> = {
    id: '',
    question: '',
    answer: ''
};
