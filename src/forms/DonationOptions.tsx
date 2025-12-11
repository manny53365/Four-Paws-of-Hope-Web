import React from "react";

const DonationOptions: React.FC = () => {
  return (
    <section className="flex flex-col items-center px-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-center text-2xl md:text-3xl font-bold pb-3 pt-5">
          Choose Your Donation Amount
        </h2>

        <div className="flex justify-center px-4 py-3">
          <div className="flex h-10 w-full max-w-xs items-center justify-center rounded-lg bg-gray-500 dark:bg-gray-500 p-1">
            {["One-Time", "Monthly"].map((freq) => (
              <label
                key={freq}
                className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-gray-500 dark:text-gray-100 hover:dark:text-gray-500 hover:text-gray-100 text-sm font-medium leading-normal bg-gray-500 hover:bg-white dark:hover:bg-background-dark"
              >
                <span className="truncate">{freq}</span>
                <input
                  type="radio"
                  name="donation_frequency"
                  value={freq}
                  className="invisible w-0"
                  defaultChecked={freq === "One-Time"}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-3 px-4 py-3 max-w-lg">
          {["$10","$25", "$50", "$100", "Other"].map((amt, i) => (
            <button
              key={i}
              className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded h-12 px-5 font-bold tracking-[0.015em] bg-gray-500 dark:bg-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-100 hover:text-gray-700 dark:hover:text-gray-100"
            >
              {amt}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationOptions;
