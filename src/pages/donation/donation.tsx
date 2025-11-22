import React from "react";
import DonationOptions from "../../forms/DonationOptions";
import DonationForm from "../../forms/DonationForm";

const Donation: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="px-4 pt-5">
        <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4 bg-gray-500" >
          <h1 className="text-black dark:text-white text-4xl font-black text-center">Give Hope to a Pet in Need</h1>
          <p className="text-black dark:text-white text-sm text-center mt-2">
            Your contribution helps us reunite lost pets with their families and find loving homes for those without one.
          </p>
        </div>
      </div>
      <DonationOptions />
      <DonationForm />
    </div>
  );
};

export default Donation;
