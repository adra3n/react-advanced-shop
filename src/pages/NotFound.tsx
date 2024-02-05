import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="w-screen h-screen bg-beigeBg text-blueBg flex justify-center items-center flex-col gap-12">
      <h1 className="text-5xl ">404 Not Found</h1>
      <div className="w-48">
        <Button onClick={() => navigate('/', { replace: true })}>
          Return to home
        </Button>
      </div>
    </div>
  )
}

export default NotFound
