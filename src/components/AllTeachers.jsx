import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { getAllProfessors } from '../lib/api';
import { Mail, MapPin, Star, Eye } from "lucide-react";
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import Header from './Header';
const AllTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
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
            setFiltered(
                teachers.filter(t => {
                    const name = t.full_name ? t.full_name.toLowerCase() : '';
                    const dept = t.department ? t.department.toLowerCase() : '';
                    const query = search.toLowerCase();
                    return name.includes(query) || dept.includes(query);
                })
            );
        }
    }, [search, teachers]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className=" mx-auto py-10 px-8">

                <h1 className="text-3xl font-bold mb-6 text-center">All Faculty Members</h1>
                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <div className="relative flex-1 max-w-lg">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-6 w-6 animate-pulse" />
                        <Input
                            type="text"
                            placeholder="Search professor by name, department..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-12 py-6 text-lg rounded-xl border-2 border-indigo-200 focus:border-indigo-400 transition-all duration-200"
                        />
                    </div>

                </div>
                {/* <div className="flex items-center gap-2 mb-8 max-w-md mx-auto">
                    <input
                        type="text"
                        className="pl-12 py-6 text-lg rounded-xl border-2 border-indigo-200 focus:border-indigo-400 transition-all duration-200"
                        placeholder="Search by name or department..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <Search className="h-5 w-5 text-gray-500" />
                </div> */}
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center">No teachers found.</div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filtered.map(t => (
                            <div
                                key={t.id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 h-[480px] flex flex-col w-full"
                            >
                                {/* Top image */}
                                <div className="relative h-52">
                                    <img
                                        src={t.profile_image_url || '/default-avatar.png'}
                                        alt={t.full_name}
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                t.full_name
                                            )}&size=128&background=ffffff&color=3b82f6`;
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">{t.full_name}</h2>
                                        <p className="text-gray-600 text-sm mb-3">{t.department}</p>

                                        <div className="flex items-center text-sm text-gray-600 mb-1">
                                            <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                            {t.email}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 mb-3">
                                            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                                            {t.office_location}
                                        </div>
                                    </div>

                                    {/* Footer Button */}
                                    <button
                                        onClick={() => navigate(`/professor/${t.id}`)}
                                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                                    >
                                        <Eye className="w-4 h-4" /> View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                )}
            </div>
        </div>
    );
};

export default AllTeachers;
