import React, {useState, useEffect} from 'react';
import './Results.css';


const Results = (props) => {

    const [click,setClick] = useState(false);
    const [popup, setPopup] = useState('');
    const [user, setUser] = useState('');
    const [location, setLocation] = useState('');
    const [avatar, setAvatar] = useState('');
    const [link, setLink] = useState('');

    useEffect(()=>{
        console.log(props.allData)
    })
    
    function openWindow(pic) {

        setClick(state => ({
            click: !state.click
        }));
        setPopup(pic.target.attributes.src.nodeValue);
        const data = pic.target.dataset;
        setUser(`@${data.username}`);
        setLocation(data.location);
        setAvatar(data.avatar);
        setLink(data.link)
    }

    function closeWindow() {
        setClick(false)
    }

    return(
        <>
            <div className='container_searcher'>
                   
            </div>
                
            <div className='container'>
                
                {props.allData.map((pic) => (

                    <div className='item' key={pic.id}>

                        <img className='image' key={pic.id} 
                        src={pic.urls.full} 
                        onClick={(pic)=> openWindow(pic)} 
                        data-username={pic.user.first_name} 
                        data-location={pic.user.location} 
                        data-avatar={pic.user.profile_image.medium}
                        data-link={pic.links.download}>
                        </img>

                    </div>
                    
                ))}

                {click && <div className='popup'>

                        <div className='container_flex'>
                            <img className='avatar' src={avatar}></img>
                            <p>{user}</p>
                            <p className='close' onClick={closeWindow}>X</p>
                        </div>
                         <img className='image_full' src={popup}></img> 
                         <div className='location'>
                            <p>{location}</p>
                            <a download='' href={link} target='_blank'>Download</a>
                         </div>

                </div>}
            </div>

            {props.allData.length === 0 && props.searchState && 
                    <h1 className='no_res'>No results :(</h1>
            }


        </>
    )


}

export default Results;