// src/components/admin/Sidebar.tsx
import React from "react";
import { Question } from "../../type";

interface SidebarProps {
  questions: Question[];
  currentIndex: number;
  onSelect(index: number): void;
  onAdd(): void;
  completedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  questions,
  currentIndex,
  onSelect,
  onAdd,
  completedCount,
}) => {
  const progressPercentage =
    questions.length > 0 ? (completedCount / questions.length) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-6">
      <h3 className="font-semibold text-gray-900 mb-3">Questions</h3>
      <div className="space-y-2 mb-4">
        {questions.map((q, idx) => {
          const isCompleted = q.question.trim() && q.category && q.level;
          const isCurrent = idx === currentIndex;
          return (
            <div
              key={q.id}
              className={`p-2 rounded-lg cursor-pointer transition-colors ${
                isCurrent
                  ? "bg-purple-100 border-purple-200 border"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => onSelect(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(idx);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Question {idx + 1}</span>
                <div
                  className={`w-2 h-2 rounded-full ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`}
                  aria-label={
                    isCompleted ? "Question completed" : "Question incomplete"
                  }
                />
              </div>
              <p className="text-xs text-gray-500 truncate">
                {q.question.trim() || "Empty question"}
              </p>
            </div>
          );
        })}
      </div>
      <button
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors"
      >
        ➕ Add Question
      </button>
      <div className="mt-4 pt-4 border-t">
        <div className="text-xs text-gray-500 mb-1">Progress</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-xs font-medium text-gray-600">
            {completedCount}/{questions.length}
          </span>
        </div>
      </div>
    </div>
  );
};
