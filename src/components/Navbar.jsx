import React, { useState } from 'react';
import logo from '../images/crypto.png';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Crypto', href: '/', current: true },
  { name: 'NFTs', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const Navbar = () => {
  const { user, logOut } = UserAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await logOut();
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link to="/">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-10 w-auto lg:hidden"
                      src={logo}
                      alt="Logo"
                    />
                    <img
                      className="hidden h-10 w-auto lg:block"
                      src={logo}
                      alt="Logo"
                    />

                    <p className="text-xl pl-2 text-white">
                      <span className="text-teal-400">C</span>hain
                      <span className="text-teal-400">C</span>
                      heck
                    </p>
                  </div>
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute top-20 left-0 w-full h-full flex items-center justify-center modal-background">
                  <div className="bg-gray-700 pointer-events: none rounded-md p-6 sm:p-6 md:p-6 lg:p-8 m-6">
                    <div className="text-lg font-medium text-white">
                      You have logged out!
                    </div>
                    <div className="text-white">
                      You can log in again by clicking the login button.
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      {user?.photoURL ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.photoURL}
                          alt=""
                        />
                      ) : (
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://s3.amazonaws.com/www-inside-design/uploads/2019/03/hamburgerheader.jpg"
                          alt=""
                        />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {user?.email ? (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/account"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Account
                            </a>
                          )}
                        </Menu.Item>
                      ) : null}
                      {user?.email ? (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/watchlist"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Watchlist
                            </a>
                          )}
                        </Menu.Item>
                      ) : null}
                      {user?.displayName ? (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              onClick={handleSignOut}
                              className={classNames(
                                active ? 'bg-gray-100 cursor-pointer' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/signin"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign In
                            </a>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
