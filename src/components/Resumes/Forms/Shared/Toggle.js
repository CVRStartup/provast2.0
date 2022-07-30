import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Toggle = ({ enabled, setEnabled }) => {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer'
    >
      <span className='sr-only'>Use setting</span>
      <span aria-hidden='true' className='pointer-events-none absolute w-full h-full rounded-md' />
      <span
        aria-hidden='true'
        className={classNames(
          enabled ? "bg-orange-600" : "bg-gray-200",
          "pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200"
        )}
      />
      <span
        aria-hidden='true'
        className={classNames(
          enabled ? "translate-x-5" : "translate-x-0",
          "pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200"
        )}
      />
    </Switch>
  );
};
