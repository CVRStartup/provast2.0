import { MailIcon } from "@heroicons/react/outline";

export const Contact = () => {
  return (
    <div id="contact-us" className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-3 md:gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
              Sales Support
            </h2>
            <div className="mt-3">
              <p className="text-lg text-gray-500">
                Any queries related to sales please contact the mentioned email.
              </p>
            </div>
            <div className="mt-2">
              <div className="mt-6 flex">
                <div className="flex-shrink-0">
                  <MailIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>sales@provast.io</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 md:mt-0">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
              Technical Support
            </h2>
            <div className="mt-3">
              <p className="text-lg text-gray-500">
                For any technical support needed please contact the mentioned email.
              </p>
            </div>
            <div className="mt-2">
              <div className="mt-6 flex">
                <div className="flex-shrink-0">
                  <MailIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>support@provast.io</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 md:mt-0">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
              Our Offices
            </h2>
            <div className="mt-3">
              <p className="text-lg text-gray-500">Hyderabad, India.</p>
              <p className="text-lg text-gray-500">Sydney, Australia.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
