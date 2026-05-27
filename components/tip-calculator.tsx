"use client";

import { useState } from "react";

interface TipCalculatorProps {
  onCalculate?: (result: { bill: number; tip: number; total: number }) => void;
}

const tipPercentages = [10, 15, 18, 20, 25];

export function TipCalculator({ onCalculate }: TipCalculatorProps) {
  const [billAmount, setBillAmount] = useState("");
  const [selectedTip, setSelectedTip] = useState<number | null>(15);
  const [customTip, setCustomTip] = useState("");
  const [splitCount, setSplitCount] = useState(1);

  const bill = parseFloat(billAmount) || 0;
  const tipPercent = customTip ? parseFloat(customTip) : selectedTip || 0;
  const tipAmount = bill * (tipPercent / 100);
  const total = bill + tipAmount;
  const perPerson = total / splitCount;

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    if (value) {
      setSelectedTip(null);
    }
  };

  const handleTipSelect = (percent: number) => {
    setSelectedTip(percent);
    setCustomTip("");
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-[var(--card)] p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Tip Calculator
      </h2>

      {/* Bill Amount */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-[var(--muted-foreground)]">
          Bill Amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
            $
          </span>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--secondary)] py-3 pl-8 pr-4 text-lg text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20"
          />
        </div>
      </div>

      {/* Tip Percentage */}
      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-[var(--muted-foreground)]">
          Select Tip %
        </label>
        <div className="grid grid-cols-5 gap-2">
          {tipPercentages.map((percent) => (
            <button
              key={percent}
              onClick={() => handleTipSelect(percent)}
              className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${
                selectedTip === percent && !customTip
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--muted)]"
              }`}
            >
              {percent}%
            </button>
          ))}
        </div>
        <div className="mt-2">
          <input
            type="number"
            value={customTip}
            onChange={(e) => handleCustomTipChange(e.target.value)}
            placeholder="Custom %"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--secondary)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20"
          />
        </div>
      </div>

      {/* Split Bill */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-[var(--muted-foreground)]">
          Split Between
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--secondary)] text-lg font-bold text-[var(--secondary-foreground)] transition-colors hover:bg-[var(--muted)]"
          >
            -
          </button>
          <span className="min-w-[3rem] text-center text-xl font-semibold text-[var(--foreground)]">
            {splitCount}
          </span>
          <button
            onClick={() => setSplitCount(splitCount + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--secondary)] text-lg font-bold text-[var(--secondary-foreground)] transition-colors hover:bg-[var(--muted)]"
          >
            +
          </button>
          <span className="text-sm text-[var(--muted-foreground)]">
            {splitCount === 1 ? "person" : "people"}
          </span>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-xl bg-[var(--primary)] p-5 text-[var(--primary-foreground)]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Tip Amount</p>
            <p className="text-2xl font-bold">${tipAmount.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Total</p>
            <p className="text-2xl font-bold">${total.toFixed(2)}</p>
          </div>
        </div>
        {splitCount > 1 && (
          <div className="border-t border-white/20 pt-4 text-center">
            <p className="text-sm opacity-80">Per Person</p>
            <p className="text-3xl font-bold">${perPerson.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
