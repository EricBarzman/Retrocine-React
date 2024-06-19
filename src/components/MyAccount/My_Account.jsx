import { useEffect } from "react"

function My_Account() {

  useEffect(()=> {
    document.title = `My Account | Retrocine`;
  }, [])

  return (
    <div>My_Account</div>
  )
}

export default My_Account