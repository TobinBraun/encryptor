import { useState } from 'react'

import Input from './Input';
import './App.css';

function encrypt(g, p, A, message)
{
    let k = Math.floor(Math.random() * 64)
    console.log("k=" + k)
    g = parseInt(g)
    p = parseInt(p)
    A = parseInt(A)
    let encryptedMessage = ""
    for (let i = 0; i < message.length; i++)
    {
        encryptedMessage += (message.charCodeAt(i) * Math.pow(A, k)) % p
        encryptedMessage += " "
    }
    console.log("(" + (Math.pow(g, k) % p) + ", " + encryptedMessage + ")")
    return Math.pow(g, k) % p + ", " + encryptedMessage
}

function App() {
  const [base, setBase] = useState()
  const [prime, setPrime] = useState()
  const [OPPK, setOPPK] = useState()
  const [message, setMessage] = useState()

  const doEncrypt = () => {
    let newMessage = encrypt(base, prime, OPPK, message)
    setMessage("(" + newMessage + ")")
    return false
  }

  return (
    <form className="App" onSubmit={e => {e.preventDefault(); doEncrypt();}}>
      <Input label="Base Value" value={base} onChange={(value) => setBase(value)} />      
      <Input label="Prime Value" value={prime} onChange={value => setPrime(value)}/> 
      <Input label="Other Person's Public Key" value={OPPK} onChange={value => setOPPK(value)}/> 
      <Input type="text" label="Message" value={message} onChange={value => setMessage(value)}/> 
      <button type="submit">Encrypt</button>
    </form>
  );
}

export default App;