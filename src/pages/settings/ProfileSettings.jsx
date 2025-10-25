import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, Mail, Phone, MapPin, Calendar, Save } from "lucide-react";
import { updateProfile } from "../../store/slices/authSlice";
import { toast } from 'sonner';

function ProfileSettings() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "+1 (555) 123-4567",
    address: user?.address || "123 Main St, City, State 12345",
    dateOfBirth: user?.dateOfBirth || "1995-05-15",
    bio: user?.bio || "Student at EduManage University",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(updateProfile(formData));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600">Manage your personal information</p>
      </div>

      {/* Profile Header */}
      <div className="bg-white border rounded-lg shadow p-6 flex items-center gap-6">
        <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
          {getInitials(user?.name)}
        </div>
        <div className="flex-1">
          <h2 className="text-gray-900 text-xl font-semibold mb-1">
            {user?.name}
          </h2>
          <p className="text-gray-600 mb-2">{user?.email}</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">
              Change Photo
            </button>
            <button className="px-3 py-1 border border-red-500 text-red-600 rounded hover:bg-red-50">
              Remove Photo
            </button>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white border rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="John Doe"
                  className="w-full border rounded px-9 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border rounded px-9 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full border rounded px-9 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* DOB */}
            <div>
              <label className="block text-gray-700 mb-1">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  className="w-full border rounded px-9 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full border rounded px-9 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                rows={4}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </div>

        {/* Student Info */}
        {user?.studentId && (
          <div className="bg-white border rounded-lg shadow p-6 mt-6">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              Student Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Student ID</label>
                <input
                  value={user.studentId}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Role</label>
                <input
                  value={user.role}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-50 capitalize"
                />
              </div>
            </div>
          </div>
        )}

        {/* Faculty Info */}
        {user?.department && (
          <div className="bg-white border rounded-lg shadow p-6 mt-6">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              Faculty Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Department</label>
                <input
                  value={user.department}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Role</label>
                <input
                  value={user.role}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-50 capitalize"
                />
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileSettings;
