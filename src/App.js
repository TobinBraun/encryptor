import { useState } from 'react'
import * as BMA from 'bigint-mod-arith'

import Input from './Input';
import './App.css';

function encrypt(g, p, A, message)
{
    g = BigInt(g)
    p = BigInt(p)
    A = BigInt(A)
    let encryptedMessage = ""
    for (let i = 0; i < message.length; i++)
    {
        encryptedMessage+= "("
        let k = BigInt(Math.floor(Math.random() * 256))
        encryptedMessage+= (BMA.modPow(g, k, p)) + ", "
        encryptedMessage += (BigInt(message.charCodeAt(i)) * BMA.modPow(A, k, p)) % p + ")"
        encryptedMessage += i < message.length - 1 ? " " : ""
    }
    return encryptedMessage
}

function decrypt(p, a, message)
{
  p = BigInt(p)
  a = BigInt(a)
  let newMessage = ""
  message = message.replace(/[(),]/g, "")
  message = message.split(" ")
  console.log(message)
  message = message.map(num => BigInt(num))
  for(let i = 0; i < message.length; i += 2)
  {
    newMessage += BMA.modPow(message[i], a, p)
    newMessage += " "
    console.log(message[i], a, p, BMA.modPow(message[i], a, p))
  }
  console.log(newMessage)
}

function App() {
  const [decryptMode, setDecryptMode] = useState()
  const [base, setBase] = useState()
  const [prime, setPrime] = useState()
  const [OPPK, setOPPK] = useState()
  const [message, setMessage] = useState("Hello World")
  const [YPK, setYPK] = useState()

  const doEncrypt = () => {
    let newMessage = encrypt(base, prime, OPPK, message)
    setMessage(newMessage)
    setDecryptMode(true)
    return false
  }

  const doDecrypt = () => {
    let newMessage = decrypt(prime, YPK, message)
    setMessage(newMessage)
  }

  return (
    <form className="App" onSubmit={e => {e.preventDefault(); {decryptMode? doDecrypt() : doEncrypt()};}}>
    <select onChange={e => setDecryptMode(e.target.value === "Decrypt")}>
        <option>Encrypt</option>
        <option>Decrypt</option>
      </select>
      { !decryptMode && <Input label="Base Value" value={base} onChange={(value) => setBase(value)}/> }
      <Input label="Prime Value" value={prime} onChange={value => setPrime(value)}/> 
      {
        decryptMode
          ? <Input label="Your Private Key" value={YPK} onChange={value => setYPK(value)}/> 
          : <Input label="Other Person's Public Key" value={OPPK} onChange={value => setOPPK(value)}/> 
      }
      <Input type="text" label="Message" value={message} onChange={value => setMessage(value)}/> 
      <button type="submit"> {decryptMode? "Decrypt" : "Encrypt"}</button>
    </form>
  );
}

export default App;