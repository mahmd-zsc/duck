import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLesson } from "../redux/slices/lessonSlice";
import img from "../../images/BaNaNa_DuCk-removebg-preview.png";

function AddLesson() {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.lesson);
  const [success, setSuccess] = useState(false);

  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("beginner");
  const [emoji, setEmoji] = useState("");
  const [color, setColor] = useState("#4287f5");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLesson = {
      title,
      level,
      emoji,
      color,
    };

    try {
      await dispatch(addLesson(newLesson)).unwrap();
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to left bottom, #fffcf3, #fffaeb, #fff8e4, #fff6dc, #fff4d5)",
        direction: "rtl", // من اليمين لليسار
      }}
      className="flex justify-center items-center min-h-screen bg-gray-50 px-6"
    >
      <div className="relative p-8 w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative z-20">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            إضافة درس جديد
          </h2>

          {loading && (
            <div className="mb-4 text-center text-blue-500 font-medium">
              جاري حفظ الدرس... 🌀
            </div>
          )}

          {success && (
            <div className="mb-4 text-center text-green-600 font-medium">
              ✅ تم إضافة الدرس بنجاح!
            </div>
          )}

          {error && (
            <div className="mb-4 text-center text-red-600 font-medium">
              🚫 حصلت مشكلة: {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* العنوان */}
            <div className="mb-6">
              <label className="block font-semibold text-gray-600 mb-2">
                عنوان الدرس
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 border border-black bg-[#FDEACA] text-[#FC8716] rounded-full transition duration-300"
                placeholder="اكتب عنوان الدرس"
              />
            </div>

            {/* المستوى */}
            <div className="mb-6">
              <label className="block font-semibold text-gray-600 mb-2">
                المستوى
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 border border-black bg-[#FDEACA] text-[#FC8716] rounded-full transition duration-300 cursor-pointer"
              >
                <option value="beginner">مبتدئ</option>
                <option value="intermediate">متوسط</option>
                <option value="advanced">متقدم</option>
              </select>
            </div>

            {/* الإيموجي */}
            <div className="mb-6">
              <label className="block font-semibold text-gray-600 mb-2">
                رمز تعبيري (Emoji)
              </label>
              <input
                type="text"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                required
                className="w-full p-3 border border-black bg-[#FDEACA] text-[#FC8716] rounded-full transition duration-300"
                placeholder="اكتب رمز (مثلاً: 🍎)"
              />
            </div>

            {/* اللون */}
            <div className="mb-6">
              <label className="block font-semibold text-gray-600 mb-2">
                اللون
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full p-3 border border-black bg-[#FDEACA] text-[#FC8716] rounded-full transition duration-300 cursor-pointer"
              />
            </div>

            {/* زرار الإرسال */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full border border-black hover:scale-105 duration-300 bg-[#FDEACA] text-[#FC8716] font-semibold text-lg shadow-md cursor-pointer"
            >
              {loading ? "جاري الإضافة..." : "إضافة الدرس"}
            </button>
          </form>
        </div>

        <div className="absolute top-60 -left-20 z-10">
          <img src={img} alt="صورة كارتونية" />
        </div>
      </div>
    </div>
  );
}

export default AddLesson;
