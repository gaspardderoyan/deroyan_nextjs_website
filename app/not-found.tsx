export default async function NotFound() {
  return (
    <div>
      <div className="text-center absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Not Found</h2>
        <p className="text-sm md:text-base text-gray-600">The page you are looking for doesn&apos;t exist or has been moved.</p>
      </div>
    </div>
  )
}