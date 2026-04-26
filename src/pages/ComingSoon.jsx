
function ComingSoon({ title = "Halaman" }) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
  
        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <h1 className="text-lg font-semibold text-gray-700">
            {title}
          </h1>
  
          <p className="text-gray-400 mt-2 text-sm">
            Fitur ini sedang dalam pengembangan 🚧
          </p>
  
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded text-sm">
            Segera Hadir
          </button>
        </div>
  
      </div>
    );
  }
  
  export default ComingSoon;