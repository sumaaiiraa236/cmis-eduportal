import React from "react";

export default function StudentFees() {
  const feesData = [
    { term: "Semester 1", total: 40000, paid: 40000 },
    { term: "Semester 2", total: 42000, paid: 38000 },
    { term: "Semester 3", total: 45000, paid: 0 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Student Fees</h1>
      <p className="text-gray-600 mb-6">Check your payment details and pending dues.</p>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Term</th>
              <th className="px-6 py-3">Total Fee (₹)</th>
              <th className="px-6 py-3">Paid (₹)</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {feesData.map((fee, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{fee.term}</td>
                <td className="px-6 py-3">{fee.total}</td>
                <td className="px-6 py-3">{fee.paid}</td>
                <td
                  className={`px-6 py-3 font-semibold ${
                    fee.paid === fee.total
                      ? "text-green-600"
                      : fee.paid === 0
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {fee.paid === fee.total
                    ? "Paid"
                    : fee.paid === 0
                    ? "Unpaid"
                    : "Partially Paid"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
