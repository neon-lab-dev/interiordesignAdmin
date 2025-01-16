const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen"><div className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-accent-40 border-[#3b9df84b]"></div></div>
    );
};

export default LoadingSpinner;