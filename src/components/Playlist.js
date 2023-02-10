import React from "react"
import { useEffect, useState } from 'react'
import "./style.css"


const MenuCard = () => {
    const [data, setData] = useState()
    const playlist = "PLzGHKb8i9vTwhFKH2lTKre_UHofw3hGiD"
    const Fetchdata = async () => {
        const setHeader = {
            headers: {
                Accept: "application/json"
            }
        }
        try {
            const maximumvideos = 6
            const { REACT_APP_API } = process.env
            const api = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=${playlist}&maxResults=${maximumvideos}&key=AIzaSyCuJ4p6AjnYQmk08DNqTHnoOGBgyDl_3I8`
            const respones = await fetch(api, setHeader)
            const jsonData = await respones.json();
            console.log(jsonData);
            setData(jsonData)

        }
        catch (err) {
            console.log("The Error is " + err)
        }

    }
    useEffect(() => {
        return Fetchdata();
    }, [])

    if (data) {
        return <>
            {data.items.map((item, id) => {
                const { title } = item.snippet
                const videoId = item.contentDetails.videoId
                const playlists = "https://www.youtube.com/embed/" + videoId + "?list=" + playlist
                return <>
                    <div className="card-container" key={id}>
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">{title}</h3>
                                <iframe width="1000" className="card-media" height="500" src={playlists}
                                    title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </>
            })
            }
        </>
    }
    else if (!data) {
        return <> Please Wait Loading</>
    }
}

export default MenuCard;
