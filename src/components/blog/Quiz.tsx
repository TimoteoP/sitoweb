// Uso in MDX
// <Quiz
//  question="Qual è la leva principale del pricing?"
//  options={['Domanda', 'Percezione di valore', 'Costo di produzione']}
//  answer="Percezione di valore"
// />

'use client';

import { useState } from 'react';

type Props = {
  question: string;
  options: string[];
  answer: string;
};

export default function Quiz({ question, options, answer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="my-6 rounded-xl border p-4">
      <p className="font-semibold mb-2">{question}</p>
      <ul className="space-y-2">
        {options.map((opt) => (
          <li key={opt}>
            <button
              onClick={() => setSelected(opt)}
              className={`w-full rounded-lg border px-3 py-2 text-left ${
                selected === opt
                  ? opt === answer
                    ? 'bg-green-100 border-green-400'
                    : 'bg-red-100 border-red-400'
                  : 'hover:bg-gray-50'
              }`}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>
      {selected && (
        <p className="mt-3 text-sm">
          {selected === answer ? '✅ Esatto!' : '❌ Risposta sbagliata'}
        </p>
      )}
    </div>
  );
}