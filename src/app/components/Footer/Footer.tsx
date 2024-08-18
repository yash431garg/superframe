import React from 'react'


function Footer() {
    return (
        <footer className="text-center lg:mt-24 mt-48">
        <hr className="h-px my-2 w-10/12 mx-auto bg-gray-200 border-0 dark:bg-[#313131]" />
        <p className="my-2">
          Superframe &copy; {new Date().getFullYear()}
        </p>
      </footer>
    )
}

export default Footer