import React, { useMemo, useRef, useState } from 'react'
import Delaunator from 'delaunator'
import { useLoader, useFrame, useThree, Canvas } from '@react-three/fiber'
import {
  useHelper,
  useAspect,
  useProgress,
  useTexture,
} from '@react-three/drei'
import { useControls, folder } from 'leva'
import * as THREE from 'three'

function Delaunay() {
  let {
    size,
    x,
    y,
    z,
    wireframe,
    // vertexColors
    meshColor,
    directionLightColor,
    directionLightIntensity,
    ambientLightColor,
    ambientLightIntensity,
    rotation,
  } = useControls({
    size: {
      value: 50,
      min: 0,
      max: 500,
      step: 10,
    },
    x: {
      value: 50,
      min: -500,
      max: 500,
      step: 10,
    },
    y: {
      value: 50,
      min: -500,
      max: 500,
      step: 10,
    },
    z: {
      value: 50,
      min: -500,
      max: 500,
      step: 10,
    },
    wireframe: {
      value: true,
    },
    rotation: true,
    // vertexColors: {
    //   value: true,
    // },
    meshColor: {
      value: 'hotpink',
    },
    'Directional Light': folder({
      directionLightColor: {
        value: '#a71313',
      },
      directionLightIntensity: {
        value: 0.5,
        min: 0,
        max: 10,
        step: 0.1,
      },
    }),
    'Ambient Light': folder({
      ambientLightColor: {
        value: 'white',
      },
      ambientLightIntensity: {
        value: 0.5,
        min: 0,
        max: 10,
        step: 0.1,
      },
    }),
  })
  /* Const for random Delaunay point */
  /* Fill an array of size size with random coordinates */
  let coords = useMemo(() => {
    let arr = []
    for (let i = 0; i < size; i++) {
      arr.push(
        new THREE.Vector3(
          THREE.MathUtils.randFloatSpread(x),
          THREE.MathUtils.randFloatSpread(y),
          THREE.MathUtils.randFloatSpread(z)
        )
      )
    }
    return arr
  }, [size, x, y, z])
  console.log(coords)
  const geometry = new THREE.BufferGeometry().setFromPoints(coords)

  // const coords = [168,180, 168,178, 168,179, 168,181, 168,183];
  const delaunay = Delaunator.from(
    coords,
    (d: { x: number }) => d.x,
    (d: { y: number }) => d.y
  )
  let triangles = delaunay.triangles
  let meshArray = [];
  for (let i = 0; i < triangles.length; i++) {
    meshArray.push(triangles[i])
  }
  geometry.setIndex(meshArray)
  // let colors = [
  //   new THREE.Color('black'),
  //   new THREE.Color('white'),
  // ]
  // let colorsArray = []

  // for (let i = 0; i < geometry.attributes.position.count; i++) {
  //   colorsArray.push(
  //     colors[Math.floor(Math.random() * colors.length)].r,
  //     colors[Math.floor(Math.random() * colors.length)].g,
  //     colors[Math.floor(Math.random() * colors.length)].b
  //   )
  // }

  /* Compute a bufferAttribute of colors based on the length of the vertices */

  // const colorBuffer = useMemo(
  //   () => new THREE.Float32BufferAttribute(colorsArray, 3),
  //   [colorsArray]
  // )
  // console
  // let colorBufferAttribute = useMemo(
  //   () => (
  //     <bufferAttribute
  //       name='colorBuffer'
  //       attachObject={['attributes', 'color']}
  //       array={colorBuffer.array}
  //       itemSize={3}
  //       count={colorBuffer.array.length}
  //     />
  //   ),
  //   [colorBuffer]
  // )
  // geometry.setAttribute('color', colorBuffer)
  geometry.computeVertexNormals()
  geometry.normalizeNormals()
  const ref = useRef<THREE.Mesh>()
  const light = useRef<THREE.DirectionalLight>()
  useFrame(() => {
    if (rotation) {
      ref.current.rotation.y = ref.current.rotation.y += 0.01
    }
  })
  return (
    <>
      <mesh ref={ref} geometry={geometry}>
        <meshStandardMaterial
          // vertexColors={vertexColors}
          attach='material'
          wireframe={wireframe}
          wireframeLinewidth={2}
          side={THREE.DoubleSide}
          color={meshColor}
        ></meshStandardMaterial>
      </mesh>
      <ambientLight color={ambientLightColor} intensity={ambientLightIntensity} />
      <directionalLight
        ref={light}
        color={directionLightColor}
        position={[0, 0, 200]}
        intensity={directionLightIntensity}
      />
    </>
  )
}

export default Delaunay
