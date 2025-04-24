import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
    const [steps] = useState(data);
    const [activeIndex, setActiveIndex] = useState(0);

    function backBtn() {
        setActiveIndex(activeIndex - 1);
    }

    function forwardBtn() {
        setActiveIndex(activeIndex + 1);
    }

    function startBtn() {
        setActiveIndex(0);
    }

    const firstStep = activeIndex === 0;
    const endStep = activeIndex === steps.length - 1;

    function handleClickStep(index) {
        setActiveIndex(index);
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Инструкция по готовке пельменей</h1>
                <div className={styles.steps}>
                    <div className={styles['steps-content']}>
                        {steps[activeIndex].content}
                    </div>
                    <ul className={styles['steps-list']}>
                        {steps.map((step, index) => {
                            const isDone = activeIndex >= index;
                            const showDone =
                                styles['steps-item'] +
                                ' ' +
                                (isDone ? styles.done : null);
                            const showActive =
                                styles['steps-item'] +
                                ' ' +
                                (activeIndex === index ? styles.active : null);
                            return (
                                <li
                                    key={step.id}
                                    className={`${showDone} ${showActive}`}
                                >
                                    <button
                                        onClick={() => handleClickStep(index)}
                                        className={styles['steps-item-button']}
                                    >
                                        {step.id.at(2)}
                                    </button>
                                    {step.title}
                                </li>
                            );
                        })}
                    </ul>

                    <div className={styles['buttons-container']}>
                        <button
                            onClick={backBtn}
                            disabled={firstStep}
                            className={styles.button}
                        >
                            Назад
                        </button>
                        <button
                            onClick={endStep ? startBtn : forwardBtn}
                            className={styles.button}
                        >
                            {endStep ? 'Начать сначала' : 'Далее'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
