const AdoptionPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">
          How to Adopt Your New Companion
        </h2>
        <p className="text-slate-600 mb-4">
          Congratulations on finding your perfect match! Follow these steps to
          adopt your new companion:
        </p>
        <ol className="list-decimal list-inside text-slate-600 space-y-2 mb-4">
          <li>Contact our adoption team via phone or email.</li>
          <li>Complete an adoption application form.</li>
          <li>Attend an interview and schedule a home visit.</li>
          <li>Finalize the adoption agreement and pay any necessary fees.</li>
          <li>Take your new family member home!</li>
        </ol>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">
          A thank you from Olly
        </h3>
        <p className="text-slate-600 mb-4">
          Thank you for exploring the website! Here's a picture of my dog Olly
          on his first birthday (extra I know) to show my appreciation.
        </p>
        <img
          src="/Olly2.jpg"
          alt="My Dog"
          className="w-full h-auto rounded-xl shadow-sm mx-auto"
        />
      </div>
    </div>
  );
};

export default AdoptionPage;
