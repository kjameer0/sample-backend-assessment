function Anime({ name, description }) {
  // console.log(props)
  return (
    <div className="anime-item">
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
}

export default Anime;
