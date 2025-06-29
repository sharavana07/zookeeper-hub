// src/pages/MedicalFormPage.jsx
import MedicalForm from "../components/MedicalForm";

export default function MedicalFormPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">➕ Add Medical Log</h1>
      <MedicalForm />
    </div>
  );
}
