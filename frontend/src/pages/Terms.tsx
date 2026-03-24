import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 mt-20">
      {/* Header */}
      <div className="max-w-3xl mx-auto flex items-center gap-3 mb-6">
        <Link to="/" className="p-2 rounded-full hover:bg-gray-200 transition">
          <FaArrowLeft />
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Terms & Conditions
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-5 sm:p-8 space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using our platform, you agree to comply with and be
            bound by these Terms & Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            2. User Accounts
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and all activities that occur under it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            3. User Conduct
          </h2>
          <p>
            You agree not to use the service for any illegal, harmful, or
            abusive activities. Respect other users and follow community rules.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            4. Content Ownership
          </h2>
          <p>
            You retain ownership of the content you create, but grant us a
            license to use it for providing and improving our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            5. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate your account if you
            violate these terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            6. Limitation of Liability
          </h2>
          <p>
            We are not responsible for any damages or losses resulting from the
            use of our service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            7. Changes to Terms
          </h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            service means you accept the updated terms.
          </p>
        </section>

        <div className="text-sm text-gray-400 pt-4 border-t">
          Last updated: March 2026
        </div>
      </div>
    </div>
  );
};

export default Terms;
