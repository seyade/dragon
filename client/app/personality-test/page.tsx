// app/personalityTest/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { fetchQuestions, submitAnswers } from '@/services/testService';

const PersonalityTest = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [startTime, setStartTime] = useState(Date.now());
    const [testCompleted, setTestCompleted] = useState(false);

    useEffect(() => {
        const initializeTest = async () => {
            const fetchedQuestions = await fetchQuestions();
            setQuestions(fetchedQuestions);
            setStartTime(Date.now());
        };
        initializeTest();
    }, []);

    const handleAnswer = (answer) => {
        const timeTaken = Date.now() - startTime;
        setAnswers(prev => [...prev, { question_id: questions[currentQuestionIndex].question_id, answer_text: answer, time_taken: timeTaken }]);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setStartTime(Date.now());
        } else {
            setTestCompleted(true);
            submitTestAnswers();
        }
    };

    const submitTestAnswers = async () => {
        const payload = {
            user_id: USER_ID,  // Replace with actual user ID
            answers: answers
        };

        try {
            await submitAnswers(payload);
        } catch (error) {
            // Handle error
        }
    };

    if (testCompleted) {
        return <div>Take a break! Your responses have been submitted.</div>;
    }

    return (
        <div>
            {questions.length > 0 && (
                <div>
                    <p>{questions[currentQuestionIndex].question_text}</p>
                    {/* Implement your answer input component here */}
                    <Button onClick={() => handleAnswer("User's Answer")}>Submit Answer</Button>
                </div>
            )}
        </div>
    );
};

export default PersonalityTest;
