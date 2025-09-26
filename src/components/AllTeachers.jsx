import React, { useEffect, useState } from "react";
import { Search, Mail, MapPin, Eye } from "lucide-react";
import { getAllProfessors } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Header from "./Header";

const AllTeachers = () => {
const [teachers, setTeachers] = useState([]);
 const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  
  const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    async function fetchTeachers() {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllProfessors();
        setTeachers(data);
        setFiltered(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(teachers);
    } else {
      const query = search.toLowerCase();
      setFiltered(
        teachers.filter((t) => {
          const name = t.full_name ? t.full_name.toLowerCase() : "";
          const dept = t.department ? t.department.toLowerCase() : "";
          return name.includes(query) || dept.includes(query);
        })
      );
    }
  }, [search, teachers]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="mx-auto py-10 px-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          All Faculty Members
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-6 w-6 animate-pulse" />
            <Input
              type="text"
              placeholder="Search professor by name, department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 py-6 text-lg rounded-xl border-2 border-indigo-200 focus:border-indigo-400 transition-all duration-200"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          // Skeleton Loader
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow p-6 animate-pulse"
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-gray-200"></div>
                  <div className="h-4 bg-gray-200 rounded mt-4 w-3/4 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded mt-2 w-1/2 mx-auto"></div>
                </div>
              ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center">No teachers found.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center p-6"
              >
                {/* Profile Image */}
                <img
                  src={t.profile_image_url || "/default-avatar.png"}
                  alt={t.full_name}
                  className="w-32 h-32 rounded-full border-2 border-blue-500 object-cover shadow-md -mt-10 bg-white"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      t.full_name
                    )}&size=128&background=ffffff&color=3b82f6`;
                  }}
                />

                {/* Info */}
                <div className="mt-4 text-center flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t.full_name}
                  </h2>
                  <p className="text-indigo-600 font-medium mb-3">
                    {t.department}
                  </p>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-1">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a
                      href={`mailto:${t.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {t.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {t.office_location}
                  </div>
                </div>

                {/* Footer Button */}
                <button
                  onClick={() => navigate(`/professor/${t.id}`)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition hover:cursor-pointer"
                >
                  <Eye className="w-4 h-4" /> View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTeachers;
