import React, { useState } from "react";
import { generateGTIN14,generateGTIN13,generateGTIN12,generateGTIN8 } from "../utils/gtingenerator";

export default function GtinCard({ type }) {
    const [amount, setAmount] = useState(1);
    const [results, setResults] = useState([]);

    const handleGenerate = () => {
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
    return (
       <div className="bg-slate-900 p-4 rounded shadow-xl w-full sm:w-1/2 md:w-1/4">
            <h2 className="text-xl text-white font-bold mb-2">{type}</h2>
            <input
                type="number"
                min="1"
                value={amount}
                onChange={e => setAmount(parseInt(e.target.value))}
                className="border p-2 w-full mb-2 rounded text-white"
                placeholder="How many?"
            />
            <button
                onClick={handleGenerate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 w-full"
            >
                Generate
            </button>
            <div className="mt-2 space-y-1">
                {results.map((num, idx) => (
                    <p key={idx} className="text-stone-200  font-mono">{num}</p>
                ))}
            </div>
        </div>

    );
}