import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
  modelPath?: string;
}

function AvatarModel({ modelPath = '/td-1.glb' }: Avatar3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  // Gentle idle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
    </group>
  );
}

function LoadingPlaceholder() {
  return (
    <mesh>
      <boxGeometry args={[1, 2, 0.5]} />
      <meshStandardMaterial color="#E8D5C4" />
    </mesh>
  );
}

export default function Avatar3D({ modelPath }: Avatar3DProps) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 3, -5]} intensity={0.6} />
        <spotLight
          position={[0, 5, 0]}
          angle={0.4}
          penumbra={1}
          intensity={0.8}
          castShadow
        />

        {/* Environment for better lighting */}
        <Environment preset="studio" />

        {/* 3D Model with Suspense fallback */}
        <Suspense fallback={<LoadingPlaceholder />}>
          <AvatarModel modelPath={modelPath} />
        </Suspense>

        {/* Contact Shadows for ground effect */}
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />

        {/* Camera Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2.5}
          maxDistance={6}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/td-1.glb');

