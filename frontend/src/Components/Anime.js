function Anime(props) {
    // console.log(props)
    return (
        <tr>
            <td>
                {props.anime.name}
            </td>
            <td>
                {props.anime.description}
            </td>
        </tr>
    )
};

export default Anime;