import React, { useState } from "react";
import { usePets } from "../hooks/usePets";

const LostPetForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { createPet } = usePets();

  const [form, setForm] = useState({
    name: "",
    animalType: "",
    breed: "",
    location: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPet({ ...form, image: "" });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      window.alert("Failed to submit your lost pet report. Please check your information and try again.");
    }
  };

  const inputStyle =
    "mt-1 block w-full max-w-full box-border rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm p-3 dark:text-white";

  if (submitted) {
    return (
      <div className="bg-green-100 p-6 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
        <p>Your pet has been reported successfully.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center px-4 w-full">
      <div className="w-full max-w-2xl bg-white dark:bg-background-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 overflow-hidden">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Report a Lost Pet
        </h2>

        <form className="p-0 space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <input
              type="text"
              name="name"
              placeholder="Pet Name"
              value={form.name}
              className={`sm:col-span-2 ${inputStyle}`}
              onChange={handleChange}
              required
            />

            <select
              name="animalType"
              className={inputStyle}
              value={form.animalType}
              onChange={handleChange}
              required
            >
              <option value="">Select Animal Type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Reptile">Reptile</option>
              <option value="Equine">Equine</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              name="breed"
              placeholder="Breed"
              value={form.breed}
              className={inputStyle}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Last Seen Location"
              value={form.location}
              className={`sm:col-span-2 ${inputStyle}`}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Describe your pet (color, size, special marks...)"
              className={`sm:col-span-2 ${inputStyle} h-28 resize-none`}
              value={form.description}
              onChange={handleChange}
              required
            />

            <p className="sm:col-span-2 text-sm text-gray-500 dark:text-gray-400 italic">
              Photo uploads are not yet available — this feature is coming soon.
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center rounded-lg h-12 px-5 bg-yellow-600 hover:bg-yellow-700 text-white font-bold"
          >
            Report Lost Pet
          </button>
        </form>
      </div>
    </section>
  );
};

export default LostPetForm;