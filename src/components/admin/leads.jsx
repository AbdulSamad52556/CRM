import React from 'react'

const Leads = () => {
  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Title</th>
                    <th className="py-3 px-6 text-left">Company</th>
                    <th className="py-3 px-6 text-left">Value</th>
                    <th className="py-3 px-6 text-left">Date</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Action</th>{/* view */}
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">John</td>
                    <td className="py-3 px-6 text-left">986728</td>
                    <td className="py-3 px-6 text-left">john@example.com</td>
                    <td className="py-3 px-6 text-left">
                        <span className="text-green-500 font-semibold">Active</span>
                    </td>
                    <td className="py-3 px-6 text-left">active</td>
                    <td className="py-3 px-6 text-left">
                        <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">Login</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Leads
