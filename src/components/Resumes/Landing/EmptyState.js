export const EmptyState = ({ setState, heading, Icon }) => {
  return (
    <button
      onClick={() => setState(2)}
      className='relative h-80 block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400'
    >
      <div className='inline-block mx-auto'>
        <Icon size={60} color='#aaa' />
      </div>
      <span className='mt-2 block text-lg font-medium uppercase text-gray-400'>
        {heading}
      </span>
    </button>
  );
};
