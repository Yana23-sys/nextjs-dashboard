'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams() // current URL params
  const pathname = usePathname() // current URL pathname (/dashboard/invoices)
  const { replace } = useRouter() // desctructure replace method from useRouter() - allows client-side navigation to provided route (without reloading the page)


  const handleSearch = useDebouncedCallback ((term) => {
    console.log(`Searching... ${term}`)

    const params = new URLSearchParams(searchParams) // to get the params string like '?page=1&query=a'
    if (term) {
      params.set('query', term) // set the query param
    } else {
      params.delete('query') // If the input is empty, delete the query param
    }
    replace(`${pathname}?${params.toString()}`) //updates the URL with the user's search data. /dashboard/invoices?query=hello -> user searches for "hello"
  }, 1000)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()} 
        // if use state - value attribute to make it a controlled component (React manages the input's state)
        // if not - use defaultValue, native input will manage its own state (is ok, since saving the search query to the URL instead of state)
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
