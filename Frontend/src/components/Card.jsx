import React from 'react'

const Card = ({ data }) => {
  return (
    <div className="w-full sm:w-72 bg-orange-100  rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 overflow-hidden border border-white/40">
      {/* Image */}
      {data.image?.url ? (
        <img
          src={data.image.url}
          alt={data.title}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div className="w-full h-44 flex items-center justify-center bg-gray-200 text-gray-500">
          <img
            src="https://assets-news.housing.com/news/wp-content/uploads/2022/03/28143140/Difference-between-flat-and-apartment.jpg"
            alt={data.title}
            className="w-full h-44 object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Title + Price in same row */}
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {data.title}
          </h3>
          {data.price ? (
            <span className="text-green-600 font-bold text-sm whitespace-nowrap">
              ₹ {data.price.toLocaleString()}
            </span>
          ) : (
            <span className="text-gray-400 text-sm">N/A</span>
          )}
        </div>

        {/* Location */}
        <p className="text-gray-700 text-sm mt-1 truncate">
          {data.location}, {data.country}
        </p>
      </div>
    </div>
  )
}

export default Card
