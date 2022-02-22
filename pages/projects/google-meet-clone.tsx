import React, { useCallback, useEffect, useRef } from 'react'
import BaseLayout from 'components/baseLayout'
// import { getDatabase } from 'firebase/database'
import { getDatabase, ref, set, push } from 'firebase/database'
export interface IGoogleMeetCloneProps {}

export default function GoogleMeetClone (props: IGoogleMeetCloneProps) {
  const videoRef = useRef(undefined)
  const dbRef = useRef(null)
  useEffect(() => {
    const joinRoom = async () => {
      push(ref(dbRef.current, 'rooms/room-id/users/'), {
        test: 1
      })
    }

    console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
    setTimeout(() => {
      dbRef.current = getDatabase()
      joinRoom()
    }, 1000)
    // startVideo({

    //   video: true,
    //   audio: true
    // })
  }, [])

  const startVideo = useCallback(params => {
    navigator.mediaDevices.getUserMedia(params).then(stream => {
      videoRef.current.srcObject = stream
      // video.addEventListener('loadedmetadata', () => {
      //   video.play()
      // })
    })
  }, [])

  return (
    <BaseLayout firebase>
      Google Meet Clone
      <video
        style={{ width: 300, height: 200 }}
        ref={videoRef}
        muted
        onLoadedMetadata={() => {
          videoRef.current.play()
        }}
      />
      <div className='flex-ctn flex-row'>
        <div
          onClick={() =>
            startVideo({
              video: false,
              audio: true
            })
          }
          style={{
            width: 48,
            height: 48,
            borderRadius: 999,
            backgroundColor: 'red'
          }}
        />
        <div
          onClick={() =>
            startVideo({
              video: true,
              audio: true
            })
          }
          style={{
            width: 48,
            height: 48,
            borderRadius: 999,
            backgroundColor: 'green'
          }}
        />
      </div>
    </BaseLayout>
  )
}
