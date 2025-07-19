'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Donation {
  id: string;
  amount: number;
  purpose: string;
  payment_method: string;
  status: string;
  created_at: string;
}

interface DonationHistoryProps {
  userId: string;
}

export default function DonationHistory({ userId }: DonationHistoryProps) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalDonated, setTotalDonated] = useState(0);

  useEffect(() => {
    async function fetchDonations() {
      setLoading(true);
      try {
        // Fetch donations where donor_email matches the user's email
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) return;

        const { data, error } = await supabase
          .from('donations')
          .select('*')
          .eq('donor_email', userData.user.email)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching donations:', error);
          return;
        }

        setDonations(data || []);
        
        // Calculate total amount donated
        const total = (data || []).reduce((sum, donation) => sum + donation.amount, 0);
        setTotalDonated(total);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDonations();
  }, [userId]);

  return (
    <div className="space-y-6 animate-fadeInUp">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold">Your Donation History</h2>
        <div className="mt-2 md:mt-0">
          <span className="text-sm text-gray-500">Total Donated:</span>
          <span className="ml-2 text-xl font-bold text-orange-500">₹{totalDonated.toLocaleString()}</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-500">Loading your donations...</p>
        </div>
      ) : donations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(donation.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">₹{donation.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.payment_method}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        donation.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : donation.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <div className="inline-block p-3 rounded-full bg-orange-100 text-orange-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No donations yet</h3>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            You haven't made any donations yet. Your generosity can make a real difference in the lives of animals in need.
          </p>
          <div className="mt-6">
            <a
              href="/donate"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Make Your First Donation
            </a>
          </div>
        </div>
      )}

      <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
        <h3 className="font-medium text-orange-800 mb-2">Why Your Donations Matter</h3>
        <p className="text-sm text-orange-700">
          Your contributions help us provide food, shelter, medical care, and love to animals in need. Every rupee makes a difference!
        </p>
      </div>
    </div>
  );
}