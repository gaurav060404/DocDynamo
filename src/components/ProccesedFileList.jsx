export default function ProcessedFileList({ files = [] }) {
  return (
    <div className="mt-4 text-sm text-gray-500 text-center">
      {files.length === 0 ? (
        <p className="mt-10 font-heading font-semibold">No files processed yet</p>
      ) : (
        <div className="flex flex-col gap-2">
        <p className="font-heading font-semibold">Proccessed Files</p>
        <ul className="font-body">
          {files.map((file, idx) => (
            <li key={idx}>{file.name}</li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
}
