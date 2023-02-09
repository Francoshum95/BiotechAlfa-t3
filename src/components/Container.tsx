import Link from "next/link"
import { ReactNode } from "react"

const Container = ({children}: {children:ReactNode}) => (
  <div className="flex h-full w-full flex-col items-center p-2">
      <nav className="w-full px-2 py-5 text-2xl font-semibold text-white">
        <Link href={"/home"}>
          BiotechAlfa
        </Link>
      </nav>
      <div className="container-border w-full p-2">
        {children}
      </div>
  </div>
)

export default Container