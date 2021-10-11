import React from 'react'
import { Icon } from '@iconify/react'

interface Props {}

function Github(props: Props) {
  const {} = props

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '10%',
        alignItems: 'end',
      }}
    >
      <a href='https://github.com/acrose99/DelaunayTriangulation'>
        <Icon
          icon='akar-icons:github-fill'
          height='64'
          className='flex text-white border-8 rounded-md'
          style={{
            borderColor: 'rgb(27, 30, 40)',
            backgroundColor: 'rgb(27, 30, 40)',
            padding: '0.5rem',
          }}
        />
      </a>
    </div>
  )
}

export default Github
