/* eslint-disable @next/next/link-passhref */
import { CheckIcon, ChevronDownIcon, MinusIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React, { Fragment } from "react";
import { Loading } from "../../src/components/Reusables/Loading";
import { usePlan } from "../../src/hooks/usePlan";
import { getLoginSession } from "../../src/lib/auth";
import { getEighteenPercent } from "../../src/lib/helper";
import { findUser } from "../../src/lib/user";

const plans = [
  {
    name: "Basic",
    price: 129,
    description: "Quis suspendisse ut fermentum neque vivamus non tellus.",
  },
  {
    name: "Essential",
    price: 179,
    description: "Quis eleifend a tincidunt pellentesque. A tempor in sed.",
  },
  {
    name: "Premium",
    price: 259,
    description: "Orci volutpat ut sed sed neque, dui eget. Quis tristique non.",
  },
];
const sections = [
  {
    name: "Features",
    features: [
      {
        name: "Templates",
        plans: { Basic: "Only simple templates", Essential: true, Premium: true },
      },
      {
        name: "JPEG Download",
        plans: { Basic: true, Essential: true, Premium: true },
      },
      {
        name: "PNG Download",
        plans: { Basic: true, Essential: true, Premium: true },
      },
      {
        name: "PDF Download",
        plans: { Basic: false, Essential: false, Premium: true },
      },
      {
        name: "VAST Watermark",
        plans: { Basic: true, Essential: false, Premium: false },
      },
      {
        name: "Color Palette",
        plans: { Basic: false, Essential: true, Premium: true },
      },
      {
        name: "Font Picker",
        plans: { Basic: false, Essential: true, Premium: true },
      },
      {
        name: "Test Patterns",
        plans: { Basic: false, Essential: "Upto 3 patterns", Premium: true },
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Packages = ({ userDetails }) => {
  const session = JSON.parse(userDetails);
  const { payment, isLoading } = usePlan(session?._id);
  const withoutGST = (amount, plan) => {
    if (!amount || !plan) return 0;
    return Math.floor(
      Number(amount) -
        Math.floor(Number(getEighteenPercent(plans.filter((p) => p.name === plan)[0]?.price)))
    );
  };
  if (isLoading) return <Loading />;
  return (
    <div className='bg-white pt-[10vh]'>
      {/* {loading && <Loading />} */}
      <div className='bg-orange-900'>
        {/* Header section with select menu */}
        <div className='max-w-2xl mx-auto py-6 px-4 sm:py-4 sm:px-6 lg:px-4 lg:max-w-7xl'>
          <div className='px-0 sm:px-4 lg:px-0 lg:flex lg:justify-between lg:items-center'>
            <div className='w-full'>
              <h2 className='text-3xl font-extrabold text-white sm:text-3xl sm:tracking-tight lg:text-4xl'>
                Pricing Plans
              </h2>
              <p className='mt-5 text-md text-orange-300'>
                Start building for free, then add a site plan to go live. Account plans unlock
                additional features.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className='max-w-2xl mx-auto bg-white py-2 sm:py-3 sm:px-6 lg:max-w-7xl lg:px-8'>
        {/* xs to lg */}
        <div className='space-y-2 lg:hidden'>
          {plans.map((tier, index) => (
            <section key={tier.name}>
              <div className='px-4 mb-8'>
                <h2 className='text-lg leading-6 font-medium text-gray-900'>{tier.name}</h2>
                <p>
                  <span className='text-4xl font-extrabold text-gray-900'>
                    ₹
                    {tier.price > withoutGST(payment?.amount, payment?.plan)
                      ? Math.max(
                          0,
                          tier.price - (payment ? withoutGST(payment?.amount, payment?.plan) : 0)
                        )
                      : tier.price}
                  </span>
                  <span className='text-base font-medium text-gray-500'>/year</span>
                </p>
                {/* <p className='mt-4 text-sm text-gray-500'>{tier.description}</p> */}
                <Link
                  href={
                    payment
                      ? withoutGST(payment?.amount, payment?.plan) < tier.price
                        ? `/packages/checkout/${index}`
                        : "#"
                      : `/packages/checkout/${index}`
                  }
                >
                  <button
                    className={`${
                      payment
                        ? withoutGST(payment?.amount, payment?.plan) < tier.price
                          ? "hover:to-pink-600 bg-gradient-to-r from-orange-500 to-pink-500"
                          : "cursor-not-allowed bg-gray-400"
                        : `hover:to-pink-600 bg-gradient-to-r from-orange-500 to-pink-500`
                    } cursor-pointer mt-6 block w-full  border border-transparent rounded-md shadow py-2 text-sm font-semibold text-white text-center`}
                  >
                    {payment
                      ? payment.plan === tier.name
                        ? "Purchased"
                        : (tier.price > payment.amount ? "Upgrade to " : "Buy ") + tier.name
                      : "Buy " + tier.name}
                  </button>
                </Link>
              </div>

              {sections.map((section) => (
                <table key={section.name} className='w-full'>
                  <caption className='bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left'>
                    {section.name}
                  </caption>
                  <thead>
                    <tr>
                      <th className='sr-only' scope='col'>
                        Feature
                      </th>
                      <th className='sr-only' scope='col'>
                        Included
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    {section.features.map((feature) => (
                      <tr key={feature.name} className='border-t border-gray-200'>
                        <th
                          className='py-5 px-4 text-sm font-normal text-gray-500 text-left'
                          scope='row'
                        >
                          {feature.name}
                        </th>
                        <td className='py-5 pr-4'>
                          {typeof feature.plans[tier.name] === "string" ? (
                            <span className='block text-sm text-gray-700 text-right'>
                              {feature.plans[tier.name]}
                            </span>
                          ) : (
                            <>
                              {feature.plans[tier.name] === true ? (
                                <CheckIcon
                                  className='ml-auto h-5 w-5 text-green-500'
                                  aria-hidden='true'
                                />
                              ) : (
                                <MinusIcon
                                  className='ml-auto h-5 w-5 text-gray-400'
                                  aria-hidden='true'
                                />
                              )}

                              <span className='sr-only'>
                                {feature.plans[tier.name] === true ? "Yes" : "No"}
                              </span>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </section>
          ))}
        </div>

        {/* lg+ */}
        <div className='hidden lg:block'>
          <table className='w-full h-px table-fixed'>
            <caption className='sr-only'>Pricing plan comparison</caption>
            <thead>
              <tr>
                <th
                  className='pb-4 pl-6 pr-6 text-sm font-medium text-gray-900 text-left'
                  scope='col'
                >
                  <span className='sr-only'>Feature by</span>
                  <span>Plans</span>
                </th>
                {plans.map((tier) => (
                  <th
                    key={tier.name}
                    className='w-1/4 pb-4 px-6 text-lg leading-6 font-medium text-gray-900 text-left'
                    scope='col'
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='border-t border-gray-200 divide-y divide-gray-200'>
              <tr>
                <th
                  className='py-2 pl-6 pr-6 align-top text-sm font-medium text-gray-900 text-left'
                  scope='row'
                >
                  Pricing
                </th>
                {plans.map((tier, index) => (
                  <td key={tier.name} className='h-full py-2 px-6 align-top'>
                    <div className='h-full flex flex-col justify-between'>
                      <div>
                        <p>
                          <span className='text-3xl font-extrabold text-gray-900'>
                            ₹
                            {tier.price > withoutGST(payment?.amount, payment?.plan)
                              ? Math.max(
                                  0,
                                  tier.price -
                                    (payment ? withoutGST(payment?.amount, payment?.plan) : 0)
                                )
                              : tier.price}
                          </span>
                          <span className='text-base font-medium text-gray-500'>/year</span>
                        </p>
                        {/* <p className='mt-4 text-sm text-gray-500'>{tier.description}</p> */}
                      </div>
                      <Link
                        href={
                          payment
                            ? withoutGST(payment?.amount, payment?.plan) < tier.price
                              ? `/packages/checkout/${index}`
                              : "#"
                            : `/packages/checkout/${index}`
                        }
                      >
                        <button
                          className={`${
                            payment
                              ? withoutGST(payment?.amount, payment?.plan) < tier.price
                                ? "hover:to-pink-600 bg-gradient-to-r from-orange-500 to-pink-500"
                                : "cursor-not-allowed bg-gray-400"
                              : `hover:to-pink-600 bg-gradient-to-r from-orange-500 to-pink-500`
                          } cursor-pointer mt-6 block w-full border border-transparent rounded-md shadow py-2 text-sm font-semibold text-white text-center`}
                        >
                          {payment
                            ? payment.plan === tier.name
                              ? "Purchased"
                              : (tier.price > withoutGST(payment?.amount, payment?.plan)
                                  ? "Upgrade to "
                                  : "Buy ") + tier.name
                            : "Buy " + tier.name}
                        </button>
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
              {sections.map((section) => (
                <Fragment key={section.name}>
                  {section.features.map((feature) => (
                    <tr key={feature.name}>
                      <th
                        className='py-3 pl-6 pr-6 text-sm font-normal text-gray-500 text-left'
                        scope='row'
                      >
                        {feature.name}
                      </th>
                      {plans.map((tier) => (
                        <td key={tier.name} className='py-2 px-6'>
                          {typeof feature.plans[tier.name] === "string" ? (
                            <span className='block text-sm text-gray-700'>
                              {feature.plans[tier.name]}
                            </span>
                          ) : (
                            <>
                              {feature.plans[tier.name] === true ? (
                                <CheckIcon className='h-5 w-5 text-green-500' aria-hidden='true' />
                              ) : (
                                <MinusIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                              )}

                              <span className='sr-only'>
                                {feature.plans[tier.name] === true ? "Included" : "Not included"} in{" "}
                                {tier.name}
                              </span>
                            </>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;

  return {
    props: {
      userDetails: JSON.stringify(user),
    },
  };
};

export default Packages;
