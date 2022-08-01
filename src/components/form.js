import Image from "next/image";
import Link from "next/link";

const Form = ({ isLogin, errorMessage, onSubmit }) => (
  <div className='background min-h-[100vh] bg-gray-50 w-full flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8'>
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='relative w-48 h-16 mx-auto cursor-pointer'>
            <Link href={"/"}>
              <Image
                placeholder='blur'
                blurDataURL='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png'
                layout='fill'
                objectFit='contain'
                className=''
                src='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png'
                alt=''
              />
            </Link>
          </div>
          <h2 className='text-center text-2xl font-bold text-gray-900'>
            {isLogin ? "Log in" : "Sign up"} to your account
          </h2>
        </div>
        <form className='space-y-5 mt-8 ' onSubmit={onSubmit}>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email address
            </label>
            <div className='mt-1'>
              <input
                id='email'
                name='username'
                type='email'
                autoComplete='email'
                required
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
              />
            </div>
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <div className='mt-1'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label htmlFor='confirm-password' className='block text-sm font-medium text-gray-700'>
                Confirm Password
              </label>
              <div className='mt-1'>
                <input
                  id='confirm-password'
                  name='rpassword'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm'
                />
              </div>
            </div>
          )}

          {isLogin ? (
            <div className='flex items-center justify-between'>
              <Link href={"/auth/signup"}>
                <a className='ml-2 block text-sm text-gray-900 hover:underline'>
                  Are you a new user?
                </a>
              </Link>

              <div className='text-sm'>
                <Link href={"/auth/forgotpassword"}>
                  <a className='font-medium text-orange-600 hover:text-orange-500'>
                    Forgot your password?
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <div className='text-sm'>
              <span>Already a user? </span>
              <Link href={"/auth/login"}>
                <a className='hover:text-gray-900 hover:underline'>Log in</a>
              </Link>
            </div>
          )}

          <div>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
            >
              {isLogin ? "Log in" : "Sign up"}
            </button>
          </div>
          {errorMessage && <p className='error text-sm text-red-500'>{errorMessage}</p>}
        </form>
      </div>
    </div>
  </div>
);

export default Form;
