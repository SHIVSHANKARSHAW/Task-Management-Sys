import React from "react";

const UserKPIs = () => {
  return (
    <>
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <div class="bg-white overflow-hidden shadow sm:rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <dl>
                  <dt class="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                    Total free servers
                  </dt>
                  <dd class="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                    1.6M
                  </dd>
                </dl>
              </div>
            </div>
            <div class="bg-white overflow-hidden shadow sm:rounded-lg">
              <div class="px-4 py-5 sm:p-6">
                <dl>
                  <dt class="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                    Servers a month
                  </dt>
                  <dd class="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                    19.2K
                  </dd>
                </dl>
              </div>
            </div>
            <div class="bg-white overflow-hidden shadow sm:rounded-lg ">
              <div class="px-4 py-5 sm:p-6">
                <dl>
                  <dt class="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                    Servers a week
                  </dt>
                  <dd class="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                    4.9K
                  </dd>
                </dl>
              </div>
            </div>
            <div class="bg-white overflow-hidden shadow sm:rounded-lg ">
              <div class="px-4 py-5 sm:p-6">
                <dl>
                  <dt class="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
                    Total users
                  </dt>
                  <dd class="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
                    166.7K
                  </dd>
                </dl>
              </div>
            </div>
      </div>
    </>
  );
};

export default UserKPIs;
