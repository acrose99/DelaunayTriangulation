import dynamic from 'next/dynamic'
// Step 5 - delete Instructions components
import Github from '@/components/dom/Github'
// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Delaunay = dynamic(() => import('@/components/canvas/Delaunay'), {
  ssr: false,
})
import { Suspense } from 'react'

// dom components goes here
const DOM = () => {
  return (
    <>
      <Github />
    </>
  )
}

// canvas components goes here
const R3F = (props) => {
  return (
    <>
      <Suspense fallback={null}>
        {/* <Shader /> */}
        <Delaunay />
      </Suspense>
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
