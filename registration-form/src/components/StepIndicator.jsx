const StepIndicator = ({ step }) => (
  <div className="step-indicator">
    <span className={step === 1 ? 'active' : ''}>1</span>
    <span className={step === 2 ? 'active' : ''}>2</span>
  </div>
);
export default StepIndicator; 