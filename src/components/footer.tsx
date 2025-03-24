import Link from "next/link"
import { JSX, SVGProps } from "react"
import { Button } from "./ui/button"

function Footer() {
  return (
    <footer className=" border-t py-6 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" prefetch={false}>
              <MountainIcon className="h-6 w-6" />
              <span className="text-lg font-semibold ml-2">CrestFunding</span>
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <Link href="https://github.com/arjungsanal/crowdfunding">
            <p>Developed by FAS | ©2025</p>
            </Link>
          </div>

          {/* Contact Button */}
          <div>
            <Button asChild variant="outline" size="sm">
              <Link href="/contact" className="hover:text-gray-700 dark:hover:text-gray-300">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

export default Footer
