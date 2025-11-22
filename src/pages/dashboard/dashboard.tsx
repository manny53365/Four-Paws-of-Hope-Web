import Filters from "../../components/Filters";
import PetCard from "../../components/PetCard";
import Pagination from "../../components/Pagination";

const mockPets = [
  {
    id: 1,
    name: "Buddy",
    status: "Lost" as "Lost" | "Found",
    breed: "Golden Retriever",
    location: "San Francisco, CA",
    description: "Buddy went missing near Golden Gate Park. He's very friendly and has a blue collar.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmxtJRd6YRiGYHcIlc7sCvI3i2p83L1Kqf3LyKjAR3e9VyAiMaCnBe6zTJB-EigKjAG3-xmxx2__8-l_xWo6FQ-VF8bx4lRvaZqt9abBP9IU-CiqlSSenG66CLkEGD-kETnxJAHOdgRBrtc2pKBH7dz7oGKsD-0vQe_7zHoGHNlnJfMDznkGa6ZZis9mbT90g5a20_zfG6d7rEm6onHX-c3y-oL8ERIyG0xovag9gug4ONV-aYt4HX_ziZHhzSrvPn_YI_GuFpNFk"
  },
  {
    id: 2,
    name: "Whiskers",
    status: "Found" as "Lost" | "Found",
    breed: "Tabby Cat",
    location: "Oakland, CA",
    description: "Found this sweet cat in my backyard. No collar, but seems well-cared for. Very vocal.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuMc4R2mUDp0tTGFKgCzDJnRYEEQGDZmKFbGx6-1G0zqkhMuBFRXAPSCdseujSiBsqQrmgD1eXnqAO3eXQEjkCFGfQQhnqiZ0RBgQkU8_HWSz1cabeym579X_hAOY4-F729WRUN3rJ0WXmljjyGZcr7FYynOTEhKyj4a2e4_FxSpdmD-ThVtAw-SoqqDGIgfeTcUn0212YWP3Cl9uTPr9QwHgn5hmoayufAalNIGZRFCwwYIqHN-1u1UrXxYS_YPPXQlvLVFPyHQI"
  }
];

export default function Dashboard() {
  return (
    <main className="w-full mx-auto container px-4 sm:px-6 lg:px-10 py-8 grid grid-cols-12 gap-8">
      <aside className="col-span-12 lg:col-span-3">
        <Filters />
      </aside>

      <section className="col-span-12 lg:col-span-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockPets.map(Pet => <PetCard key={Pet.id} Pet={Pet} />)}
        </div>
        <Pagination />
      </section>
    </main>
  );
}
