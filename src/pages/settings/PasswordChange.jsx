import { useState } from 'react';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { toast } from 'sonner';


export default function PasswordChange() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
    };
  };

  const passwordValidation = validatePassword(formData.newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.currentPassword) {
      toast.error('Please enter your current password');
      return;
    }

    if (!passwordValidation.isValid) {
      toast.error('New password does not meet requirements');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('Password changed successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Change Password</h1>
        <p className="text-gray-600">
          Update your password to keep your account secure.
        </p>
      </div>

      {/* Security Tip */}
      <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 text-indigo-800 p-4 rounded-xl">
        <Shield className="w-5 h-5 mt-1" />
        <p>
          Use a strong password that includes uppercase, lowercase, numbers, and symbols.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
          Update Password
        </h2>

        {/* Current Password */}
        <div>
          <label htmlFor="currentPassword" className="font-medium text-gray-700">
            Current Password
          </label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              id="currentPassword"
              type={showPasswords.current ? 'text' : 'password'}
              value={formData.currentPassword}
              onChange={(e) => handleChange('currentPassword', e.target.value)}
              className="w-full border rounded-lg py-2 pl-10 pr-10 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter current password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="font-medium text-gray-700">
            New Password
          </label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              id="newPassword"
              type={showPasswords.new ? 'text' : 'password'}
              value={formData.newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
              className="w-full border rounded-lg py-2 pl-10 pr-10 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter new password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Password validation display */}
          {formData.newPassword && (
            <div className="bg-gray-50 mt-3 p-4 rounded-lg space-y-1 text-sm text-gray-700">
              <p className="font-medium mb-1 text-gray-900">Password must contain:</p>
              {[
                { key: 'minLength', label: 'At least 8 characters' },
                { key: 'hasUpperCase', label: 'One uppercase letter' },
                { key: 'hasLowerCase', label: 'One lowercase letter' },
                { key: 'hasNumber', label: 'One number' },
                { key: 'hasSpecialChar', label: 'One special character' },
              ].map((rule) => (
                <div key={rule.key} className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      passwordValidation[rule.key] ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  ></span>
                  <span
                    className={`${
                      passwordValidation[rule.key] ? 'text-green-600' : 'text-gray-600'
                    }`}
                  >
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="font-medium text-gray-700">
            Confirm New Password
          </label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              id="confirmPassword"
              type={showPasswords.confirm ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className="w-full border rounded-lg py-2 pl-10 pr-10 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Confirm new password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {formData.confirmPassword &&
            formData.newPassword !== formData.confirmPassword && (
              <p className="text-red-600 mt-1 text-sm">Passwords do not match</p>
            )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() =>
              setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
            }
            className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !passwordValidation.isValid}
            className={`px-5 py-2 rounded-lg font-medium text-white transition ${
              loading || !passwordValidation.isValid
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
}
