
export const getQuizzes = async () => {
    return await fetch('data/demo.json').then(res => res.json()).then(d => d.data);
}

export {};
