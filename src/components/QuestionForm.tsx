"use client";
import { useState } from 'react';
import { Button } from './Button';
import { Question } from './Question';

interface FormQuestion {
    id: string;
    question: string;
    type: 'text' | 'email' | 'number';
    placeholder: string;
}

const questions: FormQuestion[] = [
    {
        id: 'name',
        question: "What's your name?",
        type: 'text',
        placeholder: 'e.g., John Doe'
    },
    {
        id: 'tone',
        question: "How would you describe your ideal brand tone?",
        type: 'text',
        placeholder: 'e.g., professional, casual, playful'
    },
    {
        id: 'audience',
        question: "Who is your target audience?",
        type: 'text',
        placeholder: 'e.g., young professionals, creative entrepreneurs'
    },
    {
        id: 'values',
        question: "What are your core brand values?",
        type: 'text',
        placeholder: 'e.g., authenticity, innovation, community'
    },
    {
        id: 'motivation',
        question: "What motivates you to create content?",
        type: 'text',
        placeholder: 'e.g., inspiring others, sharing knowledge, entertaining'
    },
    {
        id: 'style',
        question: "How would you describe your personal style or aesthetic?",
        type: 'text',
        placeholder: 'e.g., minimalist, vibrant, edgy'
    },
    {
        id: 'passion',
        question: "What topics or themes are you most passionate about?",
        type: 'text',
        placeholder: 'e.g., fitness, travel, technology'
    },
    {
        id: 'audience_feeling',
        question: "How do you want your audience to feel when they engage with your content?",
        type: 'text',
        placeholder: 'e.g., motivated, informed, entertained'
    },
    {
        id: 'goals',
        question: "What are your long-term goals as an influencer?",
        type: 'text',
        placeholder: 'e.g., building a community, collaborating with brands, launching a product'
    },
    {
        id: 'messages',
        question: "What values or messages do you want to convey through your content?",
        type: 'text',
        placeholder: 'e.g., authenticity, positivity, innovation'
    }
];

export function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (questionId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleQuestionComplete = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsCompleted(true);
        }
    };

    // const handleSubmit = async () => {
    //     try {
    //         const response = await fetch('/api/onboarding', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(answers),
    //         });

    //         if (response.ok) {
    //             alert('Form response saved successfully');
    //         } else {
    //             alert('Failed to save form response');
    //         }
    //     } catch (error) {
    //         console.error('Failed to submit form:', error);
    //         alert('Failed to submit form');
    //     }
    // };

    const handleGetStarted = () => {
        console.log('Form submitted:', answers);
        // Handle form submission here
    };

    if (isCompleted) {
        return (
            <div className="w-full max-w-2xl mt-20 animate-fadeIn">
                <div className="flex flex-col items-center space-y-8">
                    <h2 className="text-2xl font-light text-white">Ready to create your brand voice!</h2>
                    <Button onClick={handleGetStarted}>
                        Get Started
                    </Button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentStep];

    return (
        <div className="w-full max-w-2xl">
            <Question
                question={currentQuestion.question}
                type={currentQuestion.type}
                placeholder={currentQuestion.placeholder}
                value={answers[currentQuestion.id] || ''}
                onChange={(value) => handleInputChange(currentQuestion.id, value)}
                onComplete={handleQuestionComplete}
            />
        </div>
    );
}