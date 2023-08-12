/* eslint-disable @next/next/no-head-element */
import { useState } from 'react'
import allYarns from '../yarns.json'

export default function Home() {
  const allData = allYarns

  const [currentIndexRandom, setCurrentIndexRandom] = useState(
    Math.floor(Math.random() * allData.length)
  )

  const handleNextClick = () => {
    const nextIndex = (currentIndexRandom + 1) % allData.length // Avança para o próximo índice, voltando ao início se chegar ao final
    setCurrentIndexRandom(nextIndex)
    console.log('foi ao próximo', nextIndex, allData[nextIndex].id)
  }

  const components = allData.map(yarn => {
    const inputString = yarn.url
    const regex = /https:\/\/getyarn\.io\/yarn-clip\/([a-z0-9\-]+)/
    const match = inputString.match(regex)

    let videoUrl = ''
    if (match) {
      const videoUrlId = match[1]
      videoUrl = `https://y.yarn.co/${videoUrlId}.mp4`
    }

    return (
      <div
        className="p-2 flex justify-center flex-col items-center"
        key={yarn.id}
      >
        <video
          autoPlay
          src={videoUrl}
          className=" flex-1 shadow-lg rounded"
        ></video>
        <p className="text-neutral-50 text-xl pt-2">{yarn.subtitle}</p>
      </div>
    )
  })

  return (
    <div className="bg-gray-800 min-h-screen">
      <header className=" p-4 pt-8 flex justify-center">
        <p className="text-neutral-50 text-5xl">
          🚨 Os yarns Mais rápidos do mundo
        </p>
      </header>
      <main className=" p-2 flex justify-center w-full ">
        <div
          className="bg-gray-950 rounded relative
        "
        >
          {components[currentIndexRandom]}
          <button
            onClick={handleNextClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-3/4 right-1/4"
          >
            Já Sei
          </button>
        </div>
      </main>
      <footer className=" p-4 flex justify-center h-full">
        <div className="border drop-shadow-sm w-fit p-6 rounded">
          <h1 className="text-neutral-50 text-2xl pb-4">
            Seus recordes recentes:
          </h1>
          <ul>
            <li className="text-neutral-50 text-xl">Acertos: 10 Erros: 40</li>
            <li className="text-neutral-50 text-xl">Acertos: 7 Erros: 43</li>
            <li className="text-neutral-50 text-xl">Acertos: 3 Erros: 47</li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
