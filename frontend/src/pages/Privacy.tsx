import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 mt-20">
      {/* Header */}
      <div className="max-w-3xl mx-auto flex items-center gap-3 mb-6">
        <Link to="/" className="p-2 rounded-full hover:bg-gray-200 transition">
          <FaArrowLeft />
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Privacy Policy
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-5 sm:p-8 space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly, such as your name,
            email, and profile details when you create an account or use our
            services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            2. How We Use Your Information
          </h2>
          <p>
            We use your information to provide and improve our services,
            personalize your experience, and communicate with you.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            3. Sharing Information
          </h2>
          <p>
            We do not sell your personal information. We may share data only
            when required by law or to provide essential services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            4. Data Security
          </h2>
          <p>
            We use modern security measures to protect your data, but no system
            is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            5. Your Rights
          </h2>
          <p>
            You can access, update, or delete your personal data anytime through
            your account settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            6. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page.
          </p>
        </section>

        <div className="text-sm text-gray-400 pt-4 border-t">
          Last updated: March 2026
        </div>
      </div>
    </div>
  );
};

export default Privacy;
