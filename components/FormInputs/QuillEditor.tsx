import React from "react";
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import '../../public/styles/quill.snow.css'; // Adjust the path as needed

type QuillEditorProps = {
  label: string;
  className?: string;
  value: string;
  onChange: (content: string) => void;
  error?: string;
};

export default function QuillEditor({
  label,
  className = "w-full bg-green-500",
  value,
  onChange,
  error = "",
}: QuillEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "color", "image"],
      [{ "code-block": true }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "indent",
    "image",
    "code-block",
    "color",
  ];

  return (
    <div className={`w-[500px] ${className}`}>
      <label
        htmlFor="content"
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
      >
        {label}
      </label>
      {error && <p className="text-red-600 text-xs -mt-2 mb-2">{error}</p>}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats} />
    </div>
  );
}
