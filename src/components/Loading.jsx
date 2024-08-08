const Loading = () => {
  return (
    <div className="loading text-white flex flex-row gap-4">
      <p>Loading...</p>
      <div className="rounded-full w-5 h-6 border-t-4 border-green-600 animate-spin"></div>
    </div>
  );
};

export default Loading;
