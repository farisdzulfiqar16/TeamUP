function StepIndicator({ step }) {
    const steps = [1, 2, 3];
  
    return (
      <div className="mb-6 flex items-center justify-between">
        {steps.map((s, index) => (
          <div key={s} className="flex w-full items-center">
  
            {/* Circle */}
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium
                ${step >= s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-300"}
              `}
            >
              {s}
            </div>
  
            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`mx-2 h-1 flex-1
                  ${step > s ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}
                `}
              />
            )}
  
          </div>
        ))}
      </div>
    );
  }
  
  export default StepIndicator;
  