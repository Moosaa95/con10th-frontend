export default function EmptyState({message, description}: {message?: string, description?: string}) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-4 h-24 w-24">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 95C74.8528 95 95 74.8528 95 50C95 25.1472 74.8528 5 50 5C25.1472 5 5 25.1472 5 50C5 74.8528 25.1472 95 50 95Z"
              stroke="#E2E8F0"
              strokeWidth="2"
            />
            <path
              d="M35 40C36.6569 40 38 38.6569 38 37C38 35.3431 36.6569 34 35 34C33.3431 34 32 35.3431 32 37C32 38.6569 33.3431 40 35 40Z"
              fill="#E2E8F0"
            />
            <path
              d="M65 40C66.6569 40 68 38.6569 68 37C68 35.3431 66.6569 34 65 34C63.3431 34 62 35.3431 62 37C62 38.6569 63.3431 40 65 40Z"
              fill="#E2E8F0"
            />
            <path d="M35 70C35 70 40 60 50 60C60 60 65 70 65 70" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M20 50C20 50 30 45 50 45C70 45 80 50 80 50"
              stroke="#E2E8F0"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="2 4"
            />
          </svg>
        </div>
        <h3 className="mb-1 text-lg font-medium text-primary-800">{message || "There's nothing here."}</h3>
        <p className="text-sm text-gray-500">{description || "No worries! Just wait for us to fill this space."}</p>
      </div>
    )
  }
  