import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import axios from 'axios';

export default function Contact() {

  // Topics
  const [topics, setTopics] = useState([]);

  useEffect(()=> {
    document.title = `Contact us | Retrocine`;
    axios
      .get('http://localhost:8000/api/customer-service/get-topics/')
      .then(response => setTopics(response.data))
  }, [])

  // Form
  const defaultFormData = {
    email: '',
    topic: '',
    content: '',
  };

  const [formData, setFormData] = useState(defaultFormData);

  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name] : value })
  }

  // Submit form
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios
        .post('http://localhost:8000/api/customer-service/send-issue/', formData)
        .then(response => console.log(response.data))
      toast.success('Message successfully sent.');
    } catch(error) {
      toast.error('Something went wrong. Try again.')
    } finally {
      setFormData(defaultFormData)
    }
  }

  return (
    <main className="bg-white">
      <div className="p-10">
        
        <h2 className="text-2xl font-bold">Contact us</h2>
        
        <div className="mt-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-1/4">
              
              <label className="mt-4 mb-4">What do you want to talk to us about?</label>
              <select onChange={handleInputChange} value={formData.topic} className="p-4 rounded-lg" name="topic">
                <option value="">--Please choose an option--</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.label}>{topic.label_text}</option>
                ))}
              </select>

              <label className="mt-8 mb-5">What is your email?</label>
              <input
                className="rounder-lg px-4 py-2"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email..."
              />

              <label className="mt-8 mb-5">What do want to tell us?</label>
              <input
                className="rounder-lg px-4 py-2"
                type="text"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Add your message here..."
              />
            </div>
            <button type="submit" className="mt-8 rounded-lg bg-gray-500 px-6 py-3">Submit</button>
          </form>
        </div>

      </div>
    </main>
  )
}
