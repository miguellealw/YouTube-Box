import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex px-5 flex-col justify-center items-center min-h-screen">
      <Head>
        <title>YouTube+</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex-1 flex flex-col justify-center items-center">
        <nav>
        </nav>

        <h1 className="text-8xl">YouTube+</h1>
        <Link href="/login" passHref>
          <button className="bg-red-600 font-bold text-xl mt-4 py-2 px-6 text-white">
            Login 
          </button>
        </Link>
        <span>
          <Link href="/register" passHref >
            <a>
              or <span className="underline text-gray-400">Register </span> 
            </a>
          </Link>
        </span>
      </main>

      <footer className="w-full h-28 flex justify-center items-center">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className="">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
