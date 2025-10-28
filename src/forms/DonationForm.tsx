import React, { useState } from "react";
//TODO: Integrate with Stripe everything is mock for now

const DonationForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-100 p-6 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
        <p>Your donation has been received.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center px-4 w-full">
      <div className="w-full max-w-2xl bg-white dark:bg-background-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Secure Donation
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary text-black dark:text-gray-300">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-500 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 dark:text-gray-100"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-500 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 dark:text-gray-100"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="sm:col-span-2 mt-1 block w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-500 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm p-2 dark:text-gray-100"
                required
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary text-black dark:text-gray-300">
              Payment Details
            </h3>
            {/* Card details form and button are all mock data for now */}
            <div className="p-2 block w-full rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-500 shadow-sm text-gray-500 dark:text-gray-100">
              <p className="text-sm text-gray-400">
                Secure card input field
              </p>
            </div>
          </div>

          <button className="w-full flex items-center justify-center rounded-lg h-12 px-5 bg-secondary text-primary font-bold hover:bg-secondary/90 bg-yellow-600 hover:bg-yellow-700 text-white">
            Complete Your Donation
          </button>
          <div className="flex items-center justify-center gap-4 text-gray-400 dark:text-gray-500 pt-4 text-xs">
            <p>Secure Payment</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DonationForm;
