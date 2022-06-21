import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getQuizzes } from '../../services/QuizService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {defaultValue, IQuiz} from "../../model/quiz.model";

const  Administration = () => {

    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
    const [quizDialog, setQuizDialog] = useState(false);
    const [deleteQuizDialog, setDeleteQuizDialog] = useState(false);
    const [deleteQuizzesDialog, setDeleteQuizzesDialog] = useState(false);
    const [quiz, setQuiz] = useState<IQuiz>(defaultValue);
    const [selectedQuizzes, setSelectedQuizzes] = useState<IQuiz[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getQuizzes().then(data => {
            setQuizzes(data);
        });
    }

    const openNew = () => {
        setQuiz(defaultValue);
        setSubmitted(false);
        setQuizDialog(true);
    }

    const refresh = () => {
        setGlobalFilter("");
        getData();
    }

    const hideDialog = () => {
        setSubmitted(false);
        setQuizDialog(false);
    }

    const hideDeleteQuizDialog = () => {
        setDeleteQuizDialog(false);
    }

    const hideDeleteQuizzesDialog = () => {
        setDeleteQuizzesDialog(false);
    }

    const saveQuiz = () => {
        setSubmitted(true);
        if (quiz.question?.trim()) {
            let _quizzes = [...quizzes];
            let _quiz = {...quiz};
            if (quiz.id) {
                const index = findIndexById(quiz.id);
                _quizzes[index] = _quiz;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Quiz Updated', life: 3000 });
            }
            else {
                _quiz.id = createId();
                _quizzes.push(_quiz);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Quiz Created', life: 3000 });
            }
            setQuizzes(_quizzes);
            setQuizDialog(false);
            setQuiz(defaultValue);
        }
    }

    const editQuiz = (quiz: IQuiz) => {
        setQuiz({...quiz});
        setQuizDialog(true);
    }

    const confirmDeleteQuiz = (quiz: IQuiz) => {
        setQuiz(quiz);
        setDeleteQuizDialog(true);
    }

    const deleteQuiz = () => {
        let _quizzes = quizzes.filter(val => val.id !== quiz.id);
        setQuizzes(_quizzes);
        setDeleteQuizDialog(false);
        setQuiz(defaultValue);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Quiz Deleted', life: 3000 });
    }

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < quizzes.length; i++) {
            if (quizzes[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const confirmDeleteSelected = () => {
        setDeleteQuizzesDialog(true);
    }

    const deleteSelectedQuizzes = () => {
        let _quizzes = quizzes.filter(val => !selectedQuizzes.includes(val));
        setQuizzes(_quizzes);
        setDeleteQuizzesDialog(false);
        setSelectedQuizzes([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Quizzes Deleted', life: 3000 });
    }

    const onQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = (e.target && e.target.value) || '';
        let _quiz: IQuiz = {...quiz};
        _quiz.question = val;
        setQuiz(_quiz);
    }

    const onAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = (e.target && e.target.value) || '';
        let _quiz: IQuiz = {...quiz};
        _quiz.answer = val;
        setQuiz(_quiz);
    }

    const actionBodyTemplate = (rowData: IQuiz) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editQuiz(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteQuiz(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:align-items-center justify-content-between">
            <span className="p-input-icon-left w-full md:w-auto">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
            </span>
            <div className="mt-3 md:mt-0 flex justify-content-end">
                <Button icon="pi pi-plus" className="mr-2 p-button-rounded" onClick={openNew} tooltip="New" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-refresh" className="p-button-success mr-2 p-button-rounded" onClick={refresh} tooltip="Refresh" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedQuizzes || !selectedQuizzes.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
            </div>
        </div>
    );
    const quizDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveQuiz} />
        </React.Fragment>
    );

    const deleteQuizDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteQuizDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteQuiz} />
        </React.Fragment>
    );

    const deleteQuizzesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteQuizzesDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedQuizzes} />
        </React.Fragment>
    );

    return (
        <div className="surface-card p-4 border-round shadow-2">
            <Toast ref={toast} />
            <div className="text-3xl text-800 font-bold mb-4">Quizzes</div>

            <DataTable ref={dt} value={quizzes} selection={selectedQuizzes} onSelectionChange={(e) => setSelectedQuizzes(e.value)}
                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} quizzes"
                globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}/>
                <Column field="question" header="Question" sortable style={{ minWidth: '20rem' }}/>
                <Column field="answer" header="Answer" sortable style={{ minWidth: '20rem' }}/>
                <Column body={actionBodyTemplate} exportable={false} />
            </DataTable>

            <Dialog visible={quizDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Quiz Details" modal className="p-fluid" footer={quizDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="question">Question</label>
                    <InputText id="question" value={quiz.question} onChange={(e) => onQuestionChange(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !quiz.question })} />
                    {submitted && !quiz.question && <small className="p-error">Ansewer is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="answer">Answer</label>
                    <InputText id="answer" value={quiz.answer} onChange={(e) => onAnswerChange(e)} required className={classNames({ 'p-invalid': submitted && !quiz.answer })} />
                    {submitted && !quiz.answer && <small className="p-error">Answer is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteQuizDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteQuizDialogFooter} onHide={hideDeleteQuizDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {quiz && <span>Are you sure you want to delete the quiz  <br/><br/> <b>{quiz.question}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteQuizzesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteQuizzesDialogFooter} onHide={hideDeleteQuizzesDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {quiz && <span>Are you sure you want to delete the selected quiz?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default Administration;
