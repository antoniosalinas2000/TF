import React, { useRef } from 'react'
import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { useStore } from './store'
import axios from 'axios'

const EnterName = () => {
  const inputRef = useRef()
  const roomIdRef = useRef()
  const toast = useToast()
  const { setUsername, setRoomId } = useStore(({ setUsername, setRoomId }) => ({
    setUsername,
    setRoomId,
  }))

  const { mutateAsync } = useMutation(({ username, roomId, uri }) => {
    return axios.post(`http://localhost:3000/${uri}`, {
      username,
      roomId,
    })
  })

  const createRoom = async () => {
    const value = inputRef.current?.value

    if (!value) {
      toast({
        title: 'Introducir usuario',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    await mutateAsync(
      { username: value, uri: 'crear-sala' },
      {
        onSuccess: ({ data }) => {
          setRoomId(data.roomId)
          toast({
            title: 'Hemos creado su sala',
            description: 'Comparta el id de la sala para colaborar con más personas',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        },
      }
    )
    setUsername(value)
  }

  const enterRoom = async () => {
    const value = inputRef.current?.value
    const roomIdValue = roomIdRef.current?.value

    if (!value || !roomIdValue) {
      toast({
        title: 'Por favor ingrese datos en ambos campos',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      return
    }
    setRoomId(roomIdValue)
    setUsername(value)
  }

  return (
    <>
      <InputGroup size="lg">
        <Input
          size="lg"
          placeholder="Ingrese su User"
          ref={inputRef}
        />
        <InputRightElement>
          <Button size="lg" onClick={createRoom}>
            Crear Sala
          </Button>
        </InputRightElement>
      </InputGroup>
      <InputGroup size="lg">
        <Input
          size="lg"
          placeholder="Ingrese el id de la Sala"
          ref={roomIdRef}
        />
        <InputRightElement>
          <Button size="lg" onClick={enterRoom}>
            Ingresar a la sala
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  )
}

export default EnterName
