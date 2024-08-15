import { useEffect } from "react"

function About() {

  useEffect(()=> {
    document.title = `About | Retrocine`;
  }, [])

  return (
    <main className="bg-black text-white border-t-2 border-b-2">
      <div className="p-10">
        <h2 className="text-3xl font-bold">About</h2>
        <p className="text-xl mt-10 mb-10">Retrocine is a service to access classic movies online.</p>
        <br />
        <div className="ml-4">
          <p className="mt-10 mb-6">Designed by <span className="font-bold">Eric Barzman</span>. The purpose of this app is to display my abilities as web designer.</p>
          <p className="mb-6">The frontend runs on <strong>React / Redux</strong> and <em>Tailwind CSS.</em></p>
          <p className="mb-10">The backend uses <strong>Django</strong>.</p>
        </div>
      </div>
    </main>
  )
}

export default About