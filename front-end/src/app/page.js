import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center  text-white"> 
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">chat with your pdf</h1>
          <div className="">
            <p>🗨️ Dive into your PDFs and have real-time conversations with them. Ask questions, seek clarifications, or share your thoughts, all within the document.</p>
            <Link href ="/Ask">
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">get started</button>
            </Link>
            </div>
        </div>
      </div>
  )
}
