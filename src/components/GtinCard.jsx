import React, { useState } from "react";
import { generateGTIN14, generateGTIN13, generateGTIN12, generateGTIN8 } from "../utils/gtingenerator";

export default function GtinCard({ type }) {
    const [amount, setAmount] = useState(1);
    const [results, setResults] = useState([]);
    const [copiedIdx, setCopiedIdx] = useState(null);
    const [error, setError] = useState('');
    const handleGenerate = () => {
        if (amount < 1 || amount > 10) {
            setError('Enter a number between 1 and 10');
            return;
        }
        else {
            setError('');
        }
        const generators = {
            'GTIN-14': generateGTIN14,
            'GTIN-13': generateGTIN13,
            'GTIN-12': generateGTIN12,
            'GTIN-8': generateGTIN8,
        };
        const fn = generators[type];
        if (fn) {
            setResults(Array.from({ length: amount }, fn));
        } else {
            setResults([]);
        }
    };
    const handleCopy = async (num, idx) => {
        try {
            await navigator.clipboard.writeText(num);
            setCopiedIdx(idx);
            setTimeout(() => setCopiedIdx(null), 2000); // Reset after 2 seconds
        }
        catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    const onCChangeHandler = e => {
        const newValue = parseInt(e.target.value);
        if (newValue === '') {
            setAmount('');
            setError('');
            return;
        }

        const numberValue = parseInt(newValue, 10);

        // Validate the number between 1 and 10
        if (numberValue >= 1 && numberValue <= 10) {
            setAmount(newValue);
            setError('');
        } else {
            setAmount(newValue);
            setError('Enter a number between 1 and 10');
        }
    }
    return (
        <div className="bg-slate-900 p-4 rounded shadow-xl w-full sm:w-1/2 md:w-1/5">
            <h2 className="text-xl text-white font-bold mb-2">{type}</h2>
            <input
                type="number"
                min="0"
                max={10}
                value={amount}
                onChange={onCChangeHandler}
                className="border p-2 w-full mb-2 rounded text-white"
                placeholder="Enter between 1-10"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
                onClick={handleGenerate}
                className={`bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full ${!amount ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                disabled={!amount}
            >
                Generate
            </button>
            <div className="mt-2 space-y-1">
                {results.map((num, idx) => (
                    <div key={idx} className="flex items-center justify-between space-x-2">
                        <p className="text-stone-200 font-mono mb-0 flex-1">{num}</p>
                        <button
                            onClick={() => handleCopy(num, idx)}
                            className="bg-gray-700 text-xs text-white px-2 py-1 rounded hover:bg-gray-600 flex items-center"
                            title="Copy"
                        >
                            {copiedIdx === idx ? (
                                <span className="text-green-400 font-semibold">Copied!</span>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75M15.75 6v12a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h7.5A2.25 2.25 0 0115.75 6z" />
                                </svg>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>

    );
}