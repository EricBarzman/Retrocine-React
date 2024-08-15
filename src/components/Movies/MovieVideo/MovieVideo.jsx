/* eslint-disable react/prop-types */

function MovieVideo({youtube_id}) {
    return (
    <div className="video-container mx-auto">
        <iframe
            src={`https://www.youtube.com/embed/${youtube_id}`}
            width="70%"
            height="600"
            allow="picture-in-picture;"
            allowFullScreen>
        </iframe>
    </div>
  )
}

export default MovieVideo